/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useItems } from "../hooks/useItems";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useVerify } from "@/features/verification";
import { useAuthStore } from "@/store/useAuthStore";
export const DeleteItemButton = ({ itemId, itemName, className }) => {
  const {
    deleteAnItem,
    loading: isDeleting,
    setLoading: setIsDeleting,
  } = useItems();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteAnItem(itemId);
      navigate("/");
      toast.success("Item deleted successfully");
    } catch (error) {
      if (error.response) {
        // server responded with a non-2xx status
        toast.error(error?.response?.data?.message || "Failed to delete item");
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        // something else happended
        toast.error("An error occured.");
      }
      console.error(error);
      toast.error("");
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
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            <span className="font-semibold"> "{itemName}" </span> and remove it
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? "Removing..." : "Delete"}
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
    console.log(request);
    if (user._id == request.finderId._id) {
      return `${request.claimerId.username}`;
    } else if (user._id == request.claimerId._id) {
      return `${request.finderId.username}`;
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
          `/chat/${response.populatedRequest._id}/${determineUserTochat(
            user,
            response.populatedRequest
          )}`
        );
        console.log(response);
      } else if (status === "found") {
        const response = await sendClaimRequest(itemId);
        toast.success("Claim request sent successfully");
        navigate(
          `/chat/${response.populatedRequest._id}/${determineUserTochat(
            user,
            response.populatedRequest
          )}`
        );
        console.log(response);
      }
    } catch (error) {
      if (error.response) {
        // server responded with a non-2xx status
        toast.error(
          error?.response?.data?.message || "Failed to send  request"
        );
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        // something else happended
        toast.error("An error occured.");
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
            ? "In progress..."
            : status == "lost"
            ? "Mark as found"
            : "Claim This Item"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {status == "found" ? (
              <>
                This action cannot be undone. This will send a claim request to
                the finder of the item{" "}
                <span className="font-semibold">"{itemName}"</span>
                they will then set questions for you to answer in order to
                successfully verify you are the real owner of the item.
              </>
            ) : (
              <>
                This action cannot be undone. This will alert the owner of the
                item
                <span className="font-semibold"> "{itemName}" </span> they will
                then send a claim request to you in order to start the
                verification process.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRequest} disabled={loading}>
            {loading
              ? "In Progress..."
              : status == "lost"
              ? "Mark as found"
              : "Claim Item"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
