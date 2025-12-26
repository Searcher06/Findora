// import { mockMessages, CURRENT_USER_ID } from "../utils/utils";
import avatarimage from "../../../constants/avatar2.jpg";
import { useAuthStore } from "@/store/useAuthStore";
import { formatMessageTime } from "@/utils/formatDate";
export const ChatArea = ({ loading, messages, error }) => {
  const { user } = useAuthStore();
  if (loading) {
    return <h2>Loading messages...</h2>;
  } else if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-gray-100">
      {messages?.map((message) => {
        const isMe = message.senderId._id === user._id;
        return (
          <div
            key={message._id}
            className={`flex ${
              isMe ? "justify-end" : "justify-start"
            } animate-fadeIn`}
          >
            <div
              className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="size-10 rounded-full ring-2 ring-white shadow-md overflow-hidden">
                  <img
                    src={
                      isMe
                        ? message.senderId.profilePic || avatarimage
                        : message.receiverId.profilePic || avatarimage
                    }
                    alt="Profile Pic"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Message Content */}
              <div
                className={`flex flex-col max-w-xs sm:max-w-sm md:max-w-md ${
                  isMe ? "items-end" : "items-start"
                }`}
              >
                {/* Header */}
                <div
                  className={`flex items-center gap-2 mb-1 px-1 ${
                    isMe ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {!isMe && message.senderId.firstName && (
                    <span className="font-semibold text-sm text-gray-800">
                      {message.senderId.firstName}
                    </span>
                  )}
                  <time className="text-xs text-gray-500">
                    {formatMessageTime(message.updatedAt)}
                  </time>
                </div>

                {/* Bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl shadow-md transition-all hover:shadow-lg ${
                    isMe
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      className="max-w-[240px] rounded-xl mb-2 shadow-sm"
                      alt="Message attachment"
                    />
                  )}
                  {message.text && (
                    <p className="text-xs leading-relaxed">{message.text}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
