import AddInfo from "../components/AddInfo";
import { useItemType } from "../context/ItemTypeContext";

const ReportPage = () => {
  const { postType } = useItemType();
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
      <AddInfo className={"mt-6"} postType={postType} />
    </div>
  );
};
export default ReportPage;
