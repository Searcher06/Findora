import AddInfo from "../components/AddInfo";
import { useState } from "react";
import { useItems } from "../hooks/useItems";
import { toast } from "react-toastify";
import { useItemType } from "../context/ItemTypeContext";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const navigate = useNavigate();
  const { loading, createAnItem } = useItems();
  const { postType } = useItemType();
  const [preview, setPreview] = useState(null);
  const [itemData, setItemData] = useState({
    itemName: "",
    itemDescription: "",
    category: "",
    location: "",
    image: "",
    status: postType,
    dateLostOrFound: "",
  });

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
      const response = await createAnItem(formData);
      console.log(response);
      navigate("/");
      toast.success("Report created successfully");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Item Report failed");
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

  console.log("Item Data", itemData);

  return (
    <div className="mt-14 md:mt-16 flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto pb-8">
      {/* Header - Responsive */}
      <h1 className="text-xl sm:text-2xl md:text-[26px] lg:text-3xl font-medium leading-tight font-display mt-3 sm:mt-4 md:mt-5">
        Report {itemData.status === "lost" ? "Lost" : "Found"} Item
      </h1>
      <p className="text-xs sm:text-sm md:text-base font-sans mt-1 sm:mt-2 text-gray-700 leading-relaxed">
        Provide details to help others identify and{" "}
        {itemData.status === "lost"
          ? "return your item safely"
          : "get their items safely"}
      </p>

      {/* Form - Responsive */}
      <AddInfo
        className="mt-4 sm:mt-5 md:mt-6"
        itemData={itemData}
        handleInputChange={handleInputChange}
        setItemData={setItemData}
        handleSubmit={handleSubmit}
        loading={loading}
        postType={postType}
        handlePhotoChange={handlePhotoChange}
        preview={preview}
      />
    </div>
  );
};

export default ReportPage;
