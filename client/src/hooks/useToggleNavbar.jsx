import { useState } from "react";
export const useToggleNavbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  function handleSidebar() {
    setOpenSidebar((prevs) => !prevs);
  }
  return { handleSidebar, openSidebar, setOpenSidebar };
};
