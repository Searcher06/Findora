import LoginPage from "./pages/Login";
import { SignUpPage } from "./pages/SignUp";
import { useAuth } from "./hooks/useAuth";
import {
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
} from "./services/authApi";
export {
  LoginPage,
  SignUpPage,
  useAuth,
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
};
