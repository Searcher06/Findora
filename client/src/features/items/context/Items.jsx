import { createContext } from "react";

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  return <ItemsContext.Provider value={{}}>{children}</ItemsContext.Provider>;
};
