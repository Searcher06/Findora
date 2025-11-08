import InputFieldsContainer from "../components/InputFieldsContainer";
import InputField from "../components/InputField";
import { Button } from "@/components/ui/button";
import ContinueWith from "../components/ContinueWith";
import GoogleIcon from "../components/icons/Google";
import { useNavigate } from "react-router-dom";
import { LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const disapledStyle =!formData.password || !formData.email ? "bg-gray-500" : null;

  const handleSubmit = async () => {
    // checking all the fields
    if (!formData.email || !formData.password) {
      toast.error("Please add all fields");
      return;
    }

    try {
      const response = await login(formData);
      console.log("Sign up successfull", response);
      setFormData({ email: "", password: "" });
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      if (error.response) {
        // server responded with a non-2xx status
        toast.error(error.response.data.message || "Sign up failed");
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        // something else happended
        toast.error("An error occured.");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex border w-74  shadow-lg rounded-lg">
        <div id="left" className="hidden">
          Left
        </div>
        <div id="right" className="w-full">
          <form
            onSubmit={(event) => event.preventDefault()}
            className="w-full p-6"
          >
            <h1 className="font-bold text-2xl font-display mb-3">Login</h1>

            <InputFieldsContainer>
              <InputField
                icon={"Mail"}
                type={"email"}
                placeholder={"Email"}
                value={formData.email}
                change={"email"}
                setFormData={setFormData}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }));
                }}
                disabled={isLoading ? true : false}
              />

              <InputField
                icon={"Lock"}
                type={"password"}
                placeholder={"Password"}
                value={formData.password}
                change={"password"}
                setFormData={setFormData}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }));
                }}
                disabled={isLoading ? true : false}
              />

              <div className="text-[12.5px] font-sans text-gray-700 flex gap-2">
                <input type="checkbox" />
                <p>Remember me</p>
              </div>

              <Button
                className={`text-[13px] active:scale-95 active:bg-black/90`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Login
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
              Don't have an account
              <span
                className="text-blue-600 pl-1 cursor-pointer"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Create one
              </span>
            </p>

            <hr className="h-[1px] bg-gray-200 border-0 flex-1 mt-4" />
            <p className="font-semibold text-gray-500 text-[10px] font-sans flex items-center gap-1.5 mt-4">
              <LockKeyholeIcon size={24} /> Your account's protected by
              Findora's secure verification system
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
