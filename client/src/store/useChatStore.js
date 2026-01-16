/* eslint-disable no-unused-vars */
import { create } from "zustand";
import {
  getMessages,
  sendMessage,
  getUsersToChat,
  markAsRead,
} from "@/features/chat/services/chatApi";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set, get) => ({
  messages: [],
  conversations: [],
  onlineUsers: [],
  usersToChat: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getMessages: async (requestId, username) => {
    if (!requestId || !username) return;
    try {
      set({ isMessagesLoading: true });
      const response = await getMessages(requestId, username);
      set({ messages: response });
    } catch (error) {
      toast.error(error.response?.data?.message || "failed to send message");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (requestId, username, data) => {
    const { messages } = get();
    if (!requestId || !username) return;

    try {
      const response = await sendMessage(requestId, username, data);
      set({ messages: [...messages, response] });
    } catch (error) {
      toast.error(error.response?.data?.message || "failed to send message");
    }
  },

  subscribeToMessages: (username) => {
    if (!username) return;
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  fetchUsersToChat: async () => {
    try {
      const response = await getUsersToChat();
      set({ usersToChat: [...response] });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "failed to fetch conversations"
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },
  markMessagesAsRead: async (requestId) => {
    if (!requestId) return;
    try {
      const response = await markAsRead(requestId);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },
}));
