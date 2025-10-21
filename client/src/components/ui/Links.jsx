export const NavLink = ({ Icon, text }) => {
  return (
    <p className="flex items-center gap-1">
      {Icon}
      {`${text}`}
    </p>
  );
};
