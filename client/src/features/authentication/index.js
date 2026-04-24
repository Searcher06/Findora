import LoginPage from "./pages/Login";
import { SignUpPage } from "./pages/SignUp";
import { EmailVerify } from "./pages/EmailVerify";
import { ResendEmail } from "./pages/ResendEmail";
import { ForgotPasswordPage } from "./pages/ForgotPassword";
import { ResetPasswordPage } from "./pages/ResetPassword";
import { ChangePasswordPage } from "./pages/ChangePassword";
import {
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  changePassword,
} from "./services/authApi";
export {
  LoginPage,
  SignUpPage,
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  EmailVerify,
  ResendEmail,
  ForgotPasswordPage,
  ResetPasswordPage,
  ChangePasswordPage,
};
