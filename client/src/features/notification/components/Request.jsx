import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import * as Icon from "lucide-react";

const NotificationItem = ({ notification, currentUserId }) => {
  // Determine if current user is the finder or claimer
  const isFinder = currentUserId === notification.finderId;
  const isClaimer = currentUserId === notification.claimerId;

  // Notification type configuration
  const notificationConfig = {
    // Finder-side notifications
    "verification-required": {
      icon: "HelpCircle",
      title: "Verification Required",
      description: `You are required to generate verification questions for ${
        notification.itemId?.name || "item"
      } by ${notification.claimerId?.name || "claimer"}`,
      buttonText: "Generate Questions",
      buttonAction: "generate-questions",
      color: "blue",
    },
    "decision-required": {
      icon: "Scale",
      title: "Claim Decision",
      description: `You are required to make decision on "${
        notification.itemId?.name || "item"
      }" by ${notification.claimerId?.name || "claimer"}`,
      buttonText: "Review Claim",
      buttonAction: "make-decision",
      color: "orange",
    },
    "claim-rejected": {
      icon: "XCircle",
      title: "Claim Rejected",
      description: `You rejected the claim by ${
        notification.claimerId?.name || "claimer"
      } for ${notification.itemId?.name || "item"}`,
      buttonText: "Open Chat",
      buttonAction: "open-chat",
      color: "red",
    },
    "chat-available": {
      icon: "MessageCircle",
      title: "Chat Available",
      description: `You can now chat with ${
        notification.claimerId?.name || "claimer"
      } about "${notification.itemId?.name || "item"}"`,
      buttonText: "Open Chat",
      buttonAction: "open-chat",
      color: "green",
    },
    "item-returned": {
      icon: "CheckCircle2",
      title: "Item Returned",
      description: `The item ${
        notification.itemId?.name || "item"
      } has been marked as returned`,
      buttonText: null, // No button for completed actions
      buttonAction: null,
      color: "green",
    },

    // Claimer-side notifications
    "request-sent": {
      icon: "SendHorizonal",
      title: "Request Sent",
      description: `Your claim request has been sent to ${
        notification.finderId?.name || "finder"
      } waiting for verification questions`,
      buttonText: null,
      buttonAction: null,
      color: "blue",
    },
    "awaiting-questions": {
      icon: "Clock",
      title: "Awaiting Questions",
      description: `Your claim request for ${
        notification.itemId?.name || "item"
      } is awaiting verification questions from ${
        notification.finderId?.name || "finder"
      }`,
      buttonText: null,
      buttonAction: null,
      color: "orange",
    },
    "questions-received": {
      icon: "HelpCircle",
      title: "Questions Received",
      description: `${
        notification.finderId?.name || "Finder"
      } has sent verification questions for ${
        notification.itemId?.name || "item"
      }`,
      buttonText: "Answer Questions",
      buttonAction: "answer-questions",
      color: "blue",
    },
    "under-review": {
      icon: "UserCheck",
      title: "Under Review",
      description: `Your claim request for ${
        notification.itemId?.name || "item"
      } is awaiting review by ${notification.finderId?.name || "finder"}`,
      buttonText: null,
      buttonAction: null,
      color: "orange",
    },
    "claim-accepted": {
      icon: "CheckCircle2",
      title: "Claim Accepted",
      description: `Your claim request for ${
        notification.itemId?.name || "item"
      } was accepted by ${notification.finderId?.name || "finder"}`,
      buttonText: "Open Chat",
      buttonAction: "open-chat",
      color: "green",
    },
    "claim-rejected-claimer": {
      icon: "Ban",
      title: "Claim Rejected",
      description: `Your claim request for ${
        notification.itemId?.name || "item"
      } was rejected by ${notification.finderId?.name || "finder"}`,
      buttonText: "Open Chat",
      buttonAction: "open-chat",
      color: "red",
    },
  };

  // Determine which notification type to show based on request status and user role
  const getNotificationType = () => {
    if (isFinder) {
      switch (notification.status) {
        case "pending":
          return notification.questions.length === 0
            ? "verification-required"
            : "decision-required";
        case "rejected":
          return "claim-rejected";
        case "accepted":
          return notification.finderVerified && notification.claimerVerified
            ? "item-returned"
            : "chat-available";
        case "returned":
          return "item-returned";
        default:
          return "verification-required";
      }
    } else if (isClaimer) {
      switch (notification.status) {
        case "pending":
          return notification.questions.length === 0
            ? "awaiting-questions"
            : "questions-received";
        case "rejected":
          return "claim-rejected-claimer";
        case "accepted":
          return notification.finderVerified && notification.claimerVerified
            ? "item-returned"
            : "claim-accepted";
        case "returned":
          return "item-returned";
        default:
          return "request-sent";
      }
    }
    return "request-sent";
  };

  const notificationType = getNotificationType();
  const config = notificationConfig[notificationType];
  const LucideIcon = Icon[config.icon];

  const handleButtonClick = () => {
    // Handle different actions based on buttonAction
    switch (config.buttonAction) {
      case "generate-questions":
        // Navigate to questions generation page
        break;
      case "make-decision":
        // Navigate to decision page
        break;
      case "answer-questions":
        // Navigate to questions answering page
        break;
      case "open-chat":
        // Open chat with the other user
        break;
      default:
        break;
    }
  };

  const getTimeAgo = (createdAt) => {
    // Implement your time ago logic here
    return "2 mins ago";
  };

  return (
    <div className="flex gap-2 items-center border-2 p-2 rounded-sm">
      <LucideIcon className={`w-10 h-11 text-white fill-${config.color}-500`} />
      <div className="w-[85%]">
        <div className="flex items-center justify-between">
          <Header content={config.title} className={"text-sm font-bold"} />
          <Icon.ChevronRight size={20} className="text-gray-500" />
        </div>
        <p className="text-[13px] font-sans line-clamp-2">
          {config.description}
        </p>
        <p className="text-[12px] font-sans">
          {getTimeAgo(notification.createdAt)}
        </p>
        {config.buttonText && (
          <div>
            <Button
              className={`text-xs h-8 mt-1 w-full bg-${config.color}-500 hover:bg-${config.color}-600`}
              onClick={handleButtonClick}
            >
              {config.buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
