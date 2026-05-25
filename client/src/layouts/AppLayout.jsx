import { Outlet } from "react-router-dom";
import { MainNavbar } from "./MainNavbar";
import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavContext } from "@/context/NavContext";
import { OnboardingModal } from "@/components/OnboardingModal";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export const AppLayout = () => {
  const { subscribeToMessages, unsubscribeFromMessage, fetchUsersToChat } =
    useChatStore();
  const { user } = useAuthStore();
  const { sidebarMode } = useNavContext();
  usePushNotifications();

  useEffect(() => {
    if (user) {
      // 1. Fetch the initial list to calculate unread status
      fetchUsersToChat();

      // 2. Start listening for real-time updates
      subscribeToMessages();
    }

    return () => unsubscribeFromMessage();
  }, [user, fetchUsersToChat, subscribeToMessages, unsubscribeFromMessage]);

  const desktopPaddingClass =
    sidebarMode === "full"
      ? "lg:pl-72"
      : sidebarMode === "icons"
      ? "lg:pl-20"
      : "lg:pl-0";

  return (
    <div className={`min-h-screen bg-slate-50 ${desktopPaddingClass}`}>
      <MainNavbar />
      <main className="min-h-screen bg-slate-50 flow-root pt-14 md:pt-16 lg:pt-0">
        <Outlet />
      </main>
      <OnboardingModal />
    </div>
  );
};
