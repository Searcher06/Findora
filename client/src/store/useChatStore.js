import { create } from "zustand";
import {
  getMessages,
  sendMessage,
  getUsersToChat,
  markAsRead,
} from "@/features/chat/services/chatApi";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";
import sound from "../../public/notification.mp3";

const playNotificationSound = () => {
  try {
    const audio = new Audio(sound);
    audio.volume = 0.5;
    audio.play();
  } catch (error) {
    // Fail silently to avoid breaking the UI if browser blocks autoplay
    console.warn("Audio playback failed:", error);
  }
};

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
      toast.error(error.response?.data?.message || "failed to fetch messages");
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
    socket.off("newChatRequest");

    // --- LISTEN FOR NEW MESSAGES ---
    socket.on("newMessage", (newMessage) => {
      const { user } = useAuthStore.getState();
      const { messages, usersToChat } = get();

      // HCI: Trigger sound only if the message is from someone else
      if (newMessage.senderId._id !== user._id) {
        playNotificationSound();
      }

      const currentPath = window.location.pathname;
      const pathParts = currentPath.split("/");
      const activeChatId = currentPath.startsWith("/chat/")
        ? pathParts[2]
        : null;

      // 1. Update active message thread
      set({ messages: [...messages, newMessage] });

      // 2. Update conversation list + sorting
      const updatedUsersToChat = usersToChat
        .map((conv) => {
          if (conv._id === newMessage.requestId) {
            const isFinder = conv.finderId._id === user._id;
            const isCurrentlyViewing = activeChatId === conv._id;

            return {
              ...conv,
              lastMessage: newMessage,
              lastMessageAt: newMessage.createdAt,
              lastSeen: isCurrentlyViewing
                ? {
                    ...conv.lastSeen,
                    [isFinder ? "finder" : "claimer"]: new Date().toISOString(),
                  }
                : conv.lastSeen,
            };
          }
          return conv;
        })
        .sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));

      set({ usersToChat: updatedUsersToChat });

      if (activeChatId === newMessage.requestId) {
        get().markMessagesAsRead(newMessage.requestId);
      }
    });

    // --- LISTEN FOR NEW CHAT REQUESTS ---
    socket.on("newChatRequest", (newChat) => {
      // Play sound for every new request incoming
      playNotificationSound();

      set((state) => {
        const exists = state.usersToChat.some((c) => c._id === newChat._id);
        if (exists) return state;

        const newList = [newChat, ...state.usersToChat].sort(
          (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
        );

        return {
          usersToChat: newList,
        };
      });

      toast.info(
        `New request received for ${newChat.itemId?.name || "an item"}`
      );
    });
  },

  unsubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
      socket.off("newChatRequest");
    }
  },

  fetchUsersToChat: async () => {
    try {
      set({ isUsersLoading: true });
      const response = await getUsersToChat();
      const sortedResponse = response.sort(
        (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
      );
      set({ usersToChat: sortedResponse });
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

    const { usersToChat } = get();
    const { user } = useAuthStore.getState();

    const updatedUsersToChat = usersToChat.map((conv) => {
      if (conv._id === requestId) {
        const isFinder = conv.finderId._id === user?._id;
        return {
          ...conv,
          lastSeen: {
            ...conv.lastSeen,
            [isFinder ? "finder" : "claimer"]: new Date().toISOString(),
          },
        };
      }
      return conv;
    });

    set({ usersToChat: updatedUsersToChat });

    try {
      await markAsRead(requestId);
    } catch (error) {
      console.error("Failed to sync read status:", error);
    }
  },

  getUnreadCount: (activeRequestId = null) => {
    const { usersToChat } = get();
    const { user } = useAuthStore.getState();

    if (!user || !usersToChat) return 0;

    return usersToChat.filter((conv) => {
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
