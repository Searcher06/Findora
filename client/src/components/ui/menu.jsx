import { MenuIcon } from "lucide-react";
export const Menu = ({ styles, onclickEvent }) => {
  return <MenuIcon className={styles} onClick={onclickEvent} />;
};
