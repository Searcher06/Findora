import { Button } from "@/components/ui/button";
import { imagesample } from "..";
import { ItemInfo } from "./ItemInfo";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { DeleteItemButton, RequestButton } from "./AlertDialogBox";

export const DetailedItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { status, reportedBy, _id, name } = item;

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
      {/* Mobile & Tablet Layout (stacked) */}
      <div className="lg:hidden flex flex-col gap-4 sm:gap-5 md:gap-6">
        {/* Image */}
        <div className="w-full flex justify-center px-0">
          <img
            src={imagesample}
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
          {user?._id === reportedBy?._id ? (
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
            <RequestButton
              itemId={_id}
              itemName={name}
              status={status}
              className="rounded-lg sm:rounded-xl font-medium text-sm px-6 sm:px-8 py-2 sm:py-2.5 h-10 sm:h-11 flex items-center justify-center active:scale-95 transition-all bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md"
            />
          )}
        </div>

        {/* Disclaimer Text */}
        <p className="font-sans text-xs sm:text-sm text-gray-600 text-center px-4">Request must be verified before chat access</p>
      </div>

      {/* Desktop Layout (30/70 split) */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (30%) - Image + Owner/Finder Info + Buttons */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Image */}
          <div className="w-full">
            <img
              src={imagesample}
              alt={name}
              className="w-full rounded-3xl shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] object-cover aspect-square border border-slate-200/50"
            />
          </div>

          {/* Owner/Finder Info */}
          <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm p-5 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)]">
            <ItemInfo item={item} layoutMode="compact" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            {user?._id === reportedBy?._id ? (
              <>
                <DeleteItemButton
                  itemId={_id}
                  itemName={name}
                  className="w-full bg-red-500 hover:bg-red-600 rounded-xl font-medium text-base active:scale-95 transition-all px-6 py-3 h-11 flex items-center justify-center shadow-sm hover:shadow-md"
                />
                <Button
                  className="w-full rounded-xl font-medium text-base active:scale-95 transition-all px-6 py-3 h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md"
                  onClick={() => navigate(`/update/${_id}`)}
                >
                  Update
                </Button>
              </>
            ) : (
              <RequestButton
                itemId={_id}
                itemName={name}
                status={status}
                className="w-full rounded-xl font-medium text-base active:scale-95 transition-all px-6 py-3 h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md"
              />
            )}
          </div>

          <p className="font-sans text-xs text-gray-600 text-center">Request must be verified before chat access</p>
        </div>

        {/* Right Column (70%) - Item Details */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm p-8 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)]">
          <ItemInfo item={item} layoutMode="detailed" />
        </div>
      </div>
    </div>
  );
};
