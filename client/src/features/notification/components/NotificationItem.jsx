/* eslint-disable no-unused-vars */
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ChevronDown, HelpCircle, Clock, Scale } from "lucide-react";
import * as Icon from "lucide-react";
const NotificationItem = ({ status }) => {
  const LucideIcon = Icon["HelpCircle"];

  return (
    <div className="flex gap-2 items-center border-2 p-2 rounded-sm">
      <LucideIcon className="w-10 h-11 text-white fill-blue-500" />
      <div className="w-[85%]">
        <div className="flex items-center justify-between">
          <Header
            content={"Verification Request"}
            className={"text-sm font-bold"}
          />
          <Icon.ChevronRight size={20} className="text-gray-500" />
        </div>
        <p className="text-[13px] font-sans line-clamp-2">
          You are required to generate to generate verification question for
          handbag by Ahmad Ibrahim
        </p>
        <p className="text-[12px] font-sans">2 mins ago</p>
        <div>
          <Button className={"text-xs h-8 mt-1 w-full bg-blue-500"}>
            Generate Questions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
