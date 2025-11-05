import { useState } from "react";
export const usePhotoUpload = () => {
  const [preview, setPreview] = useState(null);
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  return { preview, setPreview, handlePhotoChange };
};
