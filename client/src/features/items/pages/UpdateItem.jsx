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
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center px-4">
          <p className="text-red-600 text-sm sm:text-base">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center px-4">
          <p className="text-gray-600 text-sm sm:text-base">Item not found</p>
        </div>
      </div>
    );
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
    if (itemData.itemDescription)
      formData.append("itemDescription", itemData.itemDescription);
    if (itemData.category) formData.append("category", itemData.category);
    if (itemData.image) formData.append("image", itemData.image);
    if (itemData.location) formData.append("location", itemData.location);
    if (itemData.dateLostOrFound)
      formData.append("dateLostOrFound", itemData.dateLostOrFound);
    if (itemData.status) formData.append("status", itemData.status);

    try {
      const response = await updateAnItem(item._id, formData);
      console.log(response);
      toast.success("Item updated successfully");
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Failed to update item");
      } else if (error.request) {
        toast.error("No response from server");
      } else {
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/35 to-white px-3 sm:px-4 md:px-6 py-4 sm:py-6">
      {/* Decorative blur circles */}
      <div className="pointer-events-none absolute -left-20 top-20 h-60 w-60 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:px-12 max-w-4xl mx-auto pb-8">
        {/* Header - Responsive */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-display capitalize tracking-tight">
            Update {itemData?.status} Item
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-sans mt-2 sm:mt-3 text-gray-600 leading-relaxed">
            {itemData.status === "lost"
              ? "Enhance item details to improve search accuracy and recovery potential."
              : "Refine item information to facilitate owner identification and swift return."}
          </p>
        </div>

        {/* Form - Responsive (uses already responsive AddInfo) */}
        <AddInfo
          className="mt-3 sm:mt-4 md:mt-5"
          itemData={itemData}
          handleInputChange={handleInputChange}
          setItemData={setItemData}
          handleSubmit={handleSubmit}
          loading={loading}
          handlePhotoChange={handlePhotoChange}
          preview={preview}
        />
      </div>
    </div>
  );
};
