import CategoryIcon from "../Icons";

const PriorityCard = ({ ticket }) => {
  const iconValue = ticket.status;

  return (
    <div className="bg-white rounded-lg m-4 shadow-md p-4 flex flex-col items-start w-[18em]">
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
      <div className="flex ">
        <div className="w-5 mt-1.5 absolute h-3 rounded-full ">
          <CategoryIcon className="" type="status" value={iconValue} />
        </div>
        <h4 className="text-gray-900 pt-2 pl-2.5 font-semibold text-[1em] pb-2 left-4 relative">
          {ticket.title}
        </h4>
      </div>
      <div className="pt-2 flex items-center justify-between w-full">
        <span className="text-gray-500 border-[1.5px] flex gap-2 px-2 text-sm">
          <div className="w-[13px] h-[13px] flex relative top-1 bg-gray-500 rounded-full"></div>
          <h1>{ticket.tag}</h1>
        </span>
      </div>
    </div>
  );
};

export default PriorityCard;
