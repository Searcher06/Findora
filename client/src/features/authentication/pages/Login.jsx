import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthShell } from "../components/AuthShell";
import { AuthInput } from "../components/AuthInput";

const LoginPage = () => {
  const { login, isLoggingIng } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isDisabled = !formData.email || !formData.password || isLoggingIng;

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    <AuthShell
      title="Welcome Back"
      subtitle="Sign in to manage reports, chats, and secure handovers."
      bottomNote="Findora protects every step with secure account verification."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          id="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          icon={Mail}
          autoComplete="email"
          disabled={isLoggingIng}
        />

        <AuthInput
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          icon={Lock}
          autoComplete="current-password"
          disabled={isLoggingIng}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link to="/forgot-password" className="font-semibold text-violet-700 transition hover:text-violet-800">
            Forgot password?
          </Link>
          <Link to="/resend-email" className="font-semibold text-violet-700 transition hover:text-violet-800">
            Resend email
          </Link>
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoggingIng ? <Spinner /> : null}
          {isLoggingIng ? "Signing you in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        <p className="text-center text-sm text-slate-600">
          New to Findora?{" "}
          <Link to="/signup" className="font-semibold text-violet-700 hover:text-violet-800">
            Create your account
          </Link>
        </p>

        <div className="flex items-center justify-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/60 px-3 py-2 text-xs text-slate-600">
          <ShieldCheck className="h-4 w-4 text-indigo-700" />
          Protected by Findora's secure verification system
        </div>
      </div>
    </AuthShell>
  );
};

export default LoginPage;
