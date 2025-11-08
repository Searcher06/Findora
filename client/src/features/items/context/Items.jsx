import { createContext, useState } from "react";

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState({
    lost: [],
    found: [],
  });
  return <ItemsContext.Provider>{children}</ItemsContext.Provider>;
};
