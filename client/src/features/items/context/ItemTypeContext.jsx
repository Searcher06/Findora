import { createContext, useContext, useState } from "react";

const ItemTypeContext = createContext();

export const ItemTypeProvider = ({ children }) => {
  const [bar, setBar] = useState("lost");
  const [postType, setPostType] = useState(null);
  return (
    <ItemTypeContext.Provider value={{ bar, setBar, postType, setPostType }}>
      {children}
    </ItemTypeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useItemType = () => useContext(ItemTypeContext);
