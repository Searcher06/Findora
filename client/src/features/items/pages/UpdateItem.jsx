import { useSingleItem } from "../hooks/useSingleItemFetch";
import { DetailedItemCardSkeleton } from "../components/DetailedItemCardSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AddInfo from "../components/AddInfo";
import { toast } from "react-toastify";
import { useItems } from "../hooks/useItems";
export const UpdateItem = () => {
  const { loading, updateAnItem } = useItems();
  const navigate = useNavigate();
  const { id } = useParams();
  const { item, loading: itemLoading, error } = useSingleItem(id);
  const [preview, setPreview] = useState(null);
  const [itemData, setItemData] = useState({
    itemName: "",
    itemDescription: "",
    category: "",
    location: "",
    image: "",
    status: "",
    dateLostOrFound: "",
  });
  useEffect(() => {
    if (item) {
      setItemData({
        itemName: item.name || "",
        itemDescription: item.description || "",
        category: item.category || "",
        location: item.location || "",
        image: item.image || "",
        status: item.status || "",
        dateLostOrFound: item.dateLostOrFound.split("T")[0] || "",
      });
    }
  }, [item]);
  if (itemLoading) {
    return <DetailedItemCardSkeleton />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!item) {
    return <div>Item not found</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (itemData.itemName) formData.append("itemName", itemData.itemName);
    // prettier-ignore
    if (itemData.itemDescription) formData.append("itemDescription", itemData.itemDescription);
    if (itemData.category) formData.append("category", itemData.category);
    if (itemData.image) formData.append("image", itemData.image);
    if (itemData.location) formData.append("location", itemData.location);
    // prettier-ignore
    if (itemData.dateLostOrFound)formData.append("dateLostOrFound", itemData.dateLostOrFound);
    if (itemData.status) formData.append("status", itemData.status);
    console.log(itemData);
    console.log(formData);
    try {
      const response = await updateAnItem(item._id, formData);
      console.log(response);
      toast.success("Item updated successfully");
      navigate("/");
    } catch (error) {
      if (error.response) {
        // server responded with a non-2xx status
        toast.error(error.response.data.message || "Failed to update item");
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        // something else happended
        toast.error("An error occured.");
      }
      console.error(error);
    }
  };
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setItemData((prevs) => ({ ...prevs, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="mt-14 flex flex-col pl-4 pr-4">
      <h1 className="text-[26px] font-medium pl-0 leading-7 font-display mt-4">
        Update {itemData?.status} Item
      </h1>
      <p className="text-xs font-sans mt-1 text-gray-700">
        {itemData.status == "lost"
          ? "Enhance item details to improve search accuracy and recovery potential."
          : "Refine item information to facilitate owner identification and swift return."}
      </p>
      <AddInfo
        className={"mt-6"}
        itemData={itemData}
        handleInputChange={handleInputChange}
        setItemData={setItemData}
        handleSubmit={handleSubmit}
        loading={loading}
        handlePhotoChange={handlePhotoChange}
        preview={preview}
      />
    </div>
  );
};
