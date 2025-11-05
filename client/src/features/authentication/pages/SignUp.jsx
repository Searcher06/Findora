import { Button } from "@/components/ui/button";
import { GoalIcon, LockKeyholeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../components/icons/Google";
export const SignUpPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex border w-75 shadow-lg rounded-lg">
        <div id="left" className="hidden">
          Left
        </div>
        <div id="right" className="w-full">
          <form className="w-full p-6">
            <h1 className="font-bold text-2xl font-display mb-3">Sign Up</h1>
            <div className="text-[13px] font-sans flex flex-col gap-3">
              <input
                type="text"
                className="h-8 w-full border rounded-sm outline-0 p-3 placeholder-gray-500"
                placeholder="Firstname"
              />
              <input
                type="text"
                className="h-8 w-full border rounded-sm outline-0 p-3 placeholder-gray-500"
                placeholder="Lastname"
              />
              <input
                type="text"
                className="h-8 w-full border rounded-sm outline-0 p-3 placeholder-gray-500"
                placeholder="Username"
              />
              <input
                type="email"
                className="h-8 w-full border rounded-sm outline-0 p-3 placeholder-gray-500"
                placeholder="Email"
              />
              <input
                type="password"
                className="h-8 w-full border rounded-sm outline-0 p-3 placeholder-gray-500"
                placeholder="Password"
              />
              <Button className={"text-[13px] bg-blue-500"}>
                Create Account
              </Button>
            </div>
            <div className="flex mt-3 gap-2 items-center w-full sm:w-auto font-sans">
              <hr className="h-[1px] bg-gray-300 border-0 flex-1" />
              <p className="text-xs text-gray-500">or continue with</p>
              <hr className="h-[1px] bg-gray-300 border-0 flex-1" />
            </div>

            <button className="mt-3 h-9  w-full sm:w-65 border-gray-200 border-[1.9px] rounded-[8px] flex items-center justify-center">
              <GoogleIcon className="mr-3 w-5 h-5" />
              <span className="font-sans text-[13px] font-bold text-gray-700">
                Sign Up with Google
              </span>
            </button>

            <p className="mt-4 text-gray-600 font-sans text-xs w-full flex justify-center">
              Already have an account?
              <span
                className="text-blue-600 pl-1"
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
