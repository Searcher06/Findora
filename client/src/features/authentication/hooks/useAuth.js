import { loginUser, registerUser, logoutUser } from "../services/authApi";
import { useAuthStore } from "@/context/AuthContext";

export const useAuth = () => {
  const { user, setUser, isLoading, setIsLoading, error, setError } =
    useAuthStore();

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const data = await loginUser(credentials);
      setUser(data);
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userInfo) => {
    try {
      setIsLoading(true);
      const data = await registerUser(userInfo);
      setUser(data);
    } catch (error) {
      setError(error.response?.data?.message || "Sign up Failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log("Log out failed", error);
    }
  };

  return { login, signUp, logOut, isLoading, error, user, setIsLoading };
};
