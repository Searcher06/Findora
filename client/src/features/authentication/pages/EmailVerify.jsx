import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import { verifyEmail, resendVerificationEmail } from "../services/authApi";
import { toast } from "react-toastify";

export const EmailVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
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

        // Redirect to home after 3 seconds
        setTimeout(() => {
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
  }, [token, navigate]);

  const handleResendEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsResending(true);
    try {
      await resendVerificationEmail(email);
      toast.success("Verification email sent! Check your inbox.");
      setEmail("");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to resend email";
      toast.error(errorMsg);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Verifying State */}
        {status === "verifying" && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-6 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h2>
            <p className="text-gray-600 mb-4">Please wait while we verify your email address...</p>
            <div className="flex gap-2 justify-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">Your email has been verified successfully.</p>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Redirecting to home in a few seconds...</p>
              <Link
                to="/"
                className="inline-block w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Home
              </Link>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="bg-red-100 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Verification Failed</h2>
            <p className="text-gray-600 mb-6 text-center">{errorMessage}</p>

            {/* Resend Email Form */}
            <form onSubmit={handleResendEmail} className="space-y-4 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    disabled={isResending}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isResending}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend Verification Email"
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className="text-center">
              <p className="text-gray-600 mb-2">Already have an account?</p>
              <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Back to Login
              </Link>
            </div>
          </div>
        )}

        {/* Additional Help */}
        <div className="mt-6 bg-white rounded-lg shadow p-4 text-center text-sm text-gray-600">
          <p>
            Didn't receive the email?{" "}
            <Link to="/resend-email" className="text-blue-600 font-semibold hover:text-blue-700">
              Resend it here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
