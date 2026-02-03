import { UserAvatar } from "@/components/userAvatar";
import { BadgeCheck } from "lucide-react";

export const ReporterInfo = ({ reportedBy, status }) => {
  const { firstName, lastName } = reportedBy;
  const fullName = `${firstName} ${lastName}`;
  const isOwner = status === "lost";
  const title = isOwner ? "Owner" : "Finder";

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display font-semibold text-gray-700 text-sm uppercase tracking-wide">
        {title} Information
      </h2>

      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 mt-1">
          <UserAvatar />
        </div>

        <div className="flex-grow flex flex-col gap-0.5">
          <h3 className="font-semibold text-base text-gray-900">{fullName}</h3>
          <div className="flex items-center gap-1">
            <BadgeCheck
              size={16}
              className="fill-blue-500 text-white flex-shrink-0"
            />
            <p className="text-gray-600 text-xs font-medium">
              Verified {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
