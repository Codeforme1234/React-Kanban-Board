import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketCard from './TicketCard';
import StatusCard from './Cards/StatusCard';  
import PriorityCard from './Cards/PriorityCard';  
import UserCard from './Cards/UserCard';

function TicketsContainer() {
    const [data, setData] = useState({ tickets: [], users: [] });
    const [grouping, setGrouping] = useState('status');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        axios.get('https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers')
            .then(response => {
                setData({ tickets: response.data.tickets || [], users: response.data.users || [] });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleGroupChange = (e) => {
        setGrouping(e.target.value);
    };

    const getUserById = (userId) => {
        const user = data.users.find(u => u.id === userId);
        return user ? user.name : 'Unknown';
    };

    const renderCard = (ticket) => {
        if (grouping === 'status') {
          return <StatusCard key={ticket.id} ticket={ticket} />;
        }
        else if(grouping === 'priority'){
          return <PriorityCard key={ticket.id} ticket={ticket} />;
        } 
        else if(grouping === 'user'){
          return <UserCard key={ticket.id} ticket={ticket} />;
        }
      };

    // Group tickets based on the selected option
    const groupedTickets = data.tickets.reduce((acc, ticket) => {
        let key = grouping === 'user' ? getUserById(ticket.userId) : ticket[grouping];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(ticket);
        return acc;
    }, {});

    return (
        <div className="w-full p-4"> {/* Full width with padding */}
            <div className="mb-4"> {/* Margin bottom for spacing */}
                <label htmlFor="groupingSelect" className="mr-2">Group by:</label>
                <select id="groupingSelect" onChange={handleGroupChange} value={grouping}>
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {Object.entries(groupedTickets).map(([group, tickets]) => (
                    <div key={group} className="col-span-1">
                        <h2 className="text-xl font-bold mb-3">{group}</h2>
                        {tickets.map(ticket => renderCard(ticket))}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default TicketsContainer;
