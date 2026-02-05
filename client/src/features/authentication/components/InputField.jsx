import * as Link from "lucide-react";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

const InputField = ({ icon, type, placeholder, value, onChange, disabled }) => {
  const [show, setShow] = useState(false);
  const LucideIcon = Link[icon];

  return (
    <div className="w-full h-9 sm:h-10 border border-gray-300 rounded-lg flex items-center px-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
      <LucideIcon size={18} className={"text-gray-600 flex-shrink-0"} />
      <input
        type={`${type == "password" && show == true ? "text" : type}`}
        className="w-full h-full outline-0 ml-2 text-sm placeholder-gray-400 bg-transparent"
        placeholder={`${placeholder}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {type == "password" && show == false ? (
        <Eye
          size={18}
          className="ml-2 cursor-pointer text-gray-500 flex-shrink-0 hover:text-gray-700 transition-colors"
          onClick={() => setShow((prev) => !prev)}
        />
      ) : type == "password" && show == true ? (
        <EyeOff
          size={18}
          className="ml-2 cursor-pointer text-gray-600 flex-shrink-0 hover:text-gray-800 transition-colors"
          onClick={() => setShow((prev) => !prev)}
        />
      ) : null}
    </div>
  );
};

export default InputField;
