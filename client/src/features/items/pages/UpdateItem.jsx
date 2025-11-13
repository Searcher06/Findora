import { useSingleItem } from "../hooks/useSingleItemFetch";
import { DetailedItemCardSkeleton } from "../components/DetailedItemCardSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AddInfo from "../components/AddInfo";
import { toast } from "react-toastify";
import { useItems } from "../hooks/useItems";
export const UpdateItem = () => {
  const { updateAnItem } = useItems();
  const navigate = useNavigate();
  const { id } = useParams();
  const { item, loading, error } = useSingleItem(id);
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
  if (loading) {
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
    console.log(itemData);
    try {
      const response = await updateAnItem(item._id, itemData);
      console.log(response);
      navigate("/");
      toast.success("Item updated successfully");
    } catch (error) {
      if (error.response) {
        // server responded with a non-2xx status
        toast.error(error.response.data.message || "Item update failed");
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        // something else happended
        toast.error("An error occured.");
      }
      console.error(error);
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
        item={item}
      />
    </div>
  );
};
