import { Outlet, useLocation } from "react-router-dom";
import { MainNavbar } from "./MainNavbar";
import { BottomTabBar } from "./BottomTabBar";
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
  const location = useLocation();
  usePushNotifications();

  useEffect(() => {
    if (user) {
      fetchUsersToChat();
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
      {/* pt-14 for mobile top bar, pb-20 to clear bottom tab bar, lg resets both
          Chat page is full-screen so it manages its own layout */}
      <main className={`min-h-screen bg-slate-50 flow-root lg:pt-0 lg:pb-0 ${
        location.pathname.startsWith("/chat/")
          ? "pt-0 pb-0"
          : "pt-14 pb-20 md:pt-16 md:pb-20"
      }`}>
        <Outlet />
      </main>
      <BottomTabBar />
      <OnboardingModal />
    </div>
  );
};
