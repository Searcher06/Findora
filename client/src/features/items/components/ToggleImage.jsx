import React, { useState } from "react";

const ToggleImage = () => {
  const [on, setOn] = useState(true);
  return (
    <div className="flex gap-1.5 items-center">
      <p className="text-xs font-sans text-gray-500">{on ? "Off" : "On"}</p>
      <button
        className={`h-6 w-10  rounded-lg p-1 flex items-center ${
          on ? "justify-end bg-green-500/40" : "justify-start bg-gray-300"
        }`}
        onClick={() => {
          setOn((prevState) => !prevState);
        }}
      >
        <div className={`w-[50%] bg-white rounded-full h-full`}></div>
      </button>
    </div>
  );
};

export default ToggleImage;
