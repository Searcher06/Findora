import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, MessageSquare, Plus, Layers, User } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { useItemType } from "@/features/items/context/ItemTypeContext";

export const BottomTabBar = () => {
  const location = useLocation();
  const { setPostType } = useItemType();

  // Hide tab bar on active chat page — full screen experience
  if (location.pathname.startsWith("/chat/")) return null;

  const pathParts = location.pathname.split("/");
  const currentChatId = location.pathname.startsWith("/chat/") ? pathParts[2] : null;
  const unreadCount = useChatStore((state) => state.getUnreadCount(currentChatId));

  const isBrowseActive = location.pathname === "/" || location.pathname.startsWith("/items");
  const isMessagesActive = location.pathname.startsWith("/chats") || location.pathname.startsWith("/chat/");
  const isMyItemsActive = location.pathname.startsWith("/my-items");
  const isProfileActive =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/change-password") ||
    location.pathname.startsWith("/leaderboard") ||
    location.pathname.startsWith("/u/");

  const tabs = [
    { to: "/", icon: LayoutGrid, label: "Browse", active: isBrowseActive },
    { to: "/chats", icon: MessageSquare, label: "Messages", active: isMessagesActive, badge: unreadCount > 0 ? unreadCount : null },
  ];

  const rightTabs = [
    { to: "/my-items", icon: Layers, label: "My Items", active: isMyItemsActive },
    { to: "/profile", icon: User, label: "Profile", active: isProfileActive },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      {/* Glass background */}
      <div className="relative flex h-16 items-center justify-around border-t border-slate-200/80 bg-white/95 px-2 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl">

        {/* Left tabs */}
        {tabs.map((tab) => (
          <TabItem key={tab.to} tab={tab} />
        ))}

        {/* Center action button — floating above bar */}
        <div className="relative -mt-6 flex flex-col items-center">
          <Link
            to="/report"
            onClick={() => setPostType("lost")}
            aria-label="Report Item"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/40 transition-transform active:scale-95"
          >
            <Plus className="h-7 w-7 text-white" strokeWidth={2.5} />
          </Link>
          <span className="mt-1 text-[10px] font-semibold text-slate-400">Report</span>
        </div>

        {/* Right tabs */}
        {rightTabs.map((tab) => (
          <TabItem key={tab.to} tab={tab} />
        ))}
      </div>

      {/* Safe area spacer for iOS home indicator */}
      <div className="h-safe-bottom bg-white/95" />
    </nav>
  );
};

const TabItem = ({ tab }) => (
  <Link
    to={tab.to}
    className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-1"
    aria-label={tab.label}
  >
    <div className="relative">
      <tab.icon
        className={`h-5 w-5 transition-colors ${
          tab.active ? "text-indigo-600" : "text-slate-400"
        }`}
        strokeWidth={tab.active ? 2.5 : 2}
      />
      {tab.badge ? (
        <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[9px] font-bold text-white">
          {tab.badge > 9 ? "9+" : tab.badge}
        </span>
      ) : null}
    </div>
    <span
      className={`text-[10px] font-semibold transition-colors ${
        tab.active ? "text-indigo-600" : "text-slate-400"
      }`}
    >
      {tab.label}
    </span>
    {/* Active indicator dot */}
    {tab.active ? (
      <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-indigo-600" />
    ) : null}
  </Link>
);
