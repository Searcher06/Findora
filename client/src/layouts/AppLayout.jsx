import { Outlet } from "react-router-dom";
import { MainNavbar } from "./MainNavbar";
import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";

export const AppLayout = () => {
  const { subscribeToMessages, unsubscribeFromMessage, fetchUsersToChat } =
    useChatStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      // 1. Fetch the initial list to calculate unread status
      fetchUsersToChat();

      // 2. Start listening for real-time updates
      subscribeToMessages();
    }

    return () => unsubscribeFromMessage();
  }, [user, fetchUsersToChat, subscribeToMessages, unsubscribeFromMessage]);

  return (
    <div className="min-h-screen bg-slate-50 lg:pl-72">
      <MainNavbar />
      <main className="min-h-screen bg-slate-50 flow-root">
        <Outlet />
      </main>
    </div>
  );
};
