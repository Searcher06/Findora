import { X } from "lucide-react";
import { NavLink } from "./ui/Links";
import { Logo } from "./logo";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";

export const SideBar = ({ setOpenSidebar }) => {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);

  const pathParts = location.pathname.split("/");
  const currentChatId = location.pathname.startsWith("/chat/")
    ? pathParts[2]
    : null;

  const unreadCount = useChatStore((state) =>
    state.getUnreadCount(currentChatId),
  );

  useEffect(() => {
    if (previousPathRef.current !== location.pathname) {
      setOpenSidebar(false);
      previousPathRef.current = location.pathname;
    }
  }, [location.pathname, setOpenSidebar]);

  return (
    <div className="h-full fixed w-[85%] bg-white transition duration-300 ease-in-out z-10 border-r border-gray-100 shadow-xl md:hidden">
      {/* Mobile Sidebar Header */}
      <div className="h-14 w-full border-b-2 border-gray-200 mb-2.5 flex justify-between items-center pr-2">
        <Logo className="h-14 w-auto -ml-5" />
        <X
          onClick={() => setOpenSidebar(false)}
          className="text-gray-900 cursor-pointer hover:bg-gray-100 rounded p-1"
        />
      </div>

      {/* Mobile Sidebar Links */}
      <div className="pl-2 pr-2">
        <div className="font-normal text-[13px] text-gray-700 flex-col flex gap-7">
          <Link to="/" onClick={() => setOpenSidebar(false)}>
            <NavLink Icon="SearchIcon" text="Browse" />
          </Link>

          <Link
            to="/chats"
            onClick={() => setOpenSidebar(false)}
            className="relative flex items-center justify-between group"
          >
            <NavLink Icon="MessageSquare" text="Messages" />
            {unreadCount > 0 && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mr-2">
                {unreadCount}
              </span>
            )}
          </Link>

          <Link to="/profile" onClick={() => setOpenSidebar(false)}>
            <NavLink Icon="User" text="Profile" />
          </Link>
        </div>
      </div>
    </div>
  );
};
