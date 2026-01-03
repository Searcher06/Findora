import { Button } from "@/components/ui/button";
import { ImageIcon, ArrowUp, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";

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

  const handleSend = async () => {
    if (!messageText.trim() && !selectedImage) return;

    setUploading(true);
    try {
      // Always create FormData
      const formData = new FormData();

      // Always append text (even if empty string)
      formData.append("text", messageText || "");

      // Append image if exists
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await sendMessage(requestId, username, formData);

      // Clear everything after successful send
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
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setSelectedImage(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }

    // Reset file input
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
    <div className="border-t border-gray-200 bg-white shadow-lg">
      {/* Action Button (shown to finder before acceptance, and to finder or claimer after acceptance) */}
      {showActionButton && (
        <div className="px-3 py-2 border-b border-gray-100">
          <Button
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-xs"
            onClick={handleAccept}
          >
            {actionLabel}
          </Button>
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div className="px-3 pt-2 relative">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border border-gray-200"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2">
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
            className={`shrink-0 rounded-full size-8 ${
              selectedImage
                ? "text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
            onClick={handleImageUpload}
            title="Upload image"
            type="button"
            disabled={uploading}
          >
            <ImageIcon className="h-4 w-4" />
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
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder:text-gray-500 text-xs transition-all disabled:opacity-50"
              disabled={uploading}
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={(!messageText.trim() && !selectedImage) || uploading}
            size="sm"
            className="shrink-0 size-8 rounded-full bg-linear-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
