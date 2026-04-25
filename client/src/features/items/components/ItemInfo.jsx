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
      <div className="flex flex-col w-full gap-3 sm:gap-4 md:gap-5">
        {/* Item Name & Status */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">
          <h1 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-gray-900">
            {name}
          </h1>
          <div className="sm:ml-auto">
            <ItemStatus status={status} />
          </div>
        </div>

        {/* Item Details */}
        <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-3.5">
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
        <div className="pt-3 sm:pt-4 md:pt-5 border-t border-slate-200">
          <ReporterInfo reportedBy={reportedBy} status={status} />
        </div>
      </div>
    );
  }

  // Detailed layout for desktop right column
  if (layoutMode === "detailed") {
    return (
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Item Name - Large & Bold */}
        <div>
          <div className="flex items-baseline justify-between gap-3 sm:gap-4 mb-2">
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-tight">
              {name}
            </h1>
            <ItemStatus status={status} />
          </div>
        </div>

        {/* Item Details Grid */}
        <div className="space-y-4 sm:space-y-5">
          <div className="border-l-4 border-blue-500 pl-4 sm:pl-5">
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
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-50 to-sky-50/50 p-5 sm:p-6 md:p-8 border border-sky-100 shadow-sm">
          <h3 className="font-display font-bold text-gray-900 text-sm sm:text-base uppercase tracking-[0.1em] mb-3 sm:mb-4">
            Description
          </h3>
          <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  }
};
