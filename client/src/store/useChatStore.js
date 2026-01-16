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

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
    socket.on("newMessage", (newMessage) => {
      const { messages, usersToChat } = get();

      // 1. Update messages array ONLY if this message belongs to the active chat
      // We check if the incoming message's requestId matches what's being viewed
      set({
        messages: [...messages, newMessage],
      });

      // 2. Update usersToChat so the red dot appears on the selection page
      const updatedUsersToChat = usersToChat.map((conv) => {
        if (conv._id === newMessage.requestId) {
          return {
            ...conv,
            lastMessage: newMessage,
            lastMessageAt: newMessage.createdAt,
            // By NOT updating lastSeen here, checkUnread() in your component
            // will now evaluate to TRUE because lastMessageAt > lastSeen
          };
        }
        return conv;
      });

      set({ usersToChat: updatedUsersToChat });
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
  getUnreadCount: (activeRequestId = null) => {
    const { usersToChat } = get();
    const { user } = useAuthStore.getState();

    if (!user || !usersToChat) return 0;

    return usersToChat.filter((conv) => {
      // 1. If this is the chat I am currently viewing, don't count it as unread
      if (activeRequestId && conv._id === activeRequestId) return false;

      if (!conv.lastMessageAt) return false;

      const isFinder = conv.finderId._id === user._id;
      const lastSeen = isFinder
        ? conv.lastSeen?.finder
        : conv.lastSeen?.claimer;

      return new Date(conv.lastMessageAt) > new Date(lastSeen);
    }).length;
  },
}));
