import { ImageIcon, ArrowUp, X, Loader2, Handshake, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
      if (selectedImage) formData.append("image", selectedImage);

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
      setImagePreview(URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  const handleRemoveImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
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

  const isFinder = request?.finderId?._id === user?._id;
  const isClaimer = request?.claimerId?._id === user?._id;
  const isAccepted = request?.status === "accepted";
  const isResolved = request?.status === "returned" || request?.status === "closed";
  const showActionButton =
    !requestLoading && !requestError && !!request && !isResolved &&
    (isFinder || (isAccepted && isClaimer));

  // Clear action label
  const actionLabel =
    isAccepted && (isFinder || isClaimer)
      ? "Verify Handover"
      : "Accept Claim";

  const ActionIcon = isAccepted ? CheckCircle2 : Handshake;

  return (
    <div className="bg-white">
      {/* Resolved banner — shown when item is returned or request closed */}
      {isResolved && (
        <div className={`flex items-center justify-center gap-2 border-b px-3 py-2.5 text-xs font-semibold ${
          request?.status === "returned"
            ? "border-emerald-100 bg-emerald-50 text-emerald-700"
            : "border-slate-100 bg-slate-50 text-slate-500"
        }`}>
          <CheckCircle2 className="h-3.5 w-3.5" />
          {request?.status === "returned" ? "Item successfully returned" : "This request has been closed"}
        </div>
      )}

      {/* Action button — Accept Claim / Verify Handover */}
      {showActionButton && (
        <div className="border-b border-slate-100 px-3 py-2">
          <button
            type="button"
            onClick={
              !isAccepted && isFinder
                ? handleAccept
                : () => navigate(`/handover/${requestId}`)
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98]"
          >
            <ActionIcon className="h-4 w-4" />
            {actionLabel}
          </button>
        </div>
      )}

      {/* Image preview */}
      {imagePreview && (
        <div className="flex items-center gap-2 px-3 pt-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
            />
            <button
              onClick={handleRemoveImage}
              type="button"
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-white"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <p className="text-xs text-slate-500">Image ready to send</p>
        </div>
      )}

      {/* Input row */}
      <div className="flex items-center gap-2 px-3 py-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          aria-label="Attach image"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
            selectedImage
              ? "border-indigo-300 bg-indigo-50 text-indigo-600"
              : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100"
          }`}
        >
          <ImageIcon className="h-4 w-4" />
        </button>

        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={selectedImage ? "Add a caption..." : "Message..."}
          disabled={uploading}
          className="h-10 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:opacity-50"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={(!messageText.trim() && !selectedImage) || uploading}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm transition disabled:opacity-40 active:scale-95"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
          )}
        </button>
      </div>
    </div>
  );
};
