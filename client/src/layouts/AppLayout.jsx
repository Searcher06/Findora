import { Outlet } from "react-router-dom";
import { MainNavbar } from "./MainNavbar";
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
