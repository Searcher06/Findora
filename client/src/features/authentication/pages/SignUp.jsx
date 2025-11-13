/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { LockKeyholeIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../components/icons/Google";
import InputField from "../components/InputField";
import InputFieldsContainer from "../components/InputFieldsContainer";
import ContinueWith from "../components/ContinueWith";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "@/utils/validateEmail";
import { textValidator } from "@/utils/textValidator";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/context/AuthContext";
export const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const { signUp } = useAuth();
  const { isLoading, error } = useAuthStore();
  const disabledStyle =
    !formData.firstName ||
    !formData.lastName ||
    !formData.password ||
    !formData.email ||
    !formData.username
      ? "bg-gray-900"
      : null;

  const handleSignUp = async () => {
    console.log(formData);

    formData.firstName = formData.firstName.trim();
    formData.lastName = formData.lastName.trim();
    formData.email = formData.email.trim();
    formData.username = formData.username.trim();
    // checking all the fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.username
    ) {
      toast.error("Please add all fields");
      return;
    }

    // checking the password length
    if (formData.password.length < 6) {
      toast.error("Password must be atleast 6 characters");
      return;
    }

    // checking the firstname length
    if (formData.firstName.length < 4) {
      toast.error("Firstname must be atleast 4 characters long");
      return;
    }

    // checking the lastname length
    if (formData.lastName.length < 4) {
      toast.error("Lastname must be atleast 4 characters long");
      return;
    }

    // checking the username length
    if (formData.username.length < 4) {
      toast.error("username must be atleast 4 characters long");
      return;
    }

    if (textValidator(formData.username)) {
      toast.error("Username can only contain letters and numbers");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await signUp(formData);
      toast.success("Account created successfully");
      console.log("Account created:", response);
      navigate("/");
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
      });
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
      <div className="flex border w-75 shadow-lg rounded-lg">
        <div id="left" className="hidden">
          Left
        </div>
        <div id="right" className="w-full">
          <form
            className="w-full p-6"
            onSubmit={(e) => {
              e.preventDefault();
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
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    firstName: e.target.value,
                  }));
                }}
                disabled={isLoading ? true : false}
              />
              <InputField
                icon={"UserIcon"}
                type={"text"}
                placeholder={"Lastname"}
                value={formData.lastName}
                change={"lastName"}
                setFormData={setFormData}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    lastName: e.target.value,
                  }));
                }}
                disabled={isLoading ? true : false}
              />
              <InputField
                icon={"AtSignIcon"}
                type={"text"}
                placeholder={"Username"}
                change={"username"}
                value={formData.username}
                setFormData={setFormData}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    username: e.target.value,
                  }));
                }}
                disabled={isLoading ? true : false}
              />
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

              <Button
                className={`text-[13px] active:scale-95 active:bg-black/90 ${disabledStyle}`}
                disabled={
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.password ||
                  !formData.email ||
                  !formData.username ||
                  isLoading
                }
                onClick={handleSignUp}
              >
                {isLoading ? <Spinner /> : null}
                {isLoading ? "Creating your account" : "Create Account"}
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
              <Link className="text-blue-600 pl-1 cursor-pointer" to={"/login"}>
                Log in
              </Link>
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
