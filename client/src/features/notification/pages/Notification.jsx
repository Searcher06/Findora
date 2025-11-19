import { Header } from "@/components/Header";
import { sampleRequests } from "../sample";
import NotificationItemTest from "../components/NotificationItemTest";
import { useState, useMemo } from "react";

const Notification = () => {
  const currentUserId = "finder1";
  const [filter, setFilter] = useState("All");

  // Filter notifications based on current filter
  const userNotifications = useMemo(() => {
    // First, get all notifications for the current user
    const userNotifications = sampleRequests.filter(
      (request) =>
        request.finderId._id === currentUserId ||
        request.claimerId._id === currentUserId
    );

    // Then apply the selected filter
    switch (filter) {
      case "Pending":
        return userNotifications.filter(
          (request) => request.status === "pending"
        );

      case "Actions Required":
        return userNotifications.filter((request) => {
          const isFinder = request.finderId._id === currentUserId;
          const isClaimer = request.claimerId._id === currentUserId;

          if (isFinder) {
            // Finder actions: need to generate questions or make decision
            return (
              request.status === "pending" &&
              (request.questions.length === 0 || // No questions yet
                request.questions.every(
                  (q) => q.answer && q.answer.trim() !== ""
                )) // All questions answered, need decision
            );
          } else if (isClaimer) {
            // Claimer actions: need to answer questions
            return (
              request.status === "pending" &&
              request.questions.length > 0 &&
              request.questions.some((q) => !q.answer || q.answer.trim() === "")
            );
          }
          return false;
        });

      case "All":
      default:
        return userNotifications;
    }
  }, [filter, currentUserId]);

  console.log(
    "User's notifications:",
    userNotifications.length,
    "Filter:",
    filter
  );

  // Helper function to get button styles based on active filter
  const getFilterButtonClass = (filterName) => {
    const baseClass =
      "h-6 px-4 py-[11px] flex items-center rounded-sm cursor-pointer transition-colors";
    return filter === filterName
      ? `${baseClass} bg-blue-600 text-white`
      : `${baseClass} border border-gray-300 hover:bg-gray-50`;
  };

  return (
    <div className="mt-14 w-full pl-2 pr-2">
      <div>
        <Header
          content={"Notifications"}
          className={"text-[26px] font-medium"}
        />
      </div>

      <div className="font-sans text-[13px] flex justify-between mt-4">
        <div
          className={getFilterButtonClass("All")}
          onClick={() => setFilter("All")}
        >
          All
        </div>
        <div
          className={getFilterButtonClass("Pending")}
          onClick={() => setFilter("Pending")}
        >
          Pending
        </div>
        <div
          className={getFilterButtonClass("Actions Required")}
          onClick={() => setFilter("Actions Required")}
        >
          Actions Required
        </div>
      </div>

      {/* Notifications List */}
      <div className="mt-3 flex flex-col gap-2">
        {userNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No {filter.toLowerCase()} notifications
          </div>
        ) : (
          userNotifications.map((request) => (
            <NotificationItemTest
              key={request._id}
              notification={request}
              currentUserId={currentUserId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
