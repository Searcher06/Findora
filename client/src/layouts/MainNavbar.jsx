import { SideBar } from "@/components/SideBar";
import { useNavContext } from "@/context/NavContext";
import { Overlay } from "./Overlay";
import { useChatStore } from "@/store/useChatStore";
import { useLocation, Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Logo } from "../components/logo";
import {
  Menu,
  MessageSquare,
  User,
  LayoutGrid,
  PlusIcon,
  ChevronRight,
  Bell,
} from "lucide-react";
import { useItemType } from "@/features/items/context/ItemTypeContext";

export const MainNavbar = () => {
  const { handleSidebar, openSidebar, setOpenSidebar } = useNavContext();
  const { setPostType } = useItemType();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const pathParts = location.pathname.split("/");
  const currentChatId = location.pathname.startsWith("/chat/")
    ? pathParts[2]
    : null;

  const unreadCount = useChatStore((state) =>
    state.getUnreadCount(currentChatId),
  );

  const isBrowseActive =
    location.pathname === "/" || location.pathname.startsWith("/items");
  const isReportActive =
    location.pathname.startsWith("/report") || location.pathname.startsWith("/update");
  const isMessageActive =
    location.pathname.startsWith("/chats") || location.pathname.startsWith("/chat/");
  const isProfileActive =
    location.pathname.startsWith("/profile") || location.pathname.startsWith("/change-password");

  const desktopLinks = [
    {
      to: "/",
      icon: LayoutGrid,
      label: "Browse Items",
      active: isBrowseActive,
      onClick: undefined,
    },
    {
      to: "/report",
      icon: PlusIcon,
      label: "Report Item",
      active: isReportActive,
      onClick: () => setPostType("lost"),
    },
    {
      to: "/chats",
      icon: MessageSquare,
      label: "Messages",
      active: isMessageActive,
      badge: unreadCount > 0 ? unreadCount : null,
      onClick: undefined,
    },
    {
      to: "/profile",
      icon: User,
      label: "Profile",
      active: isProfileActive,
      onClick: undefined,
    },
  ];

  const getDisplayName = () => {
    if (!user) return "Guest";
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    if (user.firstName) return user.firstName;
    return user.username || "Guest";
  };

  return (
    <>
      <aside className="fixed left-0 top-0 z-20 hidden h-screen w-72 overflow-hidden border-r border-sky-100 bg-[linear-gradient(180deg,#f9fbff_0%,#eef5ff_55%,#ffffff_100%)] lg:flex lg:flex-col">
        <div className="pointer-events-none absolute -right-10 -top-8 h-36 w-36 rounded-full bg-sky-200/35 blur-2xl" />
        <div className="pointer-events-none absolute -left-8 bottom-20 h-44 w-44 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative flex h-full flex-col p-5 text-slate-800">
          <Link to="/" className="inline-flex items-center gap-2">
            <Logo className="h-14 w-auto text-slate-900" />
          </Link>

          <div className="mt-2 rounded-xl border border-sky-100 bg-white/80 px-3 py-2 text-xs text-slate-600">
            Smart lost & found workspace
          </div>

          <nav className="mt-8 space-y-2">
            {desktopLinks.map(({ to, icon: Icon, label, active, badge, onClick }) => (
              <Link
                key={to}
                to={to}
                onClick={onClick}
                className={`group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-white text-slate-900 shadow-lg shadow-sky-900/10"
                    : "text-slate-600 hover:bg-sky-50"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${active ? "text-blue-700" : "text-slate-400"}`} />
                  {label}
                </span>
                <span className="flex items-center gap-2">
                  {badge ? (
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      {badge}
                    </span>
                  ) : null}
                  <ChevronRight className={`h-4 w-4 transition ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-slate-200 bg-white/85 p-3">
            <Link to="/profile" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-sm font-bold uppercase text-white">
                {getDisplayName().slice(0, 1)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{getDisplayName()}</p>
                <p className="truncate text-xs text-slate-500">@{user?.username || "guest"}</p>
              </div>
            </Link>
          </div>
        </div>
      </aside>

      <nav className="fixed left-0 top-0 z-20 flex h-14 w-full items-center justify-between border-b border-slate-200/90 bg-white/90 px-4 backdrop-blur md:h-16 lg:hidden">
        <div className="relative">
          <button
            type="button"
            onClick={handleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>

        <Link to="/" className="inline-flex items-center">
          <Logo className="h-12 w-auto text-slate-900" />
        </Link>

        <Link
          to="/chats"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm"
          aria-label="Open notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : null}
        </Link>
      </nav>

      {openSidebar && (
        <>
          <Overlay onClick={() => setOpenSidebar(false)} />
          <SideBar
            setOpenSidebar={setOpenSidebar}
            unreadCount={unreadCount}
            setPostType={setPostType}
            locationPath={location.pathname}
          />
        </>
      )}
    </>
  );
};
