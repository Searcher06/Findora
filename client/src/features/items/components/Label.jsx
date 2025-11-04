import React from "react";

const Label = ({ htmlFor, text, className }) => {
  return (
    <label
      htmlFor={`${htmlFor}`}
      className={`text-xs font-bold font-sans text-black ${className}`}
    >
      {text}
    </label>
  );
};

export default Label;
