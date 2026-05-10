import avatarimage from "../../../constants/avatar2.jpg";
import { useAuthStore } from "@/store/useAuthStore";
import { formatMessageTime } from "@/utils/formatDate";
import { Handshake, Info, CheckCheck } from "lucide-react";

export const ChatArea = ({ loading, messages, error, messageEndref }) => {
  const { user } = useAuthStore();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-sm text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className="h-full flex items-center justify-center p-4 sm:p-6">
        <div className="text-center max-w-md">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
            <span className="text-red-600 text-xl">!</span>
          </div>
          <h3 className="font-medium text-gray-900 text-sm sm:text-base">
            Failed to load messages
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{error}</p>
          <button className="mt-4 rounded-lg bg-indigo-700 px-3 py-1.5 text-xs text-white transition-colors hover:bg-indigo-700 sm:px-4 sm:py-2 sm:text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[linear-gradient(180deg,#faf9ff_0%,#f7faff_45%,#f3f7ff_100%)] p-3 sm:p-4 lg:p-6">
      {messages?.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-3 sm:mb-4">
            <span className="text-xl sm:text-2xl text-indigo-600">💬</span>
          </div>
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
            Start the conversation
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xs sm:max-w-sm">
            Send a message to coordinate the item handoff
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {messages?.map((message) => {
            const isMe = message.senderId._id === user._id;
            const isSystem = message.text?.startsWith("[SYSTEM]");

            if (isSystem) {
              return (
                <div
                  key={message._id}
                  className="my-4 flex flex-col items-center sm:my-6 lg:my-8"
                  ref={messageEndref}
                >
                  <div className="relative w-full max-w-[95%] overflow-hidden rounded-xl border border-indigo-100 bg-white p-3 text-center shadow-sm sm:w-auto sm:max-w-[90%] sm:p-4 lg:p-5">
                    <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
                    <div className="mb-2 inline-flex size-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 sm:mb-3 sm:size-10">
                      <Handshake className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
                    </div>
                    <h4 className="mb-1 flex items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-[0.15em] text-indigo-600 sm:gap-1.5 sm:text-[10px] sm:tracking-[0.2em]">
                      <Info className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={3} />
                      Official Request
                    </h4>
                    <p className="px-1 text-xs font-medium italic leading-relaxed text-slate-700 sm:px-2 sm:text-sm">
                      {message.text.replace("[SYSTEM]: ", "")}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-2 border-t border-slate-100 pt-2 sm:mt-3 sm:gap-3 sm:pt-3 lg:mt-4">
                      <time className="text-[9px] font-bold uppercase tracking-tight text-slate-400 sm:text-[10px]">
                        {formatMessageTime(message.updatedAt)}
                      </time>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={message._id}
                className={`flex ${
                  isMe ? "justify-end" : "justify-start"
                }`}
                ref={messageEndref}
              >
                <div
                  className={`flex gap-2 sm:gap-3 ${
                    isMe ? "flex-row-reverse" : "flex-row"
                  } max-w-[90%] sm:max-w-[85%]`}
                >
                  <div className="shrink-0 relative">
                    <div className="size-8 overflow-hidden rounded-full bg-gray-100 ring-1 ring-white shadow-sm sm:size-9 sm:ring-2 sm:shadow-md lg:size-10">
                      <img
                        src={message.senderId.profilePic || avatarimage}
                        alt={
                          isMe
                            ? "Your profile"
                            : `${message.senderId.firstName}'s profile`
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 size-2 sm:size-2.5 lg:size-3 rounded-full border-2 border-white ${
                        isMe ? "bg-green-500" : "bg-indigo-500"
                      }`}
                    />
                  </div>

                  <div
                    className={`flex flex-col ${
                      isMe ? "items-end" : "items-start"
                    } flex-1`}
                  >
                    <div
                      className={`flex items-center gap-1.5 sm:gap-2 mb-1 ${
                        isMe ? "flex-row-reverse" : ""
                      }`}
                    >
                      {!isMe && message.senderId.firstName && (
                        <span className="text-xs font-semibold text-slate-900 sm:text-sm">
                          {message.senderId.firstName}
                        </span>
                      )}
                      <time className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 sm:px-2 sm:text-xs">
                        {formatMessageTime(message.updatedAt)}
                      </time>
                    </div>

                    <div
                      className={`relative overflow-hidden rounded-xl shadow-sm transition-shadow duration-200 hover:shadow sm:rounded-2xl ${
                        isMe
                          ? "bg-indigo-700 text-white"
                          : "border border-slate-200 bg-white text-slate-900"
                      } ${
                        message.image
                          ? "max-w-[280px] sm:max-w-[340px]"
                          : "max-w-[250px] xs:max-w-xs sm:max-w-sm"
                      }`}
                    >
                      {message.image && (
                        <div className="relative overflow-hidden">
                          <img
                            src={message.image}
                            className="h-auto max-h-48 w-full object-cover sm:max-h-60 lg:max-h-72"
                            alt="Shared image"
                            loading="lazy"
                          />
                          <a
                            href={message.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-2 right-2 rounded-lg bg-black/80 px-2 py-1 text-[10px] text-white transition-colors hover:bg-black sm:bottom-3 sm:right-3 sm:px-3 sm:py-1.5 sm:text-xs"
                          >
                            View Full
                          </a>
                        </div>
                      )}

                      {message.text && (
                        <div className="p-2.5 sm:p-3 lg:p-4">
                          <p className="break-words text-xs leading-relaxed sm:text-sm">
                            {message.text}
                          </p>
                        </div>
                      )}
                    </div>

                    {isMe && (
                      <div className="flex items-center gap-0.5 sm:gap-1 mt-1 sm:mt-1.5">
                        {message.read ? (
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-indigo-500 sm:text-xs">
                            <CheckCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Read
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium italic text-slate-400 sm:text-xs">
                            Sent
                          </span>
                        )}
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
