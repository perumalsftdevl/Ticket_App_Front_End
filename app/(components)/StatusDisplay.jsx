import React from "react";

const get_color = (status) => {
  let color = "bg-slate-700";
  switch (status.toLowerCase()) {
    case "done":
      color = "bg-green-200";
      return color;
    case "started":
      color = "bg-yellow-400";
      return color;
    case "not started":
      color = "bg-red-400";
      return color;
  }
  return color;
};

const StatusDisplay = ({ status }) => {
  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${get_color(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default StatusDisplay;
