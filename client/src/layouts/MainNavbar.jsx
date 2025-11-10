/* eslint-disable no-unused-vars */
import { Menu } from "@/components/ui/menu";
import { UserAvatar } from "@/components/userAvatar";
import { useToggleNavbar } from "@/hooks/useToggleNavbar";
import { SideBar } from "@/components/SideBar";
import { AddButton } from "@/features/items";
import { Overlay } from "./Overlay";
export const MainNavbar = () => {
  const { handleSidebar, openSidebar, setOpenSidebar } = useToggleNavbar();
  return (
    <>
      <nav className="fixed bg-white h-14 w-full border-b-2 border-gray-200 flex pl-2 pr-2 items-center justify-between z-50">
        <Menu onclickEvent={handleSidebar} />
        <UserAvatar />
      </nav>
      {openSidebar && (
        <>
          <Overlay />
          <SideBar setOpenSidebar={setOpenSidebar} />
        </>
      )}
    </>
  );
};
