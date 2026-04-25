import { formatDate } from "@/utils/formatDate";
import { ItemStatus } from "./ItemStatus";
import { ReporterInfo } from "./ReporterInfo";
import { SpecificInfo } from "./SpecificInfo";

export const ItemInfo = ({ item, layoutMode = "default" }) => {
  const { name, status, location, description, category, dateLostOrFound, dateReported, reportedBy } = item;

  const dateLostOrFoundFormatted = formatDate(dateLostOrFound);
  const dateReportedFormatted = formatDate(dateReported);

  // Compact layout for desktop left column (only owner/finder info)
  if (layoutMode === "compact") {
    return <ReporterInfo reportedBy={reportedBy} status={status} />;
  }

  // Mobile/Tablet layout (all info stacked)
  if (layoutMode === "default") {
    return (
      <div className="flex flex-col w-full gap-3 sm:gap-4 md:gap-5">
        {/* Item Name & Status */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">
          <h1 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-gray-900">{name}</h1>
          <div className="sm:ml-auto">
            <ItemStatus status={status} />
          </div>
        </div>

        {/* Item Details */}
        <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-3.5">
          <SpecificInfo infotype="Category" value={category} />
          <SpecificInfo infotype="Location" value={location} />
          <SpecificInfo infotype={status === "lost" ? "Date Lost" : "Date Found"} value={dateLostOrFoundFormatted} />
          <SpecificInfo infotype="Date Posted" value={dateReportedFormatted} />
          <SpecificInfo infotype="Description" value={description} />
        </div>

        {/* Owner/Finder Info */}
        <div className="pt-3 sm:pt-4 md:pt-5 border-t border-slate-200">
          <ReporterInfo reportedBy={reportedBy} status={status} />
        </div>
      </div>
    );
  }

  // Detailed layout for desktop right column
  if (layoutMode === "detailed") {
    return (
      <div className="flex flex-col gap-5 xl:gap-6">
        {/* Item Name */}
        <div>
          <div className="flex items-start justify-between gap-3 sm:gap-4 mb-1.5">
            <h1 className="font-display font-bold text-2xl xl:text-3xl text-gray-900 leading-snug">{name}</h1>
            <ItemStatus status={status} />
          </div>
        </div>

        {/* Item Details Grid */}
        <div className="space-y-3.5 xl:space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 sm:pl-5">
            <SpecificInfo infotype="Category" value={category} size="lg" />
          </div>
          <div>
            <SpecificInfo infotype="Location" value={location} size="lg" />
          </div>
          <div>
            <SpecificInfo infotype={status === "lost" ? "Date Lost" : "Date Found"} value={dateLostOrFoundFormatted} size="lg" />
          </div>
          <div>
            <SpecificInfo infotype="Date Posted" value={dateReportedFormatted} size="lg" />
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50/50 p-4 xl:p-5 border border-sky-100 shadow-sm">
          <h3 className="font-display font-bold text-gray-900 text-xs xl:text-sm uppercase tracking-[0.1em] mb-2.5 xl:mb-3">Description</h3>
          <p className="text-gray-800 text-sm xl:text-base leading-relaxed">{description}</p>
        </div>
      </div>
    );
  }
};
