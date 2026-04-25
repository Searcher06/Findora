/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const NavContext = createContext();

const NavProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [sidebarMode, setSidebarMode] = useState("full");

  function handleSidebar() {
    setOpenSidebar((prevs) => !prevs);
  }

  function cycleSidebarMode() {
    setSidebarMode((prev) => {
      if (prev === "full") return "icons";
      if (prev === "icons") return "hidden";
      return "full";
    });
  }

  return (
    <NavContext.Provider
      value={{
        openSidebar,
        setOpenSidebar,
        handleSidebar,
        sidebarMode,
        setSidebarMode,
        cycleSidebarMode,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
const useNavContext = () => useContext(NavContext);
export { NavProvider, useNavContext };
