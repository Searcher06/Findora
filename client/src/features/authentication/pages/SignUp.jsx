import { Button } from "@/components/ui/button";
import { GoalIcon, LockKeyholeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../components/icons/Google";
import InputField from "../components/InputField";
import InputFieldsContainer from "../components/InputFieldsContainer";
import ContinueWith from "../components/ContinueWith";
import { useState } from "react";
export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex border w-75 shadow-lg rounded-lg">
        <div id="left" className="hidden">
          Left
        </div>
        <div id="right" className="w-full">
          <form
            className="w-full p-6"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <h1 className="font-bold text-2xl font-display mb-3">Sign Up</h1>
            <InputFieldsContainer>
              <InputField
                icon={"UserIcon"}
                type={"text"}
                placeholder={"Firstname"}
                value={formData.firstName}
                change={"firstName"}
                setFormData={setFormData}
              />
              <InputField
                icon={"UserIcon"}
                type={"text"}
                placeholder={"Lastname"}
                value={formData.lastName}
                change={"lastName"}
                setFormData={setFormData}
              />
              <InputField
                icon={"AtSignIcon"}
                type={"text"}
                placeholder={"Username"}
                change={"username"}
                value={formData.username}
                setFormData={setFormData}
              />
              <InputField
                icon={"Mail"}
                type={"email"}
                placeholder={"Email"}
                value={formData.email}
                change={"email"}
                setFormData={setFormData}
              />
              <InputField
                icon={"Lock"}
                type={"password"}
                placeholder={"Password"}
                value={formData.password}
                change={"password"}
                setFormData={setFormData}
              />

              <Button
                className={"text-[13px] active:scale-95 active:bg-black/90"}
              >
                Create Account
              </Button>
            </InputFieldsContainer>

            <ContinueWith />

            <button className="mt-3 h-9  w-full sm:w-65 border-gray-200 border-[1.9px] rounded-[8px] flex items-center justify-center">
              <GoogleIcon className="mr-3 w-5 h-5" />
              <span className="font-sans text-[13px] font-bold text-gray-700">
                Sign Up with Google
              </span>
            </button>

            <p className="mt-4 text-gray-600 font-sans text-xs w-full flex justify-center">
              Already have an account?
              <span
                className="text-blue-600 pl-1 cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </span>
            </p>

            <hr className="h-[1px] bg-gray-200 border-0 flex-1 mt-4" />
            <p className="font-semibold text-gray-500 text-[11px] font-sans flex items-center gap-1.5 mt-4">
              <LockKeyholeIcon size={16} /> Protected by Findora's security
              system
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
