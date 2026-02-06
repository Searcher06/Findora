import InputFieldsContainer from "../components/InputFieldsContainer";
import InputField from "../components/InputField";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/useAuthStore";

const LoginPage = () => {
  const { login, isLoggingIng } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const disabledStyle =
    !formData.email || !formData.password ? "bg-gray-900" : null;

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please add all fields");
      return;
    }

    const data = await login(formData);
    if (data) {
      navigate("/");
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center py-8 sm:py-12">
      {/* Mobile & Tablet Layout (< lg) */}
      <div className="lg:hidden w-full max-w-xs sm:max-w-sm px-4 sm:px-6 flex flex-col">
        {/* Logo Text - At Very Top */}
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-12">
          Findora
        </h2>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-8">
          Login
        </h1>

        {/* Form */}
        <form className="w-full" onSubmit={(event) => event.preventDefault()}>
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
              disabled={isLoggingIng ? true : false}
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
              disabled={isLoggingIng ? true : false}
            />

            <div className="text-[12.5px] font-sans text-gray-700 flex gap-2">
              <input type="checkbox" />
              <p>Remember me</p>
            </div>

            <Button
              className={`w-full h-10 sm:h-11 text-sm sm:text-[15px] font-semibold active:scale-95 transition-transform ${disabledStyle}`}
              onClick={handleSubmit}
              disabled={isLoggingIng}
            >
              {isLoggingIng ? <Spinner /> : null}
              {isLoggingIng ? "Signing you in..." : "Login"}
            </Button>
          </InputFieldsContainer>

          <p className="mt-6 text-gray-600 font-sans text-xs sm:text-sm w-full flex justify-center gap-1">
            Don't have an account?
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create one
            </span>
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
        <div className="flex-1 bg-blue-100 flex flex-col justify-start pt-12 xl:pt-16 items-center p-8 xl:p-12">
          <div className="max-w-md w-full">
            {/* Logo Text - At Very Top */}
            <h2 className="text-5xl xl:text-6xl font-display font-bold text-gray-900 mb-16">
              Findora
            </h2>

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
            <h1 className="text-2xl xl:text-3xl font-display font-bold text-gray-900 mb-8">
              Login
            </h1>

            {/* Form */}
            <form
              className="w-full"
              onSubmit={(event) => event.preventDefault()}
            >
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
                  disabled={isLoggingIng ? true : false}
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
                  disabled={isLoggingIng ? true : false}
                />

                <div className="text-[12.5px] font-sans text-gray-700 flex gap-2">
                  <input type="checkbox" />
                  <p>Remember me</p>
                </div>

                <Button
                  className={`w-full h-11 text-[15px] font-semibold active:scale-95 transition-transform ${disabledStyle}`}
                  onClick={handleSubmit}
                  disabled={isLoggingIng}
                >
                  {isLoggingIng ? <Spinner /> : null}
                  {isLoggingIng ? "Signing you in..." : "Login"}
                </Button>
              </InputFieldsContainer>

              <p className="mt-8 text-gray-600 font-sans text-sm w-full flex justify-center gap-1">
                Don't have an account?
                <span
                  className="text-blue-600 font-semibold cursor-pointer hover:underline"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Create one
                </span>
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

export default LoginPage;
