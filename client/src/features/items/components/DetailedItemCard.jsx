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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      {/* Mobile & Tablet Layout (stacked) */}
      <div className="lg:hidden flex flex-col gap-6">
        {/* Image */}
        <div className="w-full flex justify-center px-0">
          <img
            src={imagesample}
            alt={name}
            className="w-[95%] sm:w-[90%] md:w-[75%] lg:w-[75%] rounded-xl shadow-md object-cover aspect-video sm:aspect-video md:aspect-video lg:aspect-square"
          />
        </div>

        {/* Item Info */}
        <div className="w-[95%] sm:w-[90%] md:w-[75%] mx-auto">
          <ItemInfo item={item} layoutMode="default" />
        </div>

        {/* Action Buttons */}
        <div className="w-full flex justify-center">
          {user?._id === reportedBy?._id ? (
            <div className="flex gap-3 w-auto items-center">
              <DeleteItemButton
                itemId={_id}
                itemName={name}
                className="bg-red-500 rounded-lg font-medium px-6 py-2.5 h-10 flex items-center justify-center"
              />
              <Button
                className="rounded-lg font-medium active:scale-95 transition-transform px-6 py-2.5 h-10"
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
              className="rounded-lg font-medium active:scale-95 transition-transform px-8 py-2.5 h-10 flex items-center justify-center"
            />
          )}
        </div>

        {/* Disclaimer Text */}
        <p className="font-sans text-xs text-gray-600 text-center">
          Request must be verified before chat access
        </p>
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
              className="w-full rounded-xl shadow-lg object-cover aspect-square"
            />
          </div>

          {/* Owner/Finder Info */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <ItemInfo item={item} layoutMode="compact" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            {user?._id === reportedBy?._id ? (
              <>
                <DeleteItemButton
                  itemId={_id}
                  itemName={name}
                  className="w-full bg-red-500 rounded-lg font-medium active:scale-95 transition-transform px-6 py-2.5 h-10 flex items-center justify-center"
                />
                <Button
                  className="w-full rounded-lg font-medium active:scale-95 transition-transform px-6 py-2.5 h-10 flex items-center justify-center"
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
                className="w-full rounded-lg font-medium active:scale-95 transition-transform px-6 py-2.5 h-10 flex items-center justify-center"
              />
            )}
          </div>

          <p className="font-sans text-xs text-gray-600 text-center">
            Request must be verified before chat access
          </p>
        </div>

        {/* Right Column (70%) - Item Details */}
        <div className="lg:col-span-2">
          <ItemInfo item={item} layoutMode="detailed" />
        </div>
      </div>
    </div>
  );
};
