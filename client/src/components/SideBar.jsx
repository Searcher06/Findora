import { X } from "lucide-react";
import { Logo } from "./logo";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { LayoutGrid, MessageSquare, PlusIcon, User, ChevronRight } from "lucide-react";

export const SideBar = ({ setOpenSidebar, unreadCount = 0, setPostType, locationPath }) => {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);

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
  ];

  return (
    <div className="fixed left-0 top-0 z-30 h-full w-[84%] max-w-[340px] border-r border-slate-200 bg-white/95 shadow-2xl backdrop-blur md:hidden">
      <div className="h-16 border-b border-slate-200 px-4">
        <div className="flex h-full items-center justify-between">
          <Logo className="h-12 w-auto text-slate-900" />
          <button
            onClick={() => setOpenSidebar(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50"
            aria-label="Close menu"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Navigation</p>
        <div className="space-y-2">
          {links.map(({ to, icon: Icon, label, active, badge, onClick }) => (
            <Link
              key={to}
              to={to}
              onClick={() => {
                onClick?.();
                setOpenSidebar(false);
              }}
              className={`group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon className="h-4 w-4" />
                {label}
              </span>
              <span className="flex items-center gap-2">
                {badge ? (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${active ? "bg-white text-blue-700" : "bg-blue-600 text-white"}`}>
                    {badge}
                  </span>
                ) : null}
                <ChevronRight className="h-4 w-4 opacity-60" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
