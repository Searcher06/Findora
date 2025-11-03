import { Outlet } from "react-router-dom";
import { MainNavbar } from "./MainNavbar";
import AddButton from "@/features/items/components/AddButton";
export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
