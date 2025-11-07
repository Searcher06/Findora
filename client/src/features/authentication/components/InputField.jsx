import * as Link from "lucide-react";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
const InputField = ({
  icon,
  type,
  placeholder,
  value,
  setFormData,
  change,
}) => {
  const [show, setShow] = useState(false);
  const LucideIcon = Link[icon];
  return (
    <div className="w-full h-8 border rounded-sm flex items-center">
      <LucideIcon size={20} className={"ml-2 text-gray-700"} />
      <input
        type={`${type == "password" && show == true ? "text" : type}`}
        className="w-full h-full outline-0 pl-[5px] placeholder-gray-500"
        placeholder={`${placeholder}`}
        value={value}
        onChange={(e) => {
          setFormData((prevState) => ({
            ...prevState,
            [change]: e.target.value,
          }));
        }}
      />
      {type == "password" && show == false ? (
        <Eye
          size={20}
          className="mr-3 cursor-pointer text-gray-600"
          onClick={() => setShow((prev) => !prev)}
        />
      ) : type == "password" && show == true ? (
        <EyeOff
          size={20}
          className="mr-3 cursor-pointer text-gray-700"
          onClick={() => setShow((prev) => !prev)}
        />
      ) : null}
    </div>
  );
};

export default InputField;
