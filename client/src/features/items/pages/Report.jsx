import AddInfo from "../components/AddInfo";
import { useState } from "react";
import { useItems } from "../hooks/useItems";
import { toast } from "react-toastify";
import { useItemType } from "../context/ItemTypeContext";
const ReportPage = () => {
  const { item, loading, createAnItem } = useItems();
  const { postType } = useItemType();
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
    console.log(itemData);
    try {
      const response = await createAnItem(itemData);
      console.log(response);
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
  return (
    <div className="mt-14 flex flex-col pl-4 pr-4">
      <h1 className="text-[26px] font-medium pl-0 leading-7 font-display mt-4">
        Report {itemData.status == "lost" ? " Lost" : " Found"} Item
      </h1>
      <p className="text-xs font-sans mt-1 text-gray-700">
        Provide details to help others identify and{" "}
        {itemData.status == "lost"
          ? "return your item safely"
          : "get their items safely"}
      </p>
      <AddInfo
        className={"mt-6"}
        itemData={itemData}
        handleInputChange={handleInputChange}
        setItemData={setItemData}
        handleSubmit={handleSubmit}
        loading={loading}
        item={item}
        postType={postType}
      />
    </div>
  );
};
export default ReportPage;
