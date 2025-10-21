import {
  X,
  LayoutDashboard,
  SearchIcon,
  MessageSquare,
  Bell,
} from "lucide-react";

export const SideBar = ({ setOpenSidebar }) => {
  return (
    <>
      <div></div>
      <div className="h-full fixed w-60 bg-white flex pl-2 pr-2 justify-between pt-5">
        <div className="font-normal text-[13px] text-gray-700 flex-col flex gap-3">
          <p className="flex items-center gap-1">
            <LayoutDashboard />
            Dashboard
          </p>
          <p className="flex items-center gap-1">
            <SearchIcon /> Browse
          </p>
          <p className="flex items-center gap-1">
            <MessageSquare /> Messages
          </p>
          <p className="flex items-center gap-1">
            <Bell />
            Notification
          </p>
        </div>

        <X
          onClick={() => {
            setOpenSidebar(false);
          }}
          className="text-gray-900 text-sm"
        />
      </div>
    </>
  );
};
