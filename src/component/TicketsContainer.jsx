import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import StatusCard from "./Cards/StatusCard";
import PriorityCard from "./Cards/PriorityCard";
import UserCard from "./Cards/UserCard";
import UserHeader from "./Headings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function TicketsContainer() {
  const [data, setData] = useState({ tickets: [], users: [] });
  const [grouping, setGrouping] = useState("status");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const priorityMapping = {
    0: "No Priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
  };

  const statusMapping = {
    backlog: "Backlog",
    todo: "Todo",
    inProgress: "In Progress",
    done: "Done",
    cancelled: "Cancelled",
  };

  const getHeading = (key) => {
    if (grouping === "priority") {
      return priorityMapping[key] || key;
    } else if (grouping === "status") {
      return statusMapping[key] || key;
    }
    return key; // For 'user' grouping, return the user name as is
  };
  // Api Fetched
  useEffect(() => {
    axios
      .get(
        "https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers"
      )
      .then((response) => {
        const normalizedTickets = response.data.tickets.map((ticket) => ({
          ...ticket,
          status:
            Object.keys(statusMapping).find(
              (key) =>
                statusMapping[key].toLowerCase() === ticket.status.toLowerCase()
            ) || ticket.status,
        }));
        setData({
          tickets: normalizedTickets || [],
          users: response.data.users || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleGroupChange = (e) => {
    setGrouping(e.target.value);
  };

  const getUserById = (userId) => {
    const user = data.users.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };

  const renderCard = (ticket) => {
    // Find the user's name by userId
    const user = data.users.find((u) => u.id === ticket.userId);
    const userName = user ? user.name : "NA"; // If user not found, use a placeholder

    if (grouping === "status") {
      return <StatusCard key={ticket.id} ticket={ticket} user={userName} />;
    } else if (grouping === "priority") {
      return <PriorityCard key={ticket.id} ticket={ticket} user={userName} />;
    } else if (grouping === "user") {
      return <UserCard key={ticket.id} ticket={ticket} user={userName} />;
    }
  };

  // Initialize only when grouping by 'status'
  const initialGroupedTickets =
    grouping === "status"
      ? Object.keys(statusMapping).reduce((acc, status) => {
          acc[statusMapping[status]] = [];
          return acc;
        }, {})
      : {};

  const groupedTickets = data.tickets.reduce(
    (acc, ticket) => {
      let key =
        grouping === "user" ? getUserById(ticket.userId) : ticket[grouping];
      if (grouping === "status") {
        // Convert status keys like 'inProgress' to 'In Progress'
        key = statusMapping[key] || key;
      }
      // Ensure keys are mapped for 'status' grouping, otherwise use ticket value directly
      acc[key] = acc[key] || [];
      acc[key].push(ticket);
      return acc;
    },
    grouping === "status" ? initialGroupedTickets : {}
  );

  const handleOrderChange = (e) => {
    const orderType = e.target.value;
    // Create a new object to hold the sorted tickets within each group
    const sortedGroupedTickets = { ...groupedTickets };

    const sortTickets = (tickets, sortBy) => {
      if (sortBy === "priority") {
        // Sort by priority in descending order
        return tickets.slice().sort((a, b) => b.priority - a.priority);
      } else if (sortBy === "title") {
        // Sort by title in ascending order
        return tickets.slice().sort((a, b) => a.title.localeCompare(b.title));
      }
      return tickets; // If no sort type is provided, return the tickets as they are
    };

    // Iterate over each group and sort the tickets within that group
    Object.keys(sortedGroupedTickets).forEach((group) => {
      sortedGroupedTickets[group] = sortTickets(
        sortedGroupedTickets[group],
        orderType
      );
    });

    // Update the state with the newly sorted grouped tickets
    setData({ ...data, tickets: Object.values(sortedGroupedTickets).flat() });
  };

  useEffect(() => {
    // Load saved state from localStorage
    const savedGrouping = localStorage.getItem("grouping");
    if (savedGrouping) {
      setGrouping(savedGrouping);
    }
  }, []);

  useEffect(() => {
    // Save the current state to localStorage whenever it changes
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  return (
    <>
      <div className=" mt-4 overflow-x-hidden px-6 z-40" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-white p-1 rounded-md border shadow-md text-gray-800 font-medium flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faBars} className="pl-1" />
          <div className=" p-1 text-gray-800 font-normal text-xl  ">
            Display
          </div>
          <FontAwesomeIcon
            icon={faCaretDown}
            className={`  transform transition-transform ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {showDropdown && (
          <div className="absolute  mt-1 bg-white border rounded shadow-lg z-50 py-4 w-full md:w-1/4">
            <div className="px-4 py-2">
              <label
                htmlFor="groupingSelect"
                className="block mb-2 text-sm font-medium "
              >
                Grouping
              </label>
              <select
                id="groupingSelect"
                className="block w-full p-2 border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={handleGroupChange}
                value={grouping}
                name="grouping"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="px-4 py-2">
              <label
                htmlFor="orderingSelect"
                className="block mb-2 text-sm font-medium "
              >
                Ordering
              </label>
              <select
                id="orderingSelect"
                className="block w-full p-2 border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={handleOrderChange}
                name="ordering"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="bg-slate-50 p-3 mx-2 my-5 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Object.entries(groupedTickets).map(([group, tickets]) => (
          <div key={group} className="col-span-1">
            <UserHeader
              group={group}
              getHeading={getHeading}
              alertCount={tickets.length}
              grouping={grouping}
            />
            {tickets.map((ticket) => renderCard(ticket))}
          </div>
        ))}
      </div>
    </>
  );
}

export default TicketsContainer;
