import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import * as Icon from "lucide-react";

const NotificationItemTest = ({ notification, currentUserId }) => {
  // Determine if current user is finder or claimer
  const isFinder = currentUserId === notification.finderId._id;
  const isClaimer = currentUserId === notification.claimerId._id;

  // Helper function to get full name
  const getFullName = (user) => {
    return `${user.firstName} ${user.lastName}`;
  };

  // Notification configuration
  const getNotificationConfig = () => {
    if (isFinder) {
      switch (notification.status) {
        case "pending": {
          if (notification.questions.length === 0) {
            return {
              icon: "HelpCircle",
              title: "Verification Required",
              description: `Generate verification questions for ${
                notification.itemId.name
              } from ${getFullName(notification.claimerId)}`,
              buttonText: "Generate Questions",
              status: "Action Required",
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
              description: `Waiting for ${getFullName(
                notification.claimerId
              )} to answer questions for ${notification.itemId.name}`,
              buttonText: null,
              status: "Pending",
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
              description: `Make a decision on "${
                notification.itemId.name
              }" claim by ${getFullName(notification.claimerId)}`,
              buttonText: "Review Claim",
              status: "Action Required",
              color: "orange",
            };
          }

          return {
            icon: "HelpCircle",
            title: "Verification Required",
            description: `Generate verification questions for ${notification.itemId.name}`,
            buttonText: "Generate Questions",
            status: "Action Required",
            color: "blue",
          };
        }

        case "rejected":
          return {
            icon: "XCircle",
            title: "Claim Rejected",
            description: `You rejected ${getFullName(
              notification.claimerId
            )}'s claim for ${notification.itemId.name}`,
            buttonText: null,
            status: "Completed",
            color: "red",
          };
        case "accepted":
          return {
            icon: "MessageCircle",
            title: "Claim Accepted",
            description: `You accepted ${getFullName(
              notification.claimerId
            )}'s claim. Chat to coordinate return.`,
            buttonText: "Open Chat",
            status: "Completed",
            color: "green",
          };
        case "returned":
          return {
            icon: "CheckCircle2",
            title: "Item Returned",
            description: `${notification.itemId.name} has been successfully returned`,
            buttonText: null,
            status: "Completed",
            color: "green",
          };
        default:
          return {
            icon: "HelpCircle",
            title: "Verification Required",
            description: `Generate verification questions for ${notification.itemId.name}`,
            buttonText: "Generate Questions",
            status: "Action Required",
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
              description: `Your claim for ${
                notification.itemId.name
              } is awaiting questions from ${getFullName(
                notification.finderId
              )}`,
              buttonText: null,
              status: "Pending",
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
              description: `${getFullName(
                notification.finderId
              )} sent verification questions for ${notification.itemId.name}`,
              buttonText: "Answer Questions",
              status: "Action Required",
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
              description: `Your answers are being reviewed by ${getFullName(
                notification.finderId
              )}`,
              buttonText: null,
              status: "Pending",
              color: "orange",
            };
          }

          return {
            icon: "Clock",
            title: "Awaiting Questions",
            description: `Your claim for ${notification.itemId.name} is being processed`,
            buttonText: null,
            status: "Pending",
            color: "orange",
          };
        }

        case "rejected":
          return {
            icon: "Ban",
            title: "Claim Rejected",
            description: `Your claim for ${notification.itemId.name} was rejected`,
            buttonText: null,
            status: "Completed",
            color: "red",
          };
        case "accepted":
          return {
            icon: "CheckCircle2",
            title: "Claim Accepted",
            description: `Your claim was accepted! Chat to coordinate return.`,
            buttonText: "Open Chat",
            status: "Completed",
            color: "green",
          };
        case "returned":
          return {
            icon: "CheckCircle2",
            title: "Item Returned",
            description: `${notification.itemId.name} has been returned`,
            buttonText: null,
            status: "Completed",
            color: "green",
          };
        default:
          return {
            icon: "SendHorizonal",
            title: "Request Sent",
            description: `Claim request sent to ${getFullName(
              notification.finderId
            )}`,
            buttonText: null,
            status: "Pending",
            color: "blue",
          };
      }
    }

    return {
      icon: "HelpCircle",
      title: "Notification",
      description: "You have a new notification",
      buttonText: null,
      status: "Info",
      color: "blue",
    };
  };

  const config = getNotificationConfig();
  const LucideIcon = Icon[config.icon];

  // Enhanced styling functions
  const getStatusBadgeClass = () => {
    const baseClasses = "text-xs font-semibold px-2 py-1 rounded-full border";

    switch (config.status) {
      case "Action Required":
        return `${baseClasses} bg-red-50 text-red-700 border-red-200`;
      case "Pending":
        return `${baseClasses} bg-yellow-50 text-yellow-700 border-yellow-200`;
      case "Completed":
        return `${baseClasses} bg-green-50 text-green-700 border-green-200`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-700 border-gray-200`;
    }
  };

  const getIconContainerClass = () => {
    switch (config.color) {
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "orange":
        return "bg-orange-100 text-orange-600";
      case "red":
        return "bg-red-100 text-red-600";
      case "green":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getButtonClass = () => {
    const baseClasses = "text-xs h-8 px-4 font-medium text-white";

    switch (config.color) {
      case "blue":
        return `${baseClasses} bg-blue-600 hover:bg-blue-700`;
      case "orange":
        return `${baseClasses} bg-orange-600 hover:bg-orange-700`;
      case "red":
        return `${baseClasses} bg-red-600 hover:bg-red-700`;
      case "green":
        return `${baseClasses} bg-green-600 hover:bg-green-700`;
      default:
        return `${baseClasses} bg-blue-600 hover:bg-blue-700`;
    }
  };

  // Calculate time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    return `${diffDays}d ago`;
  };

  const handleButtonClick = () => {
    console.log("Button clicked for:", config.title);
    // Add your actual button handling logic here
  };

  return (
    <div className="flex gap-4 items-start p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 bg-white group cursor-pointer">
      {/* Icon with background */}
      <div className={`p-2 rounded-lg ${getIconContainerClass()}`}>
        <LucideIcon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Header with status badge and title */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={getStatusBadgeClass()}>{config.status}</span>
            <Header
              content={config.title}
              className={"text-sm font-semibold text-gray-900"}
            />
          </div>
          <Icon.ChevronRight
            size={16}
            className="text-gray-400 flex-shrink-0 mt-1 group-hover:text-gray-600 transition-colors"
          />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {config.description}
        </p>

        {/* Footer with timestamp and button */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-gray-500 font-medium">
            {getTimeAgo(notification.createdAt)}
          </p>

          {config.buttonText && (
            <Button className={getButtonClass()} onClick={handleButtonClick}>
              {config.buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItemTest;
