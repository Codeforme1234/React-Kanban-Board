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

  const handleOrderChange = (e) => {
    const orderType = e.target.value;
    // Create a new object to hold the sorted tickets within each group
    const sortedGroupedTickets = { ...groupedTickets };

    // Iterate over each group and sort the tickets within that group
    for (const group in sortedGroupedTickets) {
      sortedGroupedTickets[group] = sortTickets(
        sortedGroupedTickets[group],
        orderType
      );
    }

    // Update the state with the newly sorted grouped tickets
    setGroupedTickets(sortedGroupedTickets);
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
    if (grouping === "status") {
      return <StatusCard key={ticket.id} ticket={ticket} />;
    } else if (grouping === "priority") {
      return <PriorityCard key={ticket.id} ticket={ticket} />;
    } else if (grouping === "user") {
      return <UserCard key={ticket.id} ticket={ticket} />;
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

  return (
    <>
      <div className=" m-4 relative z-50" ref={dropdownRef} >
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-white p-1 w-40 rounded border shadow text-gray-800 font-medium flex items-center justify-between"
        >
          <FontAwesomeIcon icon={faBars} className="pl-1" />
          <div className=" p-1 text-gray-800 font-normal text-xl  ">
            Display
          </div>
          <FontAwesomeIcon
            icon={faCaretDown}
            className={` pr-2 transform transition-transform ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {showDropdown && (
          <div className="absolute w-1/4 left-0 mt-1 bg-white border rounded shadow-lg py-2">
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
      <div className="w-full max-h-screen ">
        <div className="bg-slate-50 p-3 m-2 mt-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
      </div>
    </>
  );
}

export default TicketsContainer;
