import React, { useEffect } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import { BASE_URL } from "./config";

export const CuisineDropdown = ({ className, controlClassName, onChange }) => {
  // Get cuisines from db
  const options = [];
  useEffect(async () => {
    await axios.get(`${BASE_URL}/cuisines`).then((res) => {
      options.push(...res.data);
    });
  });

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
