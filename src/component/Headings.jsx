import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faEllipsisH,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import CategoryIcon from "./Icons";

const UserHeader = ({ group, getHeading, alertCount, grouping }) => {
  let iconValue;
  if (grouping === "user") {
    iconValue = group
      .split(" ")
      .map((name) => name[0])
      .join("");
  } else {
    iconValue = group;
  }

  return (
    <div className="flex justify-between items-center p-2">
      <CategoryIcon className="pl-4" type={grouping} value={iconValue} />
      <h2 className="text-gray-900 font-semibold text-s">
        {getHeading(group)} - {alertCount} {/* Displaying the count */}
      </h2>

      <div className="flex items-center">
        {alertCount > 0 && (
          <span className="flex justify-center items-center w-5 h-5 bg-red-600 text-white rounded-full text-xs font-bold absolute -top-2 -right-2">
            {alertCount}
          </span>
        )}
        <div className="pr-6">
          <FontAwesomeIcon icon={faAdd} className="text-gray-500 text-s" />

          <FontAwesomeIcon
            icon={faEllipsisH}
            className="text-gray-500 text-s ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
