import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBug,
  faExclamationTriangle,
  faUser,
  faTasks,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

const CategoryIcon = ({ type, value, className }) => {
  const priorityIcons = {
    0: faExclamationTriangle,
    1: faFlag,
    2: faTasks,
    3: faFlag,
    4: faExclamationTriangle,
  };

  const statusIcons = {
    Backlog: faTasks,
    Todo: faBug,
    "In Progress": faTasks,
    Done: faBug,
    Cancelled: faTasks,
  };

  const getInitialsIcon = (initials) => {
    // Here you would create a custom SVG or use an existing icon for initials
    return (
      <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-white">
        {initials}
      </div>
    );
  };

  const renderIcon = () => {
    if (type === "priority") {
      return <FontAwesomeIcon icon={priorityIcons[value]} />;
    } else if (type === "status") {
      return <FontAwesomeIcon icon={statusIcons[value]} />;
    } else if (type === "user") {
      return getInitialsIcon(value); // Assuming value is the user's initials
    }
  };

  return (
    <div className={`text-lg text-gray-600 ${className}`}>{renderIcon()}</div>
  );
};

export default CategoryIcon;
