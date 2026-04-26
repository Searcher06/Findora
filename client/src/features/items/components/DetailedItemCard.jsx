import { Button } from "@/components/ui/button";
import { imagesample } from "..";
import { ItemInfo } from "./ItemInfo";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { DeleteItemButton, RequestButton } from "./AlertDialogBox";
import { createFlag } from "@/features/flags/services/flagApi";
import { toast } from "react-toastify";

export const DetailedItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { status, reportedBy, _id, name, image } = item;
  const isOwner = user?._id === reportedBy?._id;

  const handleReportItem = async () => {
    const reason = window.prompt("Why are you reporting this item?");
    if (!reason || !reason.trim()) return;

    try {
      await createFlag({
        targetType: "item",
        targetId: _id,
        reason: reason.trim(),
      });
      toast.success("Report submitted. Admin will review it.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit report");
    }
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
      {/* Mobile & Tablet Layout (stacked) */}
      <div className="lg:hidden flex flex-col gap-4 sm:gap-5 md:gap-6">
        {/* Image */}
        <div className="w-full flex justify-center px-0">
          <img
            src={image || imagesample}
            alt={name}
            className="w-[95%] sm:w-[90%] md:w-[75%] lg:w-[75%] rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] object-cover aspect-video sm:aspect-video md:aspect-video lg:aspect-square border border-slate-200/50"
          />
        </div>

        {/* Item Info */}
        <div className="w-[95%] sm:w-[90%] md:w-[75%] mx-auto rounded-2xl sm:rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)]">
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
                className="rounded-lg sm:rounded-xl font-medium text-sm px-4 sm:px-6 py-2 sm:py-2.5 h-10 sm:h-11 active:scale-95 transition-all bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md"
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
                className="rounded-lg sm:rounded-xl font-medium text-sm px-6 sm:px-8 py-2 sm:py-2.5 h-10 sm:h-11 flex items-center justify-center active:scale-95 transition-all bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md"
              />
              <Button
                type="button"
                onClick={handleReportItem}
                className="rounded-lg sm:rounded-xl font-medium text-sm px-5 sm:px-6 py-2 sm:py-2.5 h-10 sm:h-11 flex items-center justify-center active:scale-95 transition-all bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm hover:shadow-md"
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
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 xl:gap-5">
          {/* Image */}
          <div className="w-full">
            <img
              src={image || imagesample}
              alt={name}
              className="w-full rounded-2xl shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] object-cover aspect-[4/3] xl:aspect-square border border-slate-200/50"
            />
          </div>

          {/* Owner/Finder Info */}
          <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm p-4 xl:p-5 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)]">
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
                  className="w-full rounded-xl font-medium text-sm xl:text-base active:scale-95 transition-all px-5 py-2.5 h-10 xl:h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md"
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
                  className="w-full rounded-xl font-medium text-sm xl:text-base active:scale-95 transition-all px-5 py-2.5 h-10 xl:h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md"
                />
                <Button
                  type="button"
                  onClick={handleReportItem}
                  className="w-full rounded-xl font-medium text-sm xl:text-base active:scale-95 transition-all px-5 py-2.5 h-10 xl:h-11 flex items-center justify-center bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm hover:shadow-md"
                >
                  Report Item
                </Button>
              </>
            )}
          </div>

          <p className="font-sans text-xs text-gray-600 text-center">
            Request must be verified before chat access
          </p>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 xl:col-span-8 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm p-5 xl:p-6 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)]">
          <ItemInfo item={item} layoutMode="detailed" />
        </div>
      </div>
    </div>
  );
};
