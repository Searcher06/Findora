import { ExpandIcon } from "lucide-react";
export const SideBar = ({ setOpenSidebar }) => {
  return (
    <div className="h-full fixed w-60 bg-gray-300 flex pl-2 pr-2 justify-between pt-5">
      <div className="font-normal text-[14px]">
        <p>Dashboard</p>
        <p>Browse</p>
        <p>Messages</p>
        <p>Notification</p>
      </div>
      <ExpandIcon
        onClick={() => {
          setOpenSidebar(false);
        }}
      />
    </div>
  );
};
