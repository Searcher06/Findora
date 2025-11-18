import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import * as Icon from "lucide-react";

const NotificationItemTest = ({ notification, currentUserId }) => {
  // Determine if current user is finder or claimer
  const isFinder = currentUserId === notification.finderId._id;
  const isClaimer = currentUserId === notification.claimerId._id;

  // Notification configuration
  const getNotificationConfig = () => {
    if (isFinder) {
      switch (notification.status) {
        case "pending": {
          if (notification.questions.length === 0) {
            return {
              icon: "HelpCircle",
              title: "Verification Required",
              description: `You are required to generate verification questions for ${notification.itemId.name} by ${notification.claimerId.name}`,
              buttonText: "Generate Questions",
              color: "blue",
            };
          }

          const hasUnansweredQuestions = notification.questions.some(
            (q) => !q.answer || q.answer.trim() === ""
          );
          if (hasUnansweredQuestions) {
            return {
              icon: "Clock",
              title: "Awaiting Answers",
              description: `Waiting for ${notification.claimerId.name} to answer verification questions for ${notification.itemId.name}`,
              buttonText: null,
              color: "orange",
            };
          }

          const allQuestionsAnswered = notification.questions.every(
            (q) => q.answer && q.answer.trim() !== ""
          );
          if (allQuestionsAnswered) {
            return {
              icon: "Scale",
              title: "Decision Required",
              description: `You are required to make decision on "${notification.itemId.name}" by ${notification.claimerId.name}`,
              buttonText: "Review Claim",
              color: "orange",
            };
          }

          return {
            icon: "HelpCircle",
            title: "Verification Required",
            description: `You are required to generate verification questions for ${notification.itemId.name}`,
            buttonText: "Generate Questions",
            color: "blue",
          };
        }

        case "rejected":
          return {
            icon: "XCircle",
            title: "Claim Rejected",
            description: `You rejected the claim by ${notification.claimerId.name} for ${notification.itemId.name}`,
            buttonText: null,
            color: "red",
          };
        case "accepted":
          return {
            icon: "MessageCircle",
            title: "Claim Accepted",
            description: `You accepted the claim by ${notification.claimerId.name} for ${notification.itemId.name}. You can now chat to coordinate the return.`,
            buttonText: "Open Chat",
            color: "green",
          };
        case "returned":
          return {
            icon: "CheckCircle2",
            title: "Item Returned",
            description: `The item ${notification.itemId.name} has been marked as returned`,
            buttonText: null,
            color: "green",
          };
        default:
          return {
            icon: "HelpCircle",
            title: "Verification Required",
            description: `You are required to generate verification questions for ${notification.itemId.name}`,
            buttonText: "Generate Questions",
            color: "blue",
          };
      }
    } else if (isClaimer) {
      switch (notification.status) {
        case "pending": {
          if (notification.questions.length === 0) {
            return {
              icon: "Clock",
              title: "Awaiting Questions",
              description: `Your claim request for ${notification.itemId.name} is awaiting verification questions from ${notification.finderId.name}`,
              buttonText: null,
              color: "orange",
            };
          }

          const hasUnansweredQuestions = notification.questions.some(
            (q) => !q.answer || q.answer.trim() === ""
          );
          if (hasUnansweredQuestions) {
            return {
              icon: "HelpCircle",
              title: "Questions Received",
              description: `${notification.finderId.name} has sent verification questions for ${notification.itemId.name}`,
              buttonText: "Answer Questions",
              color: "blue",
            };
          }

          const allQuestionsAnswered = notification.questions.every(
            (q) => q.answer && q.answer.trim() !== ""
          );
          if (allQuestionsAnswered) {
            return {
              icon: "UserCheck",
              title: "Under Review",
              description: `Your answers are being reviewed by ${notification.finderId.name} for ${notification.itemId.name}`,
              buttonText: null,
              color: "orange",
            };
          }

          return {
            icon: "Clock",
            title: "Awaiting Questions",
            description: `Your claim request for ${notification.itemId.name} is being processed`,
            buttonText: null,
            color: "orange",
          };
        }

        case "rejected":
          return {
            icon: "Ban",
            title: "Claim Rejected",
            description: `Your claim request for ${notification.itemId.name} was rejected by ${notification.finderId.name}`,
            buttonText: null,
            color: "red",
          };
        case "accepted":
          return {
            icon: "CheckCircle2",
            title: "Claim Accepted",
            description: `Your claim request for ${notification.itemId.name} was accepted by ${notification.finderId.name}. You can now chat to coordinate the return.`,
            buttonText: "Open Chat",
            color: "green",
          };
        case "returned":
          return {
            icon: "CheckCircle2",
            title: "Item Returned",
            description: `The item ${notification.itemId.name} has been marked as returned`,
            buttonText: null,
            color: "green",
          };
        default:
          return {
            icon: "SendHorizonal",
            title: "Request Sent",
            description: `Your claim request has been sent to ${notification.finderId.name}`,
            buttonText: null,
            color: "blue",
          };
      }
    }

    return {
      icon: "HelpCircle",
      title: "Notification",
      description: "You have a new notification",
      buttonText: null,
      color: "blue",
    };
  };

  const config = getNotificationConfig();
  const LucideIcon = Icon[config.icon];

  // Fix: Proper color mapping for icons and buttons
  const getIconColor = () => {
    const colors = {
      blue: "text-blue-500",
      orange: "text-orange-500",
      red: "text-red-500",
      green: "text-green-500",
    };
    return colors[config.color] || "text-blue-500";
  };

  const getButtonClass = () => {
    const colors = {
      blue: "bg-blue-500 hover:bg-blue-600",
      orange: "bg-orange-500 hover:bg-orange-600",
      red: "bg-red-500 hover:bg-red-600",
      green: "bg-green-500 hover:bg-green-600",
    };
    return colors[config.color] || "bg-blue-500 hover:bg-blue-600";
  };

  // Calculate time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const handleButtonClick = () => {
    console.log("Button clicked for:", config.title);
  };

  return (
    <div className="flex gap-2 items-center border-2 p-2 rounded-sm">
      {/* FIXED: Use stroke instead of fill for Lucide icons */}
      <LucideIcon className={`w-10 h-10 ${getIconColor()}`} />
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
            {/* FIXED: Use proper button color classes */}
            <Button
              className={`text-xs h-8 mt-1 w-full text-white ${getButtonClass()}`}
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

export default NotificationItemTest;
