/* eslint-disable no-unused-vars */
import { Menu } from "@/components/ui/menu";
import { UserAvatar } from "@/components/userAvatar";
import { useToggleNavbar } from "@/hooks/useToggleNavbar";
import { SideBar } from "@/components/SideBar";
import { Blur } from "./blur";
export const MainNavbar = () => {
  const { handleSidebar, openSidebar, setOpenSidebar } = useToggleNavbar();
  return (
    <>
      <nav className="h-14 w-full border-b-2 border-gray-100 flex pl-2 pr-2 items-center justify-between">
        <Menu onclickEvent={handleSidebar} />
        <UserAvatar />
      </nav>
      {openSidebar && (
        <>
          <Blur />
          <SideBar setOpenSidebar={setOpenSidebar} />
        </>
      )}
    </>
  );
};
