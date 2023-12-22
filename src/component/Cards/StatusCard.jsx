import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function extractInitials({ ticket }) {
  return name
    .split(" ") // Split the name by spaces
    .map((n) => n[0]) // Take the first letter of each part
    .join("") // Join the letters
    .toUpperCase(); // Convert to uppercase
}

const StatusCard = ({ ticket }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col m-5  items-start w-[18em]">
      <div className="flex justify-between items-center w-full mb-3">
        <span className="font-normal text-gray-500">{ticket.id}</span>
        <div className="w-5 h-5 bg-green-800 rounded-full">
          {ticket.alert && <i className="fas fa-exclamation"></i>}
          <h1 className=" text-[11px] flex justify-center h-[100%] items-center font-semibold text-white">
            GS
          </h1>
          <div className="w-[9px] h-[9px] flex relative left-3 -top-[7px] bg-slate-600 border-white border-[1px] rounded-full"></div>
        </div>
      </div>
      <h4 className="text-gray-900 font-semibold text-lg mb-2">
        {ticket.title}
      </h4>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className="flex gap-2">
            <div className="w-6 relative h-6 rounded-sm border-gray-300 border-[1.5px]"></div>
            <span className="text-gray-500 border-[1.5px] flex gap-2 px-2 text-sm">
              <div className="w-[13px] h-[13px] flex relative top-1 bg-gray-500 rounded-full"></div>
              <h1>{ticket.tag}</h1>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
