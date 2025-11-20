// Helper function to get full name
export const getFullName = (user) => {
  return `${user.firstName} ${user.lastName}`;
};

// Finder notification configurations
const finderConfigs = {
  pending: (notification) => {
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
  },

  rejected: (notification) => ({
    icon: "XCircle",
    title: "Claim Rejected",
    description: `You rejected ${getFullName(
      notification.claimerId
    )}'s claim for ${notification.itemId.name}`,
    buttonText: null,
    status: "Completed",
    color: "red",
  }),

  accepted: (notification) => ({
    icon: "MessageCircle",
    title: "Claim Accepted",
    description: `You accepted ${getFullName(
      notification.claimerId
    )}'s claim. Chat to coordinate return.`,
    buttonText: "Open Chat",
    status: "Completed",
    color: "green",
  }),

  returned: (notification) => ({
    icon: "CheckCircle2",
    title: "Item Returned",
    description: `${notification.itemId.name} has been successfully returned`,
    buttonText: null,
    status: "Completed",
    color: "green",
  }),
};

// Claimer notification configurations
const claimerConfigs = {
  pending: (notification) => {
    if (notification.questions.length === 0) {
      return {
        icon: "Clock",
        title: "Awaiting Questions",
        description: `Your claim for ${
          notification.itemId.name
        } is awaiting questions from ${getFullName(notification.finderId)}`,
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
  },

  rejected: (notification) => ({
    icon: "Ban",
    title: "Claim Rejected",
    description: `Your claim for ${notification.itemId.name} was rejected`,
    buttonText: null,
    status: "Completed",
    color: "red",
  }),

  accepted: (notification) => ({
    icon: "CheckCircle2",
    title: "Claim Accepted",
    description: `Your claim was accepted! for ${notification.itemId.name}, Chat to coordinate return.`,
    buttonText: "Open Chat",
    status: "Completed",
    color: "green",
  }),

  returned: (notification) => ({
    icon: "CheckCircle2",
    title: "Item Returned",
    description: `${notification.itemId.name} has been returned`,
    buttonText: null,
    status: "Completed",
    color: "green",
  }),
};

// Main notification config function
export const getNotificationConfig = (notification, isFinder, isClaimer) => {
  if (isFinder) {
    const config = finderConfigs[notification.status];
    return config ? config(notification) : finderConfigs.pending(notification);
  }

  if (isClaimer) {
    const config = claimerConfigs[notification.status];
    return config
      ? config(notification)
      : {
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

  return {
    icon: "HelpCircle",
    title: "Notification",
    description: "You have a new notification",
    buttonText: null,
    status: "Info",
    color: "blue",
  };
};
