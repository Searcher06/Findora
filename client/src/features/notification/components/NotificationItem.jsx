import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import * as Icon from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationItem = ({ notification, currentUserId }) => {
  const navigate = useNavigate();
  const requestId = notification._id;
  // Determine if current user is finder or claimer
  const isFinder = currentUserId === notification.finderId._id;
  const isClaimer = currentUserId === notification.claimerId._id;

  // Helper function to get full name
  const getFullName = (user) => {
    return `${user.firstName} ${user.lastName}`;
  };

  const getNotificationConfig = () => {
    if (isFinder) {
      // FOUND ITEM FLOW (Finder = the person who found the item)
      if (notification.requestType === "found") {
        switch (notification.status) {
          case "pending": {
            if (notification.questions.length === 0) {
              return {
                icon: "SendHorizonal",
                title: "You reported finding an item",
                description: `You told ${getFullName(
                  notification.claimerId
                )} you found their "${
                  notification.itemId.name
                }". They need to answer your verification questions to prove ownership.`,
                buttonText: "Create Questions",
                status: "Action Required",
                color: "blue",
                navigate: `/verification/questions/${requestId}`,
              };
            }

            const hasUnansweredQuestions = notification.questions.some(
              (q) => !q.answer || q.answer.trim() === ""
            );
            if (hasUnansweredQuestions) {
              return {
                icon: "Clock",
                title: "Waiting for owner to respond",
                description: `Your verification questions for "${
                  notification.itemId.name
                }" are with ${getFullName(
                  notification.claimerId
                )}. They need to answer to prove it's theirs.`,
                buttonText: null,
                status: "Waiting",
                color: "orange",
              };
            }

            const allQuestionsAnswered = notification.questions.every(
              (q) => q.answer && q.answer.trim() !== ""
            );
            if (allQuestionsAnswered) {
              return {
                icon: "FileCheck",
                title: "Review owner's answers",
                description: `${getFullName(
                  notification.claimerId
                )} answered your questions about "${
                  notification.itemId.name
                }". Do their answers prove they own it?`,
                buttonText: "Review Answers",
                status: "Action Required",
                color: "orange",
                navigate: `/verification/decision/${requestId}`,
              };
            }

            return {
              icon: "SendHorizonal",
              title: "Found item reported",
              description: `You found "${notification.itemId.name}". The owner needs to verify it's theirs.`,
              buttonText: "Set Verification",
              status: "Action Required",
              color: "blue",
            };
          }

          case "rejected":
            return {
              icon: "XCircle",
              title: "You rejected the owner's claim",
              description: `You decided ${getFullName(
                notification.claimerId
              )}'s answers about "${
                notification.itemId.name
              }" weren't convincing enough.`,
              buttonText: null,
              status: "Completed",
              color: "red",
            };

          case "accepted":
            return {
              icon: "MessageCircle",
              title: "You verified the owner",
              description: `Good job! You confirmed ${getFullName(
                notification.claimerId
              )} owns "${notification.itemId.name}". Time to arrange return.`,
              buttonText: "Arrange Return",
              status: "Next Step",
              color: "green",
              navigate: `/chat/${requestId}`,
            };

          default:
            return {
              icon: "Package",
              title: "Found item reported",
              description: `You found "${notification.itemId.name}" and reported it to the owner.`,
              buttonText: "View Details",
              status: "Active",
              color: "blue",
            };
        }
      }

      // CLAIM FLOW (existing code - Finder = owner of found item)
      if (notification.requestType === "claim") {
        switch (notification.status) {
          case "pending": {
            if (notification.questions.length === 0) {
              return {
                icon: "HelpCircle",
                title: "Someone is claiming your found item",
                description: `${getFullName(notification.claimerId)} says "${
                  notification.itemId.name
                }" is theirs. Ask 2-4 questions to verify their story.`,
                buttonText: "Verify Their Claim",
                status: "Action Required",
                color: "blue",
                navigate: `/verification/questions/${requestId}`,
              };
            }

            const hasUnansweredQuestions = notification.questions.some(
              (q) => !q.answer || q.answer.trim() === ""
            );
            if (hasUnansweredQuestions) {
              return {
                icon: "Clock",
                title: "Waiting for their answers",
                description: `✓ Questions delivered. Awaiting ${getFullName(
                  notification.claimerId
                )}'s response about "${notification.itemId.name}".`,
                buttonText: null,
                status: "Waiting",
                color: "orange",
              };
            }

            const allQuestionsAnswered = notification.questions.every(
              (q) => q.answer && q.answer.trim() !== ""
            );
            if (allQuestionsAnswered) {
              return {
                icon: "Scale",
                title: "Time to decide",
                description: `${getFullName(
                  notification.claimerId
                )} answered your questions about "${
                  notification.itemId.name
                }". Do their answers convince you?`,
                buttonText: "Review & Decide",
                status: "Action Required",
                color: "orange",
                navigate: `/verification/decision/${requestId}`,
              };
            }

            return {
              icon: "HelpCircle",
              title: "Verify their story",
              description: `Ask questions to make sure "${notification.itemId.name}" really belongs to them.`,
              buttonText: "Ask Questions",
              status: "Action Required",
              color: "blue",
            };
          }

          case "rejected":
            return {
              icon: "XCircle",
              title: "You said no to their claim",
              description: `You decided "${
                notification.itemId.name
              }" doesn't belong to ${getFullName(notification.claimerId)}.`,
              buttonText: null,
              status: "Done",
              color: "red",
            };

          case "accepted":
            return {
              icon: "MessageCircle",
              title: "You accepted their claim",
              description: `Great! You agreed ${getFullName(
                notification.claimerId
              )} owns "${
                notification.itemId.name
              }". Now arrange how to return it.`,
              buttonText: "Arrange Return",
              status: "Next Step",
              color: "green",
              navigate: `/chat/${requestId}`,
            };

          case "returned":
            return {
              icon: "CheckCircle2",
              title: "Item returned successfully",
              description: `"${notification.itemId.name}" is now back with its owner. Good deed done!`,
              buttonText: null,
              status: "Completed",
              color: "green",
            };

          default:
            return {
              icon: "HelpCircle",
              title: "Verify ownership",
              description: `Someone says "${notification.itemId.name}" belongs to them. Let's check if they're telling the truth.`,
              buttonText: "Start Verification",
              status: "Action Required",
              color: "blue",
            };
        }
      }
    } else if (isClaimer) {
      // FOUND ITEM FLOW (Claimer = owner who lost the item)
      if (notification.requestType === "found") {
        switch (notification.status) {
          case "pending": {
            if (notification.questions.length === 0) {
              return {
                icon: "Package",
                title: "Someone found your item!",
                description: `Great news! ${getFullName(
                  notification.finderId
                )} found your "${
                  notification.itemId.name
                }". They'll send questions to verify it's yours.`,
                buttonText: null,
                status: "Exciting!",
                color: "green",
              };
            }

            const hasUnansweredQuestions = notification.questions.some(
              (q) => !q.answer || q.answer.trim() === ""
            );
            if (hasUnansweredQuestions) {
              return {
                icon: "HelpCircle",
                title: "Prove it's your item",
                description: `${getFullName(
                  notification.finderId
                )} has verification questions about "${
                  notification.itemId.name
                }". Answer to prove you own it.`,
                buttonText: "Prove Ownership",
                status: "Action Required",
                color: "blue",
                navigate: `/verification/answers/${requestId}`,
              };
            }

            const allQuestionsAnswered = notification.questions.every(
              (q) => q.answer && q.answer.trim() !== ""
            );
            if (allQuestionsAnswered) {
              return {
                icon: "UserCheck",
                title: "Answers submitted",
                description: `You answered questions about "${
                  notification.itemId.name
                }". ${getFullName(
                  notification.finderId
                )} is reviewing your answers.`,
                buttonText: null,
                status: "Under Review",
                color: "orange",
              };
            }

            return {
              icon: "Clock",
              title: "Verification in progress",
              description: `${getFullName(
                notification.finderId
              )} is preparing questions about your "${
                notification.itemId.name
              }".`,
              buttonText: null,
              status: "Processing",
              color: "orange",
            };
          }

          case "rejected":
            return {
              icon: "Ban",
              title: "Verification failed",
              description: `${getFullName(
                notification.finderId
              )} wasn't convinced by your answers about "${
                notification.itemId.name
              }".`,
              buttonText: null,
              status: "Try Again",
              color: "red",
            };

          case "accepted":
            return {
              icon: "CheckCircle2",
              title: "Ownership verified!",
              description: `Perfect! ${getFullName(
                notification.finderId
              )} confirmed you own "${
                notification.itemId.name
              }". Let's arrange getting it back.`,
              buttonText: "Get My Item",
              status: "Success",
              color: "green",
              navigate: `/chat/${requestId}`,
            };

          default:
            return {
              icon: "Package",
              title: "Item found",
              description: `Good news! ${getFullName(
                notification.finderId
              )} may have found your "${notification.itemId.name}".`,
              buttonText: null,
              status: "Update",
              color: "blue",
            };
        }
      }

      // CLAIM FLOW (existing code - Claimer = person claiming found item)
      if (notification.requestType === "claim") {
        switch (notification.status) {
          case "pending": {
            if (notification.questions.length === 0) {
              return {
                icon: "Clock",
                title: "Waiting for their questions",
                description: `${getFullName(
                  notification.finderId
                )} has your item. They need to ask you questions about "${
                  notification.itemId.name
                }" first.`,
                buttonText: null,
                status: "Waiting",
                color: "orange",
              };
            }

            const hasUnansweredQuestions = notification.questions.some(
              (q) => !q.answer || q.answer.trim() === ""
            );
            if (hasUnansweredQuestions) {
              return {
                icon: "HelpCircle",
                title: "Answer their questions",
                description: `${getFullName(
                  notification.finderId
                )} wants to make sure "${
                  notification.itemId.name
                }" is really yours. Answer their questions.`,
                buttonText: "Prove It's Yours",
                status: "Action Required",
                color: "blue",
                navigate: `/verification/answers/${requestId}`,
              };
            }

            const allQuestionsAnswered = notification.questions.every(
              (q) => q.answer && q.answer.trim() !== ""
            );
            if (allQuestionsAnswered) {
              return {
                icon: "UserCheck",
                title: "Waiting for their decision",
                description: `You answered questions about "${
                  notification.itemId.name
                }". Now ${getFullName(notification.finderId)} needs to decide.`,
                buttonText: null,
                status: "Waiting",
                color: "orange",
              };
            }

            return {
              icon: "Clock",
              title: "Processing your claim",
              description: `The finder of "${notification.itemId.name}" is reviewing your claim.`,
              buttonText: null,
              status: "Processing",
              color: "orange",
            };
          }

          case "rejected":
            return {
              icon: "Ban",
              title: "They didn't believe you",
              description: `${getFullName(
                notification.finderId
              )} decided your answers about "${
                notification.itemId.name
              }" weren't convincing enough.`,
              buttonText: null,
              status: "Denied",
              color: "red",
            };

          case "accepted":
            return {
              icon: "CheckCircle2",
              title: "Great news! They believe you",
              description: `Good job! ${getFullName(
                notification.finderId
              )} is convinced "${
                notification.itemId.name
              }" is yours. Let's arrange getting it back.`,
              buttonText: "Get Your Item",
              status: "Success",
              color: "green",
              navigate: `/chat/${requestId}`,
            };

          case "returned":
            return {
              icon: "CheckCircle2",
              title: "You got your item back!",
              description: `"${notification.itemId.name}" is now back with you. Thank you for being honest!`,
              buttonText: null,
              status: "Success",
              color: "green",
            };

          default:
            return {
              icon: "SendHorizonal",
              title: "Claim sent successfully",
              description: `You told ${getFullName(
                notification.finderId
              )} that "${notification.itemId.name}" belongs to you.`,
              buttonText: null,
              status: "Sent",
              color: "blue",
            };
        }
      }
    }

    // Default fallback
    return {
      icon: "HelpCircle",
      title: "Update about your item",
      description: "There's news about your lost or found item.",
      buttonText: null,
      status: "Update",
      color: "blue",
    };
  };

  const config = getNotificationConfig();
  const LucideIcon = Icon[config.icon];

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
    navigate(`${config.navigate}`);
  };

  return (
    <div className="flex gap-4 items-start p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 bg-white group cursor-pointer font-sans">
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
            {getTimeAgo(notification.updatedAt)}
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

export default NotificationItem;
