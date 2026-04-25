import React from "react";

const Label = ({ htmlFor, text, className }) => {
  return (
    <label
      htmlFor={`${htmlFor}`}
      className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-700 ${className}`}
    >
      {text}
    </label>
  );
};

export default Label;
