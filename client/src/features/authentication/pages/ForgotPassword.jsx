import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { forgotPassword } from "../services/authApi";
import { AuthShell } from "../components/AuthShell";
import { AuthInput } from "../components/AuthInput";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await forgotPassword(email.trim());
      toast.success(response.message || "If that email exists, a reset link has been sent");
      setSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Forgot Password"
      subtitle="Enter your account email and we will send a secure reset link."
      bottomNote="For security, we always show the same response whether the email exists or not."
    >
      {sent ? (
        <div className="space-y-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-700" />
          <p className="text-sm text-emerald-900">Check your inbox for the password reset link.</p>
          <button
            onClick={() => setSent(false)}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Send Another Link
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            id="forgot-email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            autoComplete="email"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mail className="h-5 w-5" />}
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-600">
        Remember your password?{" "}
        <Link to="/login" className="font-semibold text-violet-700 hover:text-violet-800">
          Go to Login
        </Link>
      </p>
    </AuthShell>
  );
};
