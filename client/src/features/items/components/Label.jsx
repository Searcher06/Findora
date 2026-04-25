import React from "react";

const Label = ({ htmlFor, text, className }) => {
  return (
    <label
      htmlFor={`${htmlFor}`}
      className={`mb-1.5 sm:mb-2 block text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.12em] text-slate-700 ${className}`}
    >
      {text}
    </label>
  );
};

export default Label;
