import { useNavigate } from "react-router-dom";
import { useItems } from "../hooks/useItems";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";
export const useHandleSubmit = (itemData) => {
  const navigate = useNavigate();
  const { createAnItem } = useItems();
  const handleSubmit = async () => {
    const formData = new FormData();

    if (itemData.itemName) formData.append("itemName", itemData.itemName);
    if (itemData.itemDescription)
      formData.append("itemDescription", itemData.itemDescription);
    if (itemData.category) formData.append("category", itemData.category);
    if (itemData.image instanceof File) formData.append("image", itemData.image);
    if (itemData.location) formData.append("location", itemData.location);
    if (itemData.dateLostOrFound)
      formData.append("dateLostOrFound", itemData.dateLostOrFound);
    if (itemData.status) formData.append("status", itemData.status);

    try {
      const response = await createAnItem(formData);
      console.log(response);
      navigate("/");
      toast.success("Report created successfully");
    } catch (error) {
      handleApiError(error, "Failed to create report. Please try again.");
      console.error(error);
    }
  };

  return handleSubmit;
};
