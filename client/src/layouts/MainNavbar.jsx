import { SideBar } from "@/components/SideBar";
import { useNavContext } from "@/context/NavContext";
import { Overlay } from "./Overlay";
import { useChatStore } from "@/store/useChatStore";
import { useLocation, Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Logo } from "../components/logo";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Menu, MessageSquare, User, LayoutGrid, PlusIcon, ChevronRight, Bell, ChevronsLeft, ChevronsRight, X, ShieldCheck, Trophy, Layers } from "lucide-react";
import { useItemType } from "@/features/items/context/ItemTypeContext";

export const MainNavbar = () => {
  const { openSidebar, setOpenSidebar, sidebarMode, setSidebarMode } = useNavContext();
  const { setPostType } = useItemType();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const isCompactDesktop = sidebarMode === "icons";
  const isDesktopHidden = sidebarMode === "hidden";

  const pathParts = location.pathname.split("/");
  const currentChatId = location.pathname.startsWith("/chat/") ? pathParts[2] : null;

  const unreadCount = useChatStore((state) => state.getUnreadCount(currentChatId));

  const isBrowseActive = location.pathname === "/" || location.pathname.startsWith("/items");
  const isReportActive = location.pathname.startsWith("/report") || location.pathname.startsWith("/update");
  const isMessageActive = location.pathname.startsWith("/chats") || location.pathname.startsWith("/chat/");
  const isProfileActive = location.pathname.startsWith("/profile") || location.pathname.startsWith("/change-password");
  const isMyItemsActive = location.pathname.startsWith("/my-items");
  const isLeaderboardActive = location.pathname.startsWith("/leaderboard");
  const isNotificationsActive = location.pathname.startsWith("/notifications");
  const isAdminActive = location.pathname.startsWith("/admin");
  const canAccessAdmin = ["admin", "moderator"].includes(user?.role);

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
    {
      to: "/my-items",
      icon: Layers,
      label: "My Items",
      active: isMyItemsActive,
      onClick: undefined,
    },
    {
      to: "/notifications",
      icon: Bell,
      label: "Notifications",
      active: isNotificationsActive,
      onClick: undefined,
    },
    {
      to: "/leaderboard",
      icon: Trophy,
      label: "Leaderboard",
      active: isLeaderboardActive,
      onClick: undefined,
    },
  ];

  if (canAccessAdmin) {
    desktopLinks.push({
      to: "/admin",
      icon: ShieldCheck,
      label: "Admin",
      active: isAdminActive,
      onClick: undefined,
    });
  }

  const getDisplayName = () => {
    if (!user) return "Guest";
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    if (user.firstName) return user.firstName;
    return user.username || "Guest";
  };

  const handleMobileMenuClick = () => {
    if (sidebarMode === "hidden") {
      setSidebarMode("full");
      setOpenSidebar(true);
      return;
    }
    setOpenSidebar((prev) => !prev);
  };

  return (
    <>
      {!isDesktopHidden ? (
        <aside
          className={`fixed left-0 top-0 z-20 hidden h-screen overflow-hidden border-r border-indigo-100 bg-[linear-gradient(180deg,#f9fbff_0%,#f3f0ff_55%,#ffffff_100%)] transition-all lg:flex lg:flex-col ${
            isCompactDesktop ? "w-20" : "w-72"
          }`}
        >
          <div className="pointer-events-none absolute -right-10 -top-8 h-36 w-36 rounded-full bg-violet-200/35 blur-2xl" />
          <div className="pointer-events-none absolute -left-8 bottom-20 h-44 w-44 rounded-full bg-indigo-200/30 blur-3xl" />

          <div className={`relative flex h-full flex-col text-slate-800 ${isCompactDesktop ? "p-3" : "p-5"}`}>
            <div className={`flex items-center ${isCompactDesktop ? "justify-center" : "justify-between"}`}>
              <Link to="/" className="inline-flex items-center gap-2">
                {isCompactDesktop ? (
                  <Logo variant="icon" className="h-9 w-9" />
                ) : (
                  <Logo variant="full" className="h-8 w-auto" />
                )}
              </Link>
              {!isCompactDesktop ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSidebarMode("icons")}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                    aria-label="Collapse sidebar"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSidebarMode("hidden")}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                    aria-label="Hide sidebar"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
            </div>

            {!isCompactDesktop ? (
              <div className="mt-2 rounded-xl border border-indigo-100 bg-white/80 px-3 py-2 text-xs text-slate-600">
                Smart lost & found workspace
              </div>
            ) : null}

            <nav className={`space-y-2 ${isCompactDesktop ? "mt-5" : "mt-8"}`}>
              {desktopLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  title={link.label}
                  onClick={link.onClick}
                  className={`group relative flex items-center rounded-xl text-sm font-semibold transition ${
                    link.active ? "bg-white text-slate-900 shadow-lg shadow-violet-900/10" : "text-slate-600 hover:bg-indigo-50"
                  } ${isCompactDesktop ? "justify-center px-2 py-3" : "justify-between px-3 py-3"}`}
                >
                  <span className={`flex items-center ${isCompactDesktop ? "" : "gap-2.5"}`}>
                    <link.icon className={`h-4 w-4 ${link.active ? "text-indigo-700" : "text-slate-400"}`} />
                    {!isCompactDesktop ? link.label : null}
                  </span>
                  {!isCompactDesktop ? (
                    <span className="flex items-center gap-2">
                      {link.badge ? (
                        <span className="rounded-full bg-indigo-700 px-2 py-0.5 text-[10px] font-bold text-white">{link.badge}</span>
                      ) : null}
                      <ChevronRight className={`h-4 w-4 transition ${link.active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                    </span>
                  ) : link.badge ? (
                    <span className="absolute right-1 top-1 rounded-full bg-indigo-700 px-1.5 py-0.5 text-[9px] font-bold text-white">
                      {link.badge > 9 ? "9+" : link.badge}
                    </span>
                  ) : null}
                </Link>
              ))}
            </nav>

            <div className={`mt-auto rounded-2xl border border-slate-200 bg-white/85 ${isCompactDesktop ? "p-2" : "p-3"}`}>
              <Link to="/profile" className={`flex items-center ${isCompactDesktop ? "justify-center" : "gap-3"}`}>
                <Avatar className="h-10 w-10">
                  {user?.profilePic ? <AvatarImage src={user.profilePic} alt={getDisplayName()} /> : null}
                  <AvatarFallback className="bg-linear-to-br from-slate-500 to-violet-600 text-sm font-bold uppercase text-white">
                    {getDisplayName().slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                {!isCompactDesktop ? (
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{getDisplayName()}</p>
                    <p className="truncate text-xs text-slate-500">@{user?.username || "guest"}</p>
                  </div>
                ) : null}
              </Link>
            </div>

            {isCompactDesktop ? (
              <div className="mt-3 flex items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() => setSidebarMode("full")}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                  aria-label="Expand sidebar"
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSidebarMode("hidden")}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                  aria-label="Hide sidebar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : null}
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setSidebarMode("full")}
          className="fixed left-3 top-3 z-20 hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:inline-flex"
          aria-label="Open sidebar"
          title="Open sidebar"
        >
          <ChevronsRight className="h-4.5 w-4.5" />
        </button>
      )}

      <nav className="fixed left-0 top-0 z-20 flex h-14 w-full items-center justify-between border-b border-slate-200/90 bg-white/90 px-3 backdrop-blur md:h-16 md:px-4 lg:hidden">
        <div className="relative">
          <button
            type="button"
            onClick={handleMobileMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-700 px-1 text-[10px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>

        <Link
          to="/notifications"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm"
          aria-label="Open notifications"
        >
          <Bell className="h-5 w-5" />
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
            sidebarMode={sidebarMode}
            setSidebarMode={setSidebarMode}
          />
        </>
      )}
    </>
  );
};
