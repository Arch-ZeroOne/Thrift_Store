import React from "react";

function Spinner() {
  return (
    <div className="h-screen fixed bg-[rgb(0,0,0,0.5)] w-full z-50">
      <div className="mt-auto flex items-center justify-center h-full">
        <svg viewBox="0 0 240 240" height="240" width="240" className="pl">
          <circle
            strokeLinecap="round"
            strokeDashOffset="-330"
            strokeDashArray="0 660"
            strokeWidth="20"
            stroke="#000"
            fill="none"
            r="105"
            cy="120"
            cx="120"
            className="pl__ring pl__ring--a"
          ></circle>
          <circle
            strokeLinecap="round"
            strokeDashOffset="-110"
            strokeDashArray="0 220"
            strokeWidth="20"
            stroke="#000"
            fill="none"
            r="35"
            cy="120"
            cx="120"
            className="pl__ring pl__ring--b"
          ></circle>
          <circle
            strokeLinecap="round"
            strokeDasharray="0 440"
            strokeWidth="20"
            stroke="#000"
            fill="none"
            r="70"
            cy="120"
            cx="85"
            className="pl__ring pl__ring--c"
          ></circle>
          <circle
            strokeLinecap="round"
            strokeDasharray="0 440"
            strokeWidth="20"
            stroke="#000"
            fill="none"
            r="70"
            cy="120"
            cx="155"
            className="pl__ring pl__ring--d"
          ></circle>
        </svg>
      </div>
    </div>
  );
}

export default Spinner;
