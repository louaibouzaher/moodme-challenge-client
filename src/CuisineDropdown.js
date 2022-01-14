import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export const CuisineDropdown = ({ className, controlClassName, onChange }) => {
  // Get cuisines from db
  const options = ["one", "two", "three"];
  const defaultOption = options[0];
  return (
    <Dropdown
      className={className}
      controlClassName={controlClassName}
      options={options}
      onChange={(e) => onChange(e.label)}
      value={defaultOption}
      placeholder="Select a cuisine"
    />
  );
};
