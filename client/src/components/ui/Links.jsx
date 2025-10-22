import * as Link from "lucide-react";
export const NavLink = ({ Icon, text }) => {
  const LucideIcon = Link[Icon];
  return (
    <p className="flex items-center gap-1">
      <LucideIcon />
      {`${text}`}
    </p>
  );
};
