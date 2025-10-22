import { X } from "lucide-react";
import { NavLink } from "./ui/Links";
import { Logo } from "./logo";
export const SideBar = ({ setOpenSidebar }) => {
  return (
    <>
      <div className="h-full fixed w-60 bg-white">
        <div className="h-14 w-full border-b-2 border-gray-100 mb-2.5">
          <Logo className={"h-[50px]"} />
        </div>
        <div className="flex pl-2 pr-2 justify-between">
          <div className="font-normal  text-[13px] text-gray-700 flex-col flex gap-3">
            <NavLink Icon={"LayoutDashboard"} text={`Dashboard`} />
            <NavLink Icon={"SearchIcon"} text={"Browse"} />
            <NavLink Icon={"MessageSquare"} text={"Messages"} />
            <NavLink Icon={"Bell"} text={"Notifications"} />
          </div>

          <X
            onClick={() => {
              setOpenSidebar(false);
            }}
            className="text-gray-900 text-sm"
          />
        </div>
      </div>
    </>
  );
};
