import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { resendVerificationEmail } from "../services/authApi";
import { toast } from "react-toastify";
import { AuthShell } from "../components/AuthShell";
import { AuthInput } from "../components/AuthInput";

export const ResendEmail = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const isSignUp = location.state?.isSignUp || false;

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);

      if (isSignUp) {
        setIsSuccess(true);
        const timer = setTimeout(() => {
          setIsSuccess(false);
        }, 5000);

        return () => clearTimeout(timer);
      }
    }
  }, [location.state, isSignUp]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await resendVerificationEmail(email.trim());
      setIsSuccess(true);
      toast.success("Verification email sent successfully!");

      setTimeout(() => {
        setEmail("");
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to resend email";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const title = isSignUp ? "Verify Your Email" : "Resend Verification";
  const subtitle = isSignUp
    ? "We sent a link already. If it didn't arrive, request a fresh one here."
    : "Enter your account email and we will send a new verification link.";

  return (
    <AuthShell title={title} subtitle={subtitle}>
      {isSuccess ? (
        <div className="space-y-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-700" />
            <h3 className="mt-4 text-xl font-display font-bold text-emerald-900">{isSignUp ? "Account Created" : "Email Sent"}</h3>
            <p className="mt-2 text-sm text-emerald-800">
              We've sent a verification link to <span className="font-semibold">{email || location.state?.email}</span>.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-white/60 p-4 text-sm text-emerald-900">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>The verification link expires in 24 hours. Check spam/promotions if it doesn't appear.</p>
            </div>
          </div>

          <button
            onClick={() => {
              setEmail("");
              setIsSuccess(false);
            }}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Send Another Email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            id="email"
            label="Email Address"
            type="email"
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
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mail className="h-5 w-5" />}
            {isLoading ? "Sending..." : "Send Verification Email"}
          </button>
        </form>
      )}

      <div className="mt-6 text-center text-sm text-slate-600">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-violet-700 hover:text-violet-800">
            Go to Login
          </Link>
        </p>
        {!isSignUp ? (
          <p className="mt-2">
            Need an account?{" "}
            <Link to="/signup" className="font-semibold text-violet-700 hover:text-violet-800">
              Create one
            </Link>
          </p>
        ) : null}
      </div>
    </AuthShell>
  );
};
