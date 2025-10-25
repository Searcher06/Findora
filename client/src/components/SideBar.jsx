import { X } from "lucide-react";
import { NavLink } from "./ui/Links";
import { Logo } from "./logo";
export const SideBar = ({ setOpenSidebar }) => {
  return (
    <div className="h-full fixed w-60 bg-white transition duration-300 ease-in-out ">
      <div className="h-14 w-full border-b-2 border-gray-200 mb-2.5 flex justify-between items-center pr-2">
        <Logo className={``} />
        <X
          onClick={() => {
            setOpenSidebar(false);
          }}
          className="text-gray-900 text-sm"
        />
      </div>
      <div className="pl-2 pr-2">
        <div className="font-normal  text-[13px] text-gray-700 flex-col flex gap-7">
          <NavLink Icon={"LayoutDashboard"} text={`Dashboard`} />
          <NavLink Icon={"SearchIcon"} text={"Browse"} />
          <NavLink Icon={"MessageSquare"} text={"Messages"} />
          <NavLink Icon={"Bell"} text={"Notifications"} />
        </div>
      </div>
    </div>
  );
};
