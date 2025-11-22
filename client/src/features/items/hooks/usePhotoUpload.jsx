import { useState } from "react";
export const usePhotoUpload = (setItemData) => {
  const [preview, setPreview] = useState(null);
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setItemData((prevs) => ({ ...prevs, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  return { preview, setPreview, handlePhotoChange };
};
