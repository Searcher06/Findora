import { X, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Logo } from "./logo";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { LayoutGrid, MessageSquare, PlusIcon, User, ChevronRight, ShieldCheck, Trophy } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export const SideBar = ({
  setOpenSidebar,
  unreadCount = 0,
  setPostType,
  locationPath,
  sidebarMode = "full",
  setSidebarMode,
}) => {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);
  const isCompact = sidebarMode === "icons";
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (previousPathRef.current !== location.pathname) {
      setOpenSidebar(false);
      previousPathRef.current = location.pathname;
    }
  }, [location.pathname, setOpenSidebar]);

  const currentPath = locationPath || location.pathname;
  const links = [
    {
      to: "/",
      icon: LayoutGrid,
      label: "Browse Items",
      active: currentPath === "/" || currentPath.startsWith("/items"),
    },
    {
      to: "/report",
      icon: PlusIcon,
      label: "Report Item",
      active: currentPath.startsWith("/report") || currentPath.startsWith("/update"),
      onClick: () => setPostType?.("lost"),
    },
    {
      to: "/chats",
      icon: MessageSquare,
      label: "Messages",
      active: currentPath.startsWith("/chats") || currentPath.startsWith("/chat/"),
      badge: unreadCount > 0 ? unreadCount : null,
    },
    {
      to: "/profile",
      icon: User,
      label: "Profile",
      active: currentPath.startsWith("/profile") || currentPath.startsWith("/change-password"),
    },
    {
      to: "/leaderboard",
      icon: Trophy,
      label: "Leaderboard",
      active: currentPath.startsWith("/leaderboard"),
    },
  ];

  if (["admin", "moderator"].includes(user?.role)) {
    links.push({
      to: "/admin",
      icon: ShieldCheck,
      label: "Admin",
      active: currentPath.startsWith("/admin"),
    });
  }

  return (
    <div
      className={`fixed left-0 top-0 z-30 h-full border-r border-slate-200 bg-white/95 shadow-2xl backdrop-blur md:hidden ${
        isCompact ? "w-20 max-w-20" : "w-[84%] max-w-[340px]"
      }`}
    >
      <div className={`h-16 border-b border-slate-200 ${isCompact ? "px-2" : "px-4"}`}>
        <div className="flex h-full items-center justify-between">
          {!isCompact ? (
            <Logo className="h-12 w-auto text-slate-900" />
          ) : (
            <button
              type="button"
              onClick={() =>
                setSidebarMode?.((prev) => (prev === "icons" ? "full" : "icons"))
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50"
              aria-label="Expand sidebar"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setOpenSidebar(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50"
            aria-label="Close menu"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      <div className={`${isCompact ? "p-2" : "p-4"}`}>
        {!isCompact ? (
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Navigation</p>
            <button
              type="button"
              onClick={() => setSidebarMode?.("icons")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50"
              aria-label="Collapse sidebar to icons"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          </div>
        ) : null}
        <div className="space-y-2">
          {links.map(({ to, icon: Icon, label, active, badge, onClick }) => (
            <Link
              key={to}
              to={to}
              title={label}
              onClick={() => {
                onClick?.();
                setOpenSidebar(false);
              }}
              className={`group relative flex items-center rounded-xl text-sm font-semibold transition ${
                active
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-700 hover:bg-slate-100"
              } ${
                isCompact
                  ? "justify-center px-2 py-3"
                  : "justify-between px-3 py-3"
              }`}
            >
              <span className={`flex items-center ${isCompact ? "" : "gap-2.5"}`}>
                <Icon className="h-4 w-4" />
                {!isCompact ? label : null}
              </span>
              <span className={`flex items-center ${isCompact ? "absolute right-1 top-1" : "gap-2"}`}>
                {badge ? (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${active ? "bg-white text-blue-700" : "bg-blue-600 text-white"}`}>
                    {badge}
                  </span>
                ) : null}
                {!isCompact ? <ChevronRight className="h-4 w-4 opacity-60" /> : null}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
