import { Menu } from "@/components/ui/menu";
import { UserAvatar } from "@/components/userAvatar";
import { SideBar } from "@/components/SideBar";
import { useNavContext } from "@/context/NavContext";
import { Overlay } from "./Overlay";
import { useChatStore } from "@/store/useChatStore";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore"; // Import the auth store

export const MainNavbar = () => {
  const { handleSidebar, openSidebar, setOpenSidebar } = useNavContext();
  const location = useLocation();
  const user = useAuthStore((state) => state.user); // Get the user from auth store

  // Extract requestId from path: /chat/:requestId/:username
  const pathParts = location.pathname.split("/");
  const currentChatId = location.pathname.startsWith("/chat/")
    ? pathParts[2]
    : null;

  // Pass currentChatId to ignore the active chat count
  const unreadCount = useChatStore((state) =>
    state.getUnreadCount(currentChatId),
  );

  return (
    <>
      <nav className="fixed bg-white h-14 w-full border-b-2 border-gray-200 flex pl-2 pr-2 items-center justify-between z-10">
        <div className="relative">
          <Menu onclickEvent={handleSidebar} />

          {/* Subtle Notification Dot on the Menu Icon */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600 border-2 border-white"></span>
            </span>
          )}
        </div>

        {/* Pass the user's profile picture */}
        <UserAvatar profilePic={user?.profilePic} />
      </nav>
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
