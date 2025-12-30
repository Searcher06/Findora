// import { mockMessages, CURRENT_USER_ID } from "../utils/utils";
import avatarimage from "../../../constants/avatar2.jpg";
import { useAuthStore } from "@/store/useAuthStore";
import { formatMessageTime } from "@/utils/formatDate";
export const ChatArea = ({ loading, messages, error, messageEndref }) => {
  const { user } = useAuthStore();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-sm text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
            <span className="text-red-600 text-xl">!</span>
          </div>
          <h3 className="font-medium text-gray-900">Failed to load messages</h3>
          <p className="text-sm text-gray-600 mt-1">{error}</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      {messages?.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <span className="text-2xl text-blue-600">💬</span>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            Start the conversation
          </h3>
          <p className="text-sm text-gray-600 max-w-sm">
            Send a message to coordinate the item handoff
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages?.map((message) => {
            const isMe = message.senderId._id === user._id;

            return (
              <div
                key={message._id}
                className={`flex ${
                  isMe ? "justify-end" : "justify-start"
                } animate-fadeIn`}
                ref={messageEndref}
              >
                <div
                  className={`flex gap-3 ${
                    isMe ? "flex-row-reverse" : "flex-row"
                  } max-w-[85%]`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 relative">
                    <div className="size-10 rounded-full ring-2 ring-white shadow-md overflow-hidden bg-gray-100">
                      <img
                        src={
                          isMe
                            ? message.senderId.profilePic || avatarimage
                            : message.receiverId.profilePic || avatarimage
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Online indicator */}
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white ${
                        isMe ? "bg-green-500" : "bg-blue-500"
                      }`}
                    />
                  </div>

                  {/* Message Content */}
                  <div
                    className={`flex flex-col ${
                      isMe ? "items-end" : "items-start"
                    } flex-1`}
                  >
                    {/* Header with name and time */}
                    <div
                      className={`flex items-center gap-2 mb-1.5 ${
                        isMe ? "flex-row-reverse" : ""
                      }`}
                    >
                      {!isMe && message.senderId.firstName && (
                        <span className="font-semibold text-sm text-gray-900">
                          {message.senderId.firstName}
                        </span>
                      )}
                      <time className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                        {formatMessageTime(message.updatedAt)}
                      </time>
                    </div>

                    {/* Bubble */}
                    <div
                      className={`relative rounded-2xl shadow-sm hover:shadow transition-shadow duration-200 overflow-hidden ${
                        isMe
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-900 border border-gray-200"
                      } ${
                        message.image ? "max-w-[320px]" : "max-w-xs sm:max-w-sm"
                      }`}
                    >
                      {/* Image */}
                      {message.image && (
                        <div className="relative overflow-hidden">
                          <img
                            src={message.image}
                            className="w-full h-auto max-h-[300px] object-cover"
                            alt="Shared image"
                            loading="lazy"
                          />

                          {/* View full image button */}
                          <a
                            href={message.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-black transition-colors"
                          >
                            View Full
                          </a>
                        </div>
                      )}

                      {/* Text */}
                      {message.text && (
                        <div className={`${message.image ? "p-4" : "p-4"}`}>
                          <p className="text-sm leading-relaxed break-words">
                            {message.text}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Status indicator for sent messages */}
                    {isMe && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <span className="text-xs text-gray-400 font-medium">
                          {message.read ? (
                            <span className="flex items-center gap-1">
                              <span className="text-blue-500">✓✓</span> Read
                            </span>
                          ) : (
                            <span className="text-gray-500">Sent</span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
