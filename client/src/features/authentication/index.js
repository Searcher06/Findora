import LoginPage from "./pages/Login";
import { SignUpPage } from "./pages/SignUp";
import { EmailVerify } from "./pages/EmailVerify";
import { ResendEmail } from "./pages/ResendEmail";
import { getCurrentUser, registerUser, loginUser, logoutUser, verifyEmail, resendVerificationEmail } from "./services/authApi";
export {
  LoginPage,
  SignUpPage,
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  resendVerificationEmail,
  EmailVerify,
  ResendEmail,
};
