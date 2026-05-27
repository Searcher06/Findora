import { create } from "zustand";
import { io } from "socket.io-client";
import { changePassword, getCurrentUser, loginUser, logoutUser, registerUser } from "@/features/authentication";
import { updateProfile } from "@/features/user/services/api";
import { toast } from "sonner";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:8080";

export const useAuthStore = create((set, get) => ({
  user: null,
  isCheckingAuth: true,
  isUpdating: false,
  isSigningUp: false,
  isLoggingIng: false,
  isChangingPassword: false,
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
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  UpdateProfile: async (datafields) => {
    try {
      set({ isUpdating: true });
      const response = await updateProfile(datafields);
      set({ user: response });
      toast.success("Updated Successfully");
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      console.log("Error in updating profile", error);
      return null;
    } finally {
      set({ isUpdating: false });
    }
  },

  signUp: async (userInfo) => {
    set({ isSigningUp: true });
    try {
      const data = await registerUser(userInfo);
      set({ user: data });
      toast.success("Account created successfully!");

      get().connectSocket(); // connect to socket after successful sign up
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign up Failed");
      console.log("Error in sign up", error);
      return null;
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
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login");
      console.log("Error in login", error);
      return null;
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
      const errorMessage = error.response?.data?.message || "Failed to logout";
      toast.error(errorMessage);
      console.log("Error in logout", error);
    }
  },

  changePassword: async (payload) => {
    set({ isChangingPassword: true });
    try {
      const data = await changePassword(payload);
      toast.success(data.message || "Password changed successfully");
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to change password";
      toast.error(errorMessage);
      return null;
    } finally {
      set({ isChangingPassword: false });
    }
  },

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io(SOCKET_URL, {
      query: {
        username: user.username,
      },
    });
    socket.connect();
    set({ socket: socket });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
