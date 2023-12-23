import CategoryIcon from "../Icons";

const UserCard = ({ ticket }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col m-5 items-start w-[17.5em]">
      <div className="flex justify-between items-center w-full mb-3">
        <span className="font-normal text-gray-500">{ticket.id}</span>
      </div>
      <div className="flex ">
        <div className="w-5 mt-1.5 absolute h-3 rounded-full ">
          <CategoryIcon className="" type="status" value={ticket.status} />
        </div>
        <h4 className="text-gray-900 font-semibold text-[1em] pb-2 left-4 relative">
          {ticket.title}
        </h4>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className="flex gap-2">
            <div className="w-7 relative pl-1  h-8 rounded-sm border-gray-300 border-[1.5px]">
              <CategoryIcon type="priority" value={ticket.priority} />
            </div>
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

export default UserCard;
