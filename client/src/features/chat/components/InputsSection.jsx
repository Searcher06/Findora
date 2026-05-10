import { Button } from "@/components/ui/button";
import { ImageIcon, ArrowUp, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const InputsSection = ({
  requestId,
  username,
  requestLoading,
  requestError,
  request,
  AcceptClaim,
}) => {
  const { user } = useAuthStore();
  const { sendMessage } = useChatStore();
  const [messageText, setMessageText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!messageText.trim() && !selectedImage) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("text", messageText || "");

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await sendMessage(requestId, username, formData);

      setMessageText("");
      setSelectedImage(null);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
    } catch (error) {
      console.log("Failed to send message:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }

    e.target.value = "";
  };

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleAccept = async () => {
    try {
      await AcceptClaim(requestId, username);
    } catch (error) {
      console.log(error);
    }
  };

  // Determine button visibility and label based on role and request status
  const isFinder = request?.finderId?._id === user?._id;
  const isClaimer = request?.claimerId?._id === user?._id;
  const isAccepted = request?.status === "accepted";
  const showActionButton =
    !requestLoading && !requestError && (isFinder || (isAccepted && isClaimer));
  const actionLabel =
    isAccepted && (isFinder || isClaimer) ? "Handle Item" : "Accept Claim";

  return (
    <div className="bg-white">
      {showActionButton && (
        <div className="flex justify-center border-b border-slate-100 px-2 py-2 sm:px-3">
          <Button
            className="w-full max-w-xs rounded-lg bg-linear-to-r from-indigo-600 to-indigo-700 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-md sm:max-w-sm sm:text-sm md:max-w-md lg:max-w-sm xl:max-w-md"
            onClick={
              !isAccepted && isFinder
                ? handleAccept
                : () => {
                    navigate(`/handover/${requestId}`);
                  }
            }
          >
            {actionLabel}
          </Button>
        </div>
      )}

      {imagePreview && (
        <div className="relative flex justify-center px-2 pt-2 sm:px-3">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-28 w-28 rounded-lg border border-slate-200 object-cover sm:h-32 sm:w-32"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white transition-colors hover:bg-red-600 sm:-right-2 sm:-top-2 sm:p-1"
              type="button"
            >
              <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </button>
          </div>
        </div>
      )}

      <div className="px-2 py-2 sm:px-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />

          <Button
            variant="ghost"
            size="sm"
            className={`size-8 shrink-0 rounded-full border border-slate-200 bg-white sm:size-9 ${
              selectedImage
                ? "text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
            onClick={handleImageUpload}
            title="Upload image"
            type="button"
            disabled={uploading}
          >
            <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>

          <div className="flex-1">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                selectedImage ? "Add a caption..." : "Type a message..."
              }
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-500 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-violet-100 disabled:opacity-50 sm:h-11 sm:text-sm"
              disabled={uploading}
            />
          </div>

          <Button
            onClick={handleSend}
            disabled={(!messageText.trim() && !selectedImage) || uploading}
            size="sm"
            className="size-8 shrink-0 rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:size-9"
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
