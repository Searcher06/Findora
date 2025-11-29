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
import { getFinderOrclaimer } from "@/utils/roleIdentifier";
import { useAuthStore } from "@/context/AuthContext";
export const AcceptButton = ({ className, request, onClick }) => {
  const { user } = useAuthStore();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" className={className} size="sm">
          Accept Claim
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you convinced with the answers
            provided, before making this decision. This will open a chat window
            between you and{" "}
            {getFinderOrclaimer(user, request) == "claimer"
              ? `${request.finderId.firstName} ${request.finderId.lastName}`
              : `${request.claimerId.firstName} ${request.claimerId.lastName}`}{" "}
            , to co ordinate item return.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Accept Claim</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
