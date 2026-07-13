import { Button } from "@/components/ui/button";
// prettier-ignore
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger} from "@/components/ui/alert-dialog";
import { useItems } from "../hooks/useItems";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useVerify } from "@/features/verification";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
export const DeleteItemButton = ({ itemId, itemName, className }) => {
  const { deleteAnItem } = useItems(null, { autoFetch: false });
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteAnItem(itemId);
      navigate("/");
      toast.success("Item deleted successfully");
    } catch (error) {
      if (error.response) {
        toast.error(error?.response?.data?.message || "Failed to delete item");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className={className}
          size="sm"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "{itemName}"?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove this item and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? "Deleting..." : "Delete Item"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export const RequestButton = ({ itemId, itemName, className, status }) => {
  const { sendClaimRequest, loading, setLoading, sendFoundRequest } =
    useVerify();
  const { user } = useAuthStore();
  const determineUserTochat = (user, request) => {
    if (user._id == request?.finderId?._id) {
      return `${request?.claimerId?.username}`;
    } else if (user._id == request?.claimerId?._id) {
      return `${request?.finderId?.username}`;
    }
  };
  const navigate = useNavigate();
  const handleRequest = async () => {
    try {
      setLoading(true);
      if (status === "lost") {
        const response = await sendFoundRequest(itemId);
        toast.success("Found request sent successfully");
        navigate(
          `/chat/${response?._id}/${determineUserTochat(user, response)}`
        );
      } else if (status === "found") {
        const response = await sendClaimRequest(itemId);
        toast.success("Claim request sent successfully");
        navigate(
          `/chat/${response._id}/${determineUserTochat(user, response)}`
        );
      }
    } catch (error) {
      if (error.response) {
        toast.error(error?.response?.data?.message || "Failed to send request");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className={className}
          size="sm"
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : status == "lost"
            ? "I Found This Item"
            : "Claim This Item"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {status === "found" ? "Claim This Item?" : "I Found This Item?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {status === "found" ? (
              <>
                This will send a claim request to the finder of{" "}
                <span className="font-semibold">"{itemName}"</span> and open a
                chat between you and them. The finder will ask you questions to
                verify you are the real owner before accepting your claim.
              </>
            ) : (
              <>
                This will notify the owner of{" "}
                <span className="font-semibold">"{itemName}"</span> that you
                found their item and open a chat to coordinate the return. Ask
                the owner questions to confirm ownership before pressing "Accept
                Claim".
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRequest} disabled={loading}>
            {loading
              ? "Sending..."
              : status === "lost"
              ? "I Found This Item"
              : "Claim Item"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
