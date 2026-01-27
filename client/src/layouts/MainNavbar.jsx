import { Menu } from "@/components/ui/menu";
import { UserAvatar } from "@/components/userAvatar";
import { SideBar } from "@/components/SideBar";
import { useNavContext } from "@/context/NavContext";
import { Overlay } from "./Overlay";
import { useChatStore } from "@/store/useChatStore";
import { useLocation, Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Logo } from "../components/logo";
import { SearchIcon, MessageSquare, User } from "lucide-react";

export const MainNavbar = () => {
  const { handleSidebar, openSidebar, setOpenSidebar } = useNavContext();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const pathParts = location.pathname.split("/");
  const currentChatId = location.pathname.startsWith("/chat/")
    ? pathParts[2]
    : null;

  const unreadCount = useChatStore((state) =>
    state.getUnreadCount(currentChatId),
  );

  // Helper function to check if link is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className="fixed bg-white h-14 md:h-16 w-full border-b-2 border-gray-200 flex items-center justify-between z-10 px-4">
        {/* Left Section: Logo + Desktop Nav Links */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu Icon - Only show on mobile (up to md) */}
          <div className="md:hidden relative">
            <Menu onclickEvent={handleSidebar} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600 border-2 border-white"></span>
              </span>
            )}
          </div>

          {/* Logo - Hidden on mobile, visible on tablet and desktop */}
          <Logo className="hidden md:block h-12 w-auto" />

          {/* Desktop Navigation Links - Hidden on mobile, visible on tablet and desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <SearchIcon className="w-4 h-4" />
              <span className="text-sm">Browse</span>
            </Link>

            <Link
              to="/chats"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative ${
                isActive("/chats") || isActive("/chat/")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Messages</span>
              {unreadCount > 0 && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/profile")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Profile</span>
            </Link>
          </div>
        </div>

        {/* Right Section: User Avatar */}
        <UserAvatar profilePic={user?.profilePic} />
      </nav>

      {/* Mobile Sidebar - Only on mobile (md and below) */}
      {openSidebar && (
        <>
          <Overlay />
          <SideBar
            setOpenSidebar={setOpenSidebar}
            openSidebar={openSidebar}
            handleSidebar={handleSidebar}
          />
        </>
      )}
    </>
  );
};
