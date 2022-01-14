import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";

export const AverageSlider = ({ onChange }) => {
  const [value, setValue] = useState([0, 30]);

  useEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <div className="w-1/5 mt-6">
      <Slider
        color="secondary"
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        valueLabelDisplay="auto"
      />
    </div>
  );
};
