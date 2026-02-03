import { formatDate } from "@/utils/formatDate";
import { ItemStatus } from "./ItemStatus";
import { ReporterInfo } from "./ReporterInfo";
import { SpecificInfo } from "./SpecificInfo";

export const ItemInfo = ({ item, layoutMode = "default" }) => {
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

  // Compact layout for desktop left column (only owner/finder info)
  if (layoutMode === "compact") {
    return <ReporterInfo reportedBy={reportedBy} status={status} />;
  }

  // Mobile/Tablet layout (all info stacked)
  if (layoutMode === "default") {
    return (
      <div className="flex flex-col w-full gap-5">
        {/* Item Name & Status */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-900">
            {name}
          </h1>
          <div className="sm:ml-auto">
            <ItemStatus status={status} />
          </div>
        </div>

        {/* Item Details */}
        <div className="flex flex-col gap-3">
          <SpecificInfo infotype="Category" value={category} />
          <SpecificInfo infotype="Location" value={location} />
          <SpecificInfo
            infotype={status === "lost" ? "Date Lost" : "Date Found"}
            value={dateLostOrFoundFormatted}
          />
          <SpecificInfo infotype="Date Posted" value={dateReportedFormatted} />
          <SpecificInfo infotype="Description" value={description} />
        </div>

        {/* Owner/Finder Info */}
        <div className="pt-4 border-t border-gray-200">
          <ReporterInfo reportedBy={reportedBy} status={status} />
        </div>
      </div>
    );
  }

  // Detailed layout for desktop right column
  if (layoutMode === "detailed") {
    return (
      <div className="flex flex-col gap-8">
        {/* Item Name - Large & Bold */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <h1 className="font-display font-bold text-4xl text-gray-900 leading-tight">
              {name}
            </h1>
            <ItemStatus status={status} />
          </div>
        </div>

        {/* Item Details Grid */}
        <div className="space-y-5">
          <div className="border-l-4 border-blue-500 pl-5">
            <SpecificInfo infotype="Category" value={category} size="lg" />
          </div>
          <div>
            <SpecificInfo infotype="Location" value={location} size="lg" />
          </div>
          <div>
            <SpecificInfo
              infotype={status === "lost" ? "Date Lost" : "Date Found"}
              value={dateLostOrFoundFormatted}
              size="lg"
            />
          </div>
          <div>
            <SpecificInfo
              infotype="Date Posted"
              value={dateReportedFormatted}
              size="lg"
            />
          </div>
        </div>

        {/* Description */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="font-display font-semibold text-gray-700 text-sm uppercase tracking-wide mb-2">
            Description
          </h3>
          <p className="text-gray-800 text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  }
};
