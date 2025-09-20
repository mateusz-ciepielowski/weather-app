import { Typography } from "@mui/material";
import React from "react";

const HourBox = ({ children, label, data }) => {
  return (
    <div className="bg-hour-details rounded-2xl p-2 w-36">
      <div className="flex justify-center items-center">
        {children}
        <Typography>{label}</Typography>
      </div>
      <Typography variant="h5" className="text-center">
        {data}
      </Typography>
    </div>
  );
};

export default HourBox;
