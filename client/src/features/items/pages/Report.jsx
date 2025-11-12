/* eslint-disable no-unused-vars */
import AddInfo from "../components/AddInfo";
import { useItemType } from "../context/ItemTypeContext";
import { useState, useEffect } from "react";

const ReportPage = () => {
  const { postType } = useItemType();
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    image: "",
    status: postType || "lost",
    dateLostOrFound: "",
  });
  // keep status in sync when postType changes
  useEffect(() => {
    setItemData((d) => ({ ...d, status: postType || d.status }));
  }, [postType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="mt-14 flex flex-col pl-4 pr-4">
      <h1 className="text-[26px] font-medium pl-0 leading-7 font-display mt-4">
        Report {postType == "lost" ? " Lost" : " Found"} Item
      </h1>
      <p className="text-xs font-sans mt-1 text-gray-700">
        Provide details to help others identify and{" "}
        {postType == "lost"
          ? "return your item safely"
          : "get their items safely"}
      </p>
      <AddInfo
        className={"mt-6"}
        postType={postType}
        itemData={itemData}
        handleInputChange={handleInputChange}
        setItemData={setItemData}
      />
    </div>
  );
};
export default ReportPage;
