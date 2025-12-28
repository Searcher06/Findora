/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { getMessages, sendMessage } from "@/features/chat/services/chatApi";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set, get) => ({
  messages: [],
  usersToChat: [],
  onlineUser: [],
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

  sendMessage: async (requestId, username, message) => {
    const { messages } = get();
    if (!requestId || !username) return;

    try {
      const response = await sendMessage(requestId, username, message);
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
}));
