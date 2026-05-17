import { Button } from "@/components/ui/button";
import { ItemInfo } from "./ItemInfo";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { DeleteItemButton, RequestButton } from "./AlertDialogBox";
import { createFlag } from "@/features/flags/services/flagApi";
import { toast } from "react-toastify";
import { useState } from "react";

export const DetailedItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { status, reportedBy, _id, name, image } = item;
  const placeholderImage = "/item-placeholder.svg";
  const isOwner = user?._id === reportedBy?._id;
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const handleReportItem = async () => {
    if (!reportReason.trim()) {
      toast.error("Please add a reason before submitting.");
      return;
    }

    try {
      setIsSubmittingReport(true);
      await createFlag({
        targetType: "item",
        targetId: _id,
        reason: reportReason.trim(),
      });
      toast.success("Report submitted. Admin will review it.");
      setIsReportModalOpen(false);
      setReportReason("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit report");
    } finally {
      setIsSubmittingReport(false);
    }
  };

  return (
    <div className="w-full px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
      {/* Mobile & Tablet Layout (stacked) */}
      <div className="lg:hidden flex flex-col gap-4 sm:gap-5 md:gap-6">
        {/* Image */}
        <div className="w-full flex justify-center px-0">
          <img
            src={image || placeholderImage}
            alt={name}
            className="w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] object-cover aspect-video lg:aspect-square border border-slate-200/50"
          />
        </div>

        {/* Item Info */}
        <div className="w-full max-w-2xl mx-auto rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-white to-violet-50/65 p-4 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] backdrop-blur-sm sm:rounded-3xl sm:p-5 md:p-6">
          <ItemInfo item={item} layoutMode="default" />
        </div>

        {/* Action Buttons */}
        <div className="w-full flex justify-center px-3">
          {isOwner ? (
            <div className="flex gap-2 sm:gap-3 w-auto items-center">
              <DeleteItemButton
                itemId={_id}
                itemName={name}
                className="bg-red-500 hover:bg-red-600 rounded-lg sm:rounded-xl font-medium text-sm px-4 sm:px-6 py-2 sm:py-2.5 h-10 sm:h-11 flex items-center justify-center transition-all shadow-sm hover:shadow-md"
              />
              <Button
                className="rounded-lg sm:rounded-xl font-medium text-sm px-4 sm:px-6 py-2 sm:py-2.5 h-10 sm:h-11 active:scale-95 transition-all bg-indigo-700 hover:bg-indigo-700 shadow-sm hover:shadow-md"
                onClick={() => navigate(`/update/${_id}`)}
              >
                Update
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <RequestButton
                itemId={_id}
                itemName={name}
                status={status}
                className="rounded-lg sm:rounded-xl font-medium text-sm px-6 sm:px-8 py-2 sm:py-2.5 h-10 sm:h-11 flex items-center justify-center active:scale-95 transition-all bg-indigo-700 hover:bg-indigo-700 shadow-sm hover:shadow-md"
              />
              <Button
                type="button"
                onClick={() => setIsReportModalOpen(true)}
                className="rounded-lg border border-indigo-200 bg-white text-indigo-900 shadow-sm transition-all h-10 px-5 py-2 text-sm font-medium active:scale-95 hover:bg-violet-50 hover:shadow-md sm:h-11 sm:rounded-xl sm:px-6 sm:py-2.5"
              >
                Report Item
              </Button>
            </div>
          )}
        </div>

        {/* Disclaimer Text */}
        <p className="font-sans text-xs sm:text-sm text-gray-600 text-center px-4">Request must be verified before chat access</p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6 xl:gap-8 items-start max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="flex flex-col gap-4 lg:col-span-5 xl:col-span-4 xl:gap-5">
          {/* Image */}
          <div className="w-full">
            <img
              src={image || placeholderImage}
              alt={name}
              className="w-full rounded-2xl shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] object-cover aspect-[4/3] xl:aspect-square border border-slate-200/50"
            />
          </div>

          {/* Owner/Finder Info */}
          <div className="rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-white to-violet-50/65 p-4 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] backdrop-blur-sm xl:p-5">
            <ItemInfo item={item} layoutMode="compact" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 w-full">
            {isOwner ? (
              <>
                <DeleteItemButton
                  itemId={_id}
                  itemName={name}
                  className="w-full bg-red-500 hover:bg-red-600 rounded-xl font-medium text-sm xl:text-base active:scale-95 transition-all px-5 py-2.5 h-10 xl:h-11 flex items-center justify-center shadow-sm hover:shadow-md"
                />
                <Button
                  className="w-full rounded-xl font-medium text-sm xl:text-base active:scale-95 transition-all px-5 py-2.5 h-10 xl:h-11 flex items-center justify-center bg-indigo-700 hover:bg-indigo-700 shadow-sm hover:shadow-md"
                  onClick={() => navigate(`/update/${_id}`)}
                >
                  Update
                </Button>
              </>
            ) : (
              <>
                <RequestButton
                  itemId={_id}
                  itemName={name}
                  status={status}
                  className="w-full rounded-xl font-medium text-sm xl:text-base active:scale-95 transition-all px-5 py-2.5 h-10 xl:h-11 flex items-center justify-center bg-indigo-700 hover:bg-indigo-700 shadow-sm hover:shadow-md"
                />
                <Button
                  type="button"
                  onClick={() => setIsReportModalOpen(true)}
                  className="flex h-10 w-full items-center justify-center rounded-xl border border-indigo-200 bg-white px-5 py-2.5 text-sm font-medium text-indigo-900 shadow-sm transition-all active:scale-95 hover:bg-violet-50 hover:shadow-md xl:h-11 xl:text-base"
                >
                  Report Item
                </Button>
              </>
            )}
          </div>

          <p className="text-center font-sans text-xs text-indigo-800/80">
            Request must be verified before chat access
          </p>
        </div>

        {/* Right Column */}
        <div className="rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-white to-violet-50/65 p-5 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] backdrop-blur-sm lg:col-span-7 xl:col-span-8 xl:p-6">
          <ItemInfo item={item} layoutMode="detailed" />
        </div>
      </div>

      {isReportModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4">
          <div className="w-full max-w-md rounded-2xl border border-indigo-200 bg-gradient-to-br from-white to-violet-50/70 p-5 shadow-2xl">
            <h3 className="font-display text-xl font-bold text-indigo-950">
              Report This Item
            </h3>
            <p className="mt-1 text-sm text-indigo-800/80">
              Tell us what seems wrong. Admins will review this report.
            </p>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              rows={4}
              placeholder="Example: This item appears fraudulent or contains misleading details."
              className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-violet-100"
            />
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (isSubmittingReport) return;
                  setIsReportModalOpen(false);
                  setReportReason("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleReportItem}
                disabled={isSubmittingReport}
                className="bg-indigo-700 text-white hover:bg-indigo-700"
              >
                {isSubmittingReport ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
