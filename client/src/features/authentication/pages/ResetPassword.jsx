import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { resetPassword } from "../services/authApi";
import { AuthShell } from "../components/AuthShell";
import { AuthInput } from "../components/AuthInput";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const hasToken = useMemo(() => Boolean(token), [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hasToken) {
      toast.error("Invalid reset link");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword(token, password);
      toast.success(response.message || "Password reset successful");
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasToken) {
    return (
      <AuthShell title="Invalid Reset Link" subtitle="This link is missing a token or has expired.">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">Please request a fresh reset link and try again.</div>
        <p className="mt-6 text-center text-sm text-slate-600">
          <Link to="/forgot-password" className="font-semibold text-violet-700 hover:text-violet-800">
            Request new reset link
          </Link>
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Reset Password" subtitle="Set a new password for your account.">
      {isSuccess ? (
        <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-700" />
          <p className="text-sm text-emerald-900">Password updated successfully. Redirecting to login...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            id="new-password"
            label="New Password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            autoComplete="new-password"
            disabled={isLoading}
          />

          <AuthInput
            id="confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="Repeat new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={Lock}
            autoComplete="new-password"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !password || !confirmPassword}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-600">
        Back to{" "}
        <Link to="/login" className="font-semibold text-violet-700 hover:text-violet-800">
          Login
        </Link>
      </p>
    </AuthShell>
  );
};
