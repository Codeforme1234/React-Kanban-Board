import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBug,
  faExclamationTriangle,
  faUser,
  faTasks,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

const CategoryIcon = ({ type, value }) => {
  const priorityIcons = {
    Urgent: faExclamationTriangle,
    High: faFlag,
    Medium: faExclamationTriangle,
    Low: faFlag,
    "No Priority": faTasks,
  };

  const statusIcons = {
    Busy: faTasks,
    Urgent: faBug,
    // ... other statuses
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

  return <div className="text-lg text-gray-600">{renderIcon()}</div>;
};

export default CategoryIcon;
