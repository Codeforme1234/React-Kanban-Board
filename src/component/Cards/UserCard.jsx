
  
const UserCard = ({ticket}) => {
        return (
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col m-5 items-start w-64">
            <div className="flex justify-between items-center w-full mb-3">
              <span className="font-bold text-gray-800">{ticket.id}</span>
              <span className="bg-orange-200 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">
                {ticket.alert && <i className="fas fa-exclamation"></i>}
              </span>
            </div>
            <h4 className="text-gray-900 font-bold text-lg mb-2">{ticket.title}</h4>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">
                  <i className="far fa-circle"></i> {/* This icon can be replaced with the actual icon you're using */}
                </span>
                <span className="text-gray-500 text-sm">Feature request</span>
              </div>
            </div>
          </div>
        );      
  };
  
  export default UserCard;