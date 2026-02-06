import { Button } from "@/components/ui/button";
import { LockKeyholeIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import InputFieldsContainer from "../components/InputFieldsContainer";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "@/utils/validateEmail";
import { textValidator } from "@/utils/textValidator";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/useAuthStore";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const { isSigningUp, signUp } = useAuthStore();
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

    const data = await signUp(formData);
    if (data) {
      navigate("/");
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center py-8 sm:py-12">
      {/* Mobile & Tablet Layout (< lg) */}
      <div className="lg:hidden w-full max-w-xs sm:max-w-sm px-4 sm:px-6">
        {/* Logo Text - At Top */}
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-display font-bold text-gray-900">
            Findora
          </h2>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-8">
          Sign Up
        </h1>

        {/* Form */}
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <InputFieldsContainer>
            <InputField
              icon={"UserIcon"}
              type={"text"}
              placeholder={"First Name"}
              value={formData.firstName}
              change={"firstName"}
              setFormData={setFormData}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  firstName: e.target.value,
                }));
              }}
              disabled={isSigningUp ? true : false}
            />
            <InputField
              icon={"UserIcon"}
              type={"text"}
              placeholder={"Last Name"}
              value={formData.lastName}
              change={"lastName"}
              setFormData={setFormData}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  lastName: e.target.value,
                }));
              }}
              disabled={isSigningUp ? true : false}
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
              disabled={isSigningUp ? true : false}
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
              disabled={isSigningUp ? true : false}
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
              disabled={isSigningUp ? true : false}
            />

            <Button
              className={`w-full h-10 sm:h-11 text-sm sm:text-[15px] font-semibold active:scale-95 transition-transform ${disabledStyle}`}
              disabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.password ||
                !formData.email ||
                !formData.username ||
                isSigningUp
              }
              onClick={handleSignUp}
            >
              {isSigningUp ? <Spinner /> : null}
              {isSigningUp ? "Creating your account" : "Create Account"}
            </Button>
          </InputFieldsContainer>

          <p className="mt-6 text-gray-600 font-sans text-xs sm:text-sm w-full flex justify-center gap-1">
            Already have an account?
            <Link
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              to={"/login"}
            >
              Log in
            </Link>
          </p>

          <hr className="h-[1px] bg-gray-200 border-0 mt-6 mb-4" />
          <p className="font-medium text-gray-500 text-xs font-sans flex items-center justify-center gap-2">
            <LockKeyholeIcon size={16} /> Protected by Findora's security system
          </p>
        </form>
      </div>

      {/* Desktop Layout (≥ lg) - Centered Container with 50/50 Split */}
      <div className="hidden lg:flex w-full max-w-6xl h-auto mx-auto rounded-xl overflow-hidden shadow-lg">
        {/* Left Side - Branding & Message */}
        <div className="flex-1 bg-blue-100 flex flex-col justify-center items-center p-8 xl:p-12">
          <div className="max-w-md w-full">
            {/* Logo Text - At Top */}
            <div className="mb-8">
              <h2 className="text-2xl xl:text-3xl font-display font-bold text-gray-900">
                Findora
              </h2>
            </div>

            {/* Tagline */}
            <div>
              <h3 className="text-3xl xl:text-4xl font-display font-bold text-gray-900 mb-6 leading-tight">
                Reuniting lost items faster than ever
              </h3>
              <p className="text-base xl:text-lg text-gray-700">
                Reuniting lost items faster than ever
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 bg-white flex flex-col justify-center items-center p-8 xl:p-12">
          <div className="w-full max-w-xs">
            {/* Title */}
            <h1 className="text-3xl xl:text-4xl font-display font-bold text-gray-900 mb-8">
              Sign Up
            </h1>

            {/* Form */}
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <InputFieldsContainer>
                <InputField
                  icon={"UserIcon"}
                  type={"text"}
                  placeholder={"First Name"}
                  value={formData.firstName}
                  change={"firstName"}
                  setFormData={setFormData}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      firstName: e.target.value,
                    }));
                  }}
                  disabled={isSigningUp ? true : false}
                />
                <InputField
                  icon={"UserIcon"}
                  type={"text"}
                  placeholder={"Last Name"}
                  value={formData.lastName}
                  change={"lastName"}
                  setFormData={setFormData}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      lastName: e.target.value,
                    }));
                  }}
                  disabled={isSigningUp ? true : false}
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
                  disabled={isSigningUp ? true : false}
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
                  disabled={isSigningUp ? true : false}
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
                  disabled={isSigningUp ? true : false}
                />

                <Button
                  className={`w-full h-11 text-[15px] font-semibold active:scale-95 transition-transform ${disabledStyle}`}
                  disabled={
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.password ||
                    !formData.email ||
                    !formData.username ||
                    isSigningUp
                  }
                  onClick={handleSignUp}
                >
                  {isSigningUp ? <Spinner /> : null}
                  {isSigningUp ? "Creating your account" : "Create Account"}
                </Button>
              </InputFieldsContainer>

              <p className="mt-8 text-gray-600 font-sans text-sm w-full flex justify-center gap-1">
                Already have an account?
                <Link
                  className="text-blue-600 font-semibold cursor-pointer hover:underline"
                  to={"/login"}
                >
                  Log in
                </Link>
              </p>

              <hr className="h-px bg-gray-200 border-0 mt-8 mb-4" />
              <p className="font-medium text-gray-500 text-xs font-sans flex items-center justify-center gap-2">
                <LockKeyholeIcon size={16} /> Protected by Findora's security
                system
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
