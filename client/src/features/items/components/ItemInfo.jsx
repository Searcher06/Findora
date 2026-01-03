import { formatDate } from "@/utils/formatDate";
import { ItemStatus } from "./ItemStatus";
import { ReporterInfo } from "./ReporterInfo";
import { SpecificInfo } from "./SpecificInfo";

export const ItemInfo = ({ item }) => {
  const {
    name,
    status,
    location,
    description,
    category,
    dateLostOrFound,
    dateReported,
    reportedBy,
  } = item;
  const dateLostOrFoundFormatted = formatDate(dateLostOrFound);
  const dateReportedFormatted = formatDate(dateReported);
  return (
    <div className="flex flex-col w-[90%]">
      <div className="flex justify-between mt-3">
        <h1 className="font-display font-bold text-[18px]">{name}</h1>
        <ItemStatus status={status} />
      </div>

      <div className="flex flex-col gap-1.5 mt-2.5">
        <SpecificInfo infotype={"Category"} value={category} />
        <SpecificInfo infotype={"Location"} value={location} />
        <SpecificInfo
          infotype={status == "lost" ? "Date lost" : "Date found"}
          value={dateLostOrFoundFormatted}
        />
        <SpecificInfo infotype={"Date posted"} value={dateReportedFormatted} />
        <SpecificInfo infotype={"Description"} value={description} />
      </div>

      <ReporterInfo reportedBy={reportedBy} status={status} />
    </div>
  );
};
