import { Link } from "react-router-dom";
import { UserAvatar } from "@/components/userAvatar";
import { BadgeCheck, ExternalLink } from "lucide-react";

export const ReporterInfo = ({ reportedBy, status }) => {
  const { firstName, lastName, username } = reportedBy;
  const fullName = `${firstName} ${lastName}`;
  const isOwner = status === "lost";
  const title = isOwner ? "Owner" : "Finder";

  const nameContent = (
    <div className="flex items-center gap-1">
      <h3 className="font-semibold text-sm sm:text-base text-gray-900">{fullName}</h3>
      {username && (
        <ExternalLink className="h-3 w-3 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-4">
      <h2 className="font-display font-bold text-gray-800 text-xs sm:text-sm md:text-sm uppercase tracking-[0.08em] sm:tracking-[0.1em]">
        {title} Information
      </h2>

      <div className="flex gap-2.5 sm:gap-3 items-start">
        <div className="flex-shrink-0 mt-0.5 sm:mt-1">
          <UserAvatar />
        </div>

        <div className="flex-grow flex flex-col gap-0.5 sm:gap-1">
          {username ? (
            <Link
              to={`/u/${username}`}
              className="group inline-flex flex-col gap-0.5 hover:underline decoration-indigo-300 underline-offset-2"
            >
              {nameContent}
            </Link>
          ) : (
            nameContent
          )}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <BadgeCheck size={16} className="fill-indigo-500 text-white flex-shrink-0" />
            <p className="text-gray-600 text-[10px] sm:text-xs md:text-xs font-medium">Verified {title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
