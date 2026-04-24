import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Loader2, CheckCircle, ArrowLeft, AlertCircle } from "lucide-react";
import { resendVerificationEmail } from "../services/authApi";
import { toast } from "react-toastify";

export const ResendEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const isSignUp = location.state?.isSignUp || false;

  // Pre-fill email if coming from signup
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      // Show success state immediately if coming from signup
      if (isSignUp) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    }
  }, [location.state, isSignUp]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await resendVerificationEmail(email);
      setIsSuccess(true);
      toast.success("Verification email sent successfully!");

      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("");
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to resend email";
      toast.error(errorMsg);
      console.log("Error resending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{isSignUp ? "Verify Your Email" : "Resend Verification Email"}</h2>
            {!isSignUp && (
              <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Go back">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          {isSuccess ? (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{isSignUp ? "Account Created!" : "Email Sent!"}</h3>
                <p className="text-gray-600 mb-6">
                  We've sent a verification email to <span className="font-semibold text-gray-900">{email}</span>. Please check your inbox
                  and click the verification link.
                </p>
                <p className="text-sm text-gray-500 mb-6">The link will expire in 24 hours.</p>

                {isSignUp && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex gap-3 text-left">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">What's next?</p>
                        <p>Check your email for a verification link and click it to complete your registration.</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setEmail("");
                      setIsSuccess(false);
                    }}
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Another Email
                  </button>
                  <Link to="/login" className="block text-center text-blue-600 font-semibold hover:text-blue-700 transition-colors py-2">
                    Back to Login
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Form */}
              <p className="text-gray-600 mb-6">
                {isSignUp
                  ? "We've sent a verification email to your inbox. Didn't receive it? Request a new one below."
                  : "Enter your email address and we'll send you a new verification link."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      disabled={isLoading}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">Use the email address associated with your Findora account.</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      {isSignUp ? "Send Verification Email Again" : "Send Verification Email"}
                    </>
                  )}
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600 text-sm mb-3">{isSignUp ? "Already verified your email?" : "Already have an account?"}</p>
                <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Go to Login
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          {!isSignUp && (
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700">
                Sign up here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
