import { useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../services/authApi";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

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

  return { login, signUp, logOut, isLoading, error, user };
};
