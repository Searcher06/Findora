import { UserAvatar } from "@/components/userAvatar";
import { BadgeCheck } from "lucide-react";

export const ReporterInfo = ({ reportedBy, status }) => {
  const { firstName, lastName } = reportedBy;
  const fullName = `${firstName} ${lastName}`;
  const isOwner = status === "lost";
  const title = isOwner ? "Owner" : "Finder";

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-4">
      <h2 className="font-display font-bold text-gray-800 text-xs sm:text-sm md:text-base uppercase tracking-[0.08em] sm:tracking-[0.1em]">
        {title} Information
      </h2>

      <div className="flex gap-2.5 sm:gap-3 items-start">
        <div className="flex-shrink-0 mt-0.5 sm:mt-1">
          <UserAvatar />
        </div>

        <div className="flex-grow flex flex-col gap-0.5 sm:gap-1">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">{fullName}</h3>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <BadgeCheck
              size={16}
              className="fill-blue-500 text-white flex-shrink-0"
            />
            <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm font-medium">
              Verified {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
