/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { io } from "socket.io-client";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "@/features/authentication";
import { toast } from "react-toastify";
const BASE_URL = "http://localhost:8080";
export const useAuthStore = create((set, get) => ({
  user: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,
  socket: null,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const data = await getCurrentUser();
      set({ user: data });

      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (userInfo) => {
    set({ isSigningUp: true });
    try {
      const data = await registerUser(userInfo);
      set({ user: data });
      toast.success("Account created successfully!");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign up Failed");
      console.log("Error in sign up", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIng: true, isCheckingAuth: true });
    try {
      const data = await loginUser(credentials);
      set({ user: data });
      toast.success("Logged in successfully!");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login");
      console.log("Error in login", error);
    } finally {
      set({ isLoggingIng: false, isCheckingAuth: false });
    }
  },

  logOut: async () => {
    try {
      await logoutUser();
      set({ user: null });
      toast.success("Logged out successfully!");

      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in logout", error);
    }
  },

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io(BASE_URL);
    socket.connect();
    set({ socket: socket });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
