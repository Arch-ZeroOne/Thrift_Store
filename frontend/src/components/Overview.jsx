import React from "react";

function Overview({ path }) {
  return (
    <div className="w-full">
      <div className="shadow-xl bg-white border border-solid border-gray-400/50 p-3">
        <h1 className="font-[Ubuntu] font-medium">{path}</h1>
      </div>
    </div>
  );
}

export default Overview;
