import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, AtSign, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";
import { validateEmail } from "@/utils/validateEmail";
import { textValidator } from "@/utils/textValidator";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthShell } from "../components/AuthShell";
import { AuthInput } from "../components/AuthInput";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { isSigningUp, signUp } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const isDisabled =
    !formData.firstName ||
    !formData.lastName ||
    !formData.password ||
    !formData.email ||
    !formData.username ||
    isSigningUp;

  const handleSignUp = async (event) => {
    event.preventDefault();

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      username: formData.username.trim(),
      password: formData.password,
    };

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.password || !payload.username) {
      toast.error("Please add all fields");
      return;
    }

    if (payload.password.length < 6) {
      toast.error("Password must be atleast 6 characters");
      return;
    }

    if (payload.firstName.length < 4) {
      toast.error("Firstname must be atleast 4 characters long");
      return;
    }

    if (payload.lastName.length < 4) {
      toast.error("Lastname must be atleast 4 characters long");
      return;
    }

    if (payload.username.length < 4) {
      toast.error("username must be atleast 4 characters long");
      return;
    }

    if (textValidator(payload.username)) {
      toast.error("Username can only contain letters and numbers");
      return;
    }

    if (!validateEmail(payload.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const data = await signUp(payload);

    if (data) {
      navigate("/resend-email", {
        state: { email: payload.email, isSignUp: true },
      });

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
    <AuthShell
      title="Create Account"
      subtitle="Join Findora and start recovering items with confidence."
      bottomNote="Your account is secured with protected sessions and verification flows."
    >
      <form onSubmit={handleSignUp} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthInput
            id="firstName"
            label="First Name"
            type="text"
            placeholder="First name"
            value={formData.firstName}
            onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
            icon={User}
            autoComplete="given-name"
            disabled={isSigningUp}
          />
          <AuthInput
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
            icon={User}
            autoComplete="family-name"
            disabled={isSigningUp}
          />
        </div>

        <AuthInput
          id="username"
          label="Username"
          type="text"
          placeholder="Choose a username"
          value={formData.username}
          onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
          icon={AtSign}
          autoComplete="username"
          disabled={isSigningUp}
        />

        <AuthInput
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          icon={Mail}
          autoComplete="email"
          disabled={isSigningUp}
        />

        <AuthInput
          id="password"
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          icon={Lock}
          autoComplete="new-password"
          disabled={isSigningUp}
        />

        <button
          type="submit"
          disabled={isDisabled}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSigningUp ? <Spinner /> : null}
          {isSigningUp ? "Creating your account..." : "Create Account"}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-cyan-700 hover:text-cyan-800">
            Sign in
          </Link>
        </p>

        <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
          <ShieldCheck className="h-4 w-4 text-slate-700" />
          Protected by Findora's secure verification system
        </div>
      </div>
    </AuthShell>
  );
};
