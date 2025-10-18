import { Menu } from "@/components/ui/menu";
import { userAvatar } from "@/components/ui/userAvatar";
export const MainNavbar = () => {
  return (
    <nav className="h-15 w-full bg-gray-200">
      <Menu />
      <userAvatar />
    </nav>
  );
};
