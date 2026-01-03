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
import { useAuthStore } from "@/store/useAuthStore";
export const DecisionButton = ({ className, request, onClick, type }) => {
  const getbuttonConfig = (type) => {
    switch (type) {
      case "accept":
        return `FINAL DECISION NOTICE
This action initiates an irreversible acceptance process. Please ensure you have thoroughly reviewed all submitted documentation, evidence, and responses.

Accepting this claim will establish a dedicated communication channel between you and ${
          getFinderOrclaimer(user, request) === "claimer"
            ? `${request?.finderId?.firstName} ${request?.finderId?.lastName}`
            : `${request?.claimerId?.firstName} ${request?.claimerId?.lastName}`
        } to facilitate secure coordination of the item return.`;
      case "reject":
        return `This action permanently declines the claim and cannot be undone. Please ensure you have carefully reviewed all submitted evidence and responses before proceeding.

The claim will be officially rejected, and ${
          getFinderOrclaimer(user, request) === "claimer"
            ? `${request?.finderId?.firstName} ${request?.finderId?.lastName}`
            : `${request?.claimerId?.firstName} ${request?.claimerId?.lastName}`
        } will be notified of your decision.`;
    }
  };
  const { user } = useAuthStore();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" className={className} size="sm">
          {type == "accept" ? "Accept Claim" : "Reject Claim"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {getbuttonConfig(type)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>
            {type == "accept" ? "Accept Claim" : "Reject Claim"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
