/* eslint-disable no-unused-vars */
import { Menu } from "@/components/ui/menu";
import { UserAvatar } from "@/components/userAvatar";
import { useToggleNavbar } from "@/hooks/useToggleNavbar";
import { SideBar } from "@/components/SideBar";
export const MainNavbar = () => {
  const { handleSidebar } = useToggleNavbar();
  return (
    <nav className="h-15 w-full bg-gray-300 flex pl-2 pr-2 items-center justify-between">
      <Menu onclickEvent={handleSidebar} />
      <UserAvatar />
    </nav>
  );
};
