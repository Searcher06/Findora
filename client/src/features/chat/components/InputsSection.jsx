import { Button } from "@/components/ui/button";
import { ImageIcon, ArrowUp, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

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
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
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
    <div className="border-t border-gray-200 bg-white shadow-sm lg:shadow-lg">
      {/* Action Button - Responsive Width */}
      {showActionButton && (
        <div className="px-2 sm:px-3 py-1.5 sm:py-2 border-b border-gray-100 flex justify-center">
          <Button
            className="
              bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
              text-white font-medium 
              py-1.5 sm:py-2 
              rounded-lg shadow-md hover:shadow-lg 
              transition-all duration-200 
              text-xs sm:text-sm
              w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md
            "
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

      {/* Image Preview */}
      {imagePreview && (
        <div className="px-2 sm:px-3 pt-1.5 sm:pt-2 relative flex justify-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-200"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full p-0.5 sm:p-1 hover:bg-red-600 transition-colors"
              type="button"
            >
              <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="px-2 sm:px-3 py-1.5 sm:py-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />

          {/* Image Upload Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`shrink-0 rounded-full size-7 sm:size-8 ${
              selectedImage
                ? "text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
            onClick={handleImageUpload}
            title="Upload image"
            type="button"
            disabled={uploading}
          >
            <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>

          {/* Input Field */}
          <div className="flex-1">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                selectedImage ? "Add a caption..." : "Type a message..."
              }
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder:text-gray-500 text-xs sm:text-sm transition-all disabled:opacity-50"
              disabled={uploading}
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={(!messageText.trim() && !selectedImage) || uploading}
            size="sm"
            className="shrink-0 size-7 sm:size-8 rounded-full bg-linear-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
