import { useNavigate } from "react-router-dom";
import { useItems } from "./useItems";
import { toast } from "react-toastify";
export const useHandleSubmit = (itemData) => {
  const navigate = useNavigate();
  const { createAnItem } = useItems();
  const handleSubmit = async () => {
    const formData = new FormData();

    if (itemData.itemName) formData.append("itemName", itemData.itemName);
    if (itemData.itemDescription)
      formData.append("itemDescription", itemData.itemDescription);
    if (itemData.category) formData.append("category", itemData.category);
    if (itemData.image) formData.append("image", itemData.image);
    if (itemData.location) formData.append("location", itemData.location);
    if (itemData.dateLostOrFound)
      formData.append("dateLostOrFound", itemData.dateLostOrFound);
    if (itemData.status) formData.append("status", itemData.status);
    console.log(itemData);

    try {
      const response = await createAnItem(formData);
      console.log(response);
      navigate("/");
      toast.success("Report created successfully");
    } catch (error) {
      if (error.response) {
        // server responded with a non-2xx status
        toast.error(error.response.data.message || "Item Report failed");
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        // something else happended
        toast.error("An error occured.");
      }
      console.error(error);
    }
  };

  return handleSubmit;
};
