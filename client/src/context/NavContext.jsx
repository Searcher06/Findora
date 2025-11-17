/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const NavContext = createContext();

const NavProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  // This is for the menu button it does not have is
  function handleSidebar() {
    setOpenSidebar((prevs) => !prevs);
  }
  return (
    <NavContext.Provider value={{ openSidebar, setOpenSidebar, handleSidebar }}>
      {children}
    </NavContext.Provider>
  );
};
const useNavContext = () => useContext(NavContext);
export { NavProvider, useNavContext };
