import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Mail, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { verifyEmail, resendVerificationEmail } from "../services/authApi";
import { AuthShell } from "../components/AuthShell";
import { AuthInput } from "../components/AuthInput";

export const EmailVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let redirectTimer;

    const verifyTokenEmail = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("No verification token provided");
        return;
      }

      try {
        setStatus("verifying");
        await verifyEmail(token);
        setStatus("success");
        toast.success("Email verified successfully!");

        redirectTimer = setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        setStatus("error");
        const errorMsg = error.response?.data?.message || "Failed to verify email";
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    };

    verifyTokenEmail();

    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [token, navigate]);

  const handleResendEmail = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsResending(true);
    try {
      await resendVerificationEmail(email.trim());
      toast.success("Verification email sent! Check your inbox.");
      setEmail("");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to resend email";
      toast.error(errorMsg);
    } finally {
      setIsResending(false);
    }
  };

  const titleMap = {
    verifying: "Verifying Email",
    success: "Email Verified",
    error: "Verification Failed",
  };

  const subtitleMap = {
    verifying: "Please wait while we confirm your verification link.",
    success: "Your account is verified and ready.",
    error: "This verification link is invalid or expired.",
  };

  return (
    <AuthShell title={titleMap[status]} subtitle={subtitleMap[status]}>
      {status === "verifying" ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-violet-700" />
          <p className="mt-4 text-sm text-slate-600">This should only take a moment.</p>
        </div>
      ) : null}

      {status === "success" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-700" />
          <p className="mt-4 text-sm text-emerald-800">Redirecting to home in a few seconds.</p>
          <Link
            to="/"
            className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Go to Home
          </Link>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="space-y-5">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-800">
            <div className="flex items-start gap-3">
              <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          </div>

          <form onSubmit={handleResendEmail} className="space-y-4">
            <AuthInput
              id="resend-email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              autoComplete="email"
              disabled={isResending}
            />

            <button
              type="submit"
              disabled={isResending}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isResending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
              {isResending ? "Sending..." : "Resend Verification Email"}
            </button>
          </form>

          <div className="text-center text-sm text-slate-600">
            Already verified?{" "}
            <Link to="/login" className="font-semibold text-violet-700 hover:text-violet-800">
              Go to Login
            </Link>
          </div>
        </div>
      ) : null}

      <div className="mt-6 text-center text-sm text-slate-600">
        Need another link?{" "}
        <Link to="/resend-email" className="font-semibold text-violet-700 hover:text-violet-800">
          Resend from here
        </Link>
      </div>
    </AuthShell>
  );
};
