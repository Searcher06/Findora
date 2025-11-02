import { UserAvatar } from "@/components/userAvatar";
import { BadgeCheck } from "lucide-react";
UserAvatar;
export const ReporterInfo = () => {
  return (
    <div className="flex flex-col mt-3 gap-1">
      <h2 className="font-bold text-sm font-display">Finder Information</h2>
      <div className="flex gap-1 items-center">
        <UserAvatar />
        <div className="flex flex-col">
          <h2 className="font-semibold text-sm">Dennis Han</h2>
          <p className="text-gray-700 text-[12px] flex items-center gap-0.5">
            <span>
              <BadgeCheck size={15} className="fill-blue-600 text-white" />
            </span>
            Finder
          </p>
        </div>
      </div>
    </div>
  );
};
