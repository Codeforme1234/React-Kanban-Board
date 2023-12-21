
const PriorityCard = ({ ticket }) => {
    return (
      <div className="bg-white rounded-lg m-4 shadow-md p-4 flex flex-col items-start">
        <div className="flex items-center justify-between w-full mb-3">
          <span className="font-bold text-gray-800">{ticket.id}</span>
          <span className="bg-purple-200 text-purple-800 text-xs font-bold px-2 py-1 rounded-full">{ticket.iconLabel}</span>
        </div>
        <h4 className="text-gray-900 font-bold text-lg mb-2">{ticket.title}</h4>
        <div className="flex items-center justify-between w-full">
          <span className={`bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full`}>
            {ticket.priorityLabel}
          </span>
          <button className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
            Feature Request
          </button>
        </div>
      </div>
    );
  };

    export default PriorityCard;
  