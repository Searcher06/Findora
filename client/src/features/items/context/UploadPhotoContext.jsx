/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
const UploadPhotoContext = createContext();

export const UploadPhotoProvider = ({ children }) => {
  const [on, setOn] = useState(false);

  return (
    <UploadPhotoContext.Provider
      value={{
        on,
        setOn,
      }}
    >
      {children}
    </UploadPhotoContext.Provider>
  );
};

export const useUploadPhoto = () => useContext(UploadPhotoContext);
