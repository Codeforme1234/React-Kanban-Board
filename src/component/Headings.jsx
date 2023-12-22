import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faEllipsisH,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const UserHeader = ({ group, getHeading, alertCount }) => {
  return (
    <div className="flex justify-between items-center p-2">
      <h2 className="text-gray-900 font-semibold text-s">
        {getHeading(group)}
      </h2>
      <h2 className="text-gray-500 font-semibold text-s">
        {alertCount} {/* Displaying the count */}
      </h2>
      <div className="flex items-center">
        {alertCount > 0 && (
          <span className="flex justify-center items-center w-5 h-5 bg-red-600 text-white rounded-full text-xs font-bold absolute -top-2 -right-2">
            {alertCount}
          </span>
        )}
        <FontAwesomeIcon icon={faAdd} className="text-gray-500 text-s" />

        <FontAwesomeIcon
          icon={faEllipsisH}
          className="text-gray-500 text-s ml-2"
        />
      </div>
    </div>
  );
};

export default UserHeader;
