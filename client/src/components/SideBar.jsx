import { X } from "lucide-react";
import { NavLink } from "./ui/Links";
import { Logo } from "./logo";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
export const SideBar = ({ setOpenSidebar }) => {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    if (previousPathRef.current !== location.pathname) {
      setOpenSidebar(false);
      previousPathRef.current = location.pathname;
    }
  }, [location.pathname, setOpenSidebar]);
  return (
    <div className="h-full fixed w-60 bg-white transition duration-300 ease-in-out z-10">
      <div className="h-14 w-full border-b-2 border-gray-200 mb-2.5 flex justify-between items-center pr-2">
        <Logo className={"h-12 w-auto -ml-4"} />
        <X
          onClick={() => {
            setOpenSidebar(false);
          }}
          className="text-gray-900 text-sm"
        />
      </div>
      <div className="pl-2 pr-2">
        <div className="font-normal  text-[13px] text-gray-700 flex-col flex gap-7">
          <Link to="/" onClick={() => setOpenSidebar(false)}>
            <NavLink Icon={"LayoutDashboard"} text={`Dashboard`} />
          </Link>
          <Link to="/" onClick={() => setOpenSidebar(false)}>
            <NavLink Icon={"SearchIcon"} text={"Browse"} />
          </Link>
          <Link to="/chats" onClick={() => setOpenSidebar(false)}>
            <NavLink Icon={"MessageSquare"} text={"Messages"} />
          </Link>
          <Link to={"/notification"} onClick={() => setOpenSidebar(false)}>
            <NavLink Icon={"Bell"} text={"Notifications"} />
          </Link>
        </div>
      </div>
    </div>
  );
};
