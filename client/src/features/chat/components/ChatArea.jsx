import { useAuthStore } from "@/store/useAuthStore";
import { formatMessageTime } from "@/utils/formatDate";
import { Handshake, Info } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const ChatArea = ({ loading, messages, error, messageEndref }) => {
  const { user } = useAuthStore();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="text-center">
          <p className="text-sm font-medium text-red-600">Failed to load messages</p>
          <p className="mt-1 text-xs text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-3 py-4 sm:px-4">
      {messages?.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
          <span className="text-4xl">💬</span>
          <p className="text-sm font-semibold text-slate-700">Start the conversation</p>
          <p className="max-w-xs text-xs text-slate-400">
            Send a message to coordinate the item handover
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {messages?.map((message, index) => {
            const isMe = message.senderId._id === user._id;
            const isSystem = message.text?.startsWith("[SYSTEM]");

            // System message
            if (isSystem) {
              return (
                <div key={message._id} className="my-4 flex justify-center">
                  <div className="max-w-[85%] rounded-2xl border border-indigo-100 bg-white px-4 py-3 text-center shadow-sm">
                    <div className="mb-1.5 flex items-center justify-center gap-1.5">
                      <Handshake className="h-3.5 w-3.5 text-indigo-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                        Official Request
                      </span>
                      <Info className="h-3 w-3 text-indigo-400" />
                    </div>
                    <p className="text-xs italic leading-relaxed text-slate-600">
                      {message.text.replace("[SYSTEM]: ", "")}
                    </p>
                    <p className="mt-2 text-[10px] text-slate-400">
                      {formatMessageTime(message.updatedAt)}
                    </p>
                  </div>
                </div>
              );
            }

            // Check if we should show avatar (first message or different sender from previous)
            const prevMessage = index > 0 ? messages[index - 1] : null;
            const showAvatar =
              !isMe &&
              (!prevMessage ||
                prevMessage.senderId._id !== message.senderId._id ||
                prevMessage.text?.startsWith("[SYSTEM]"));

            const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;
            const isLastInGroup =
              !nextMessage ||
              nextMessage.senderId._id !== message.senderId._id ||
              nextMessage.text?.startsWith("[SYSTEM]");

            return (
              <div
                key={message._id}
                ref={index === messages.length - 1 ? messageEndref : null}
                className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"} ${
                  isLastInGroup ? "mb-3" : "mb-0.5"
                }`}
              >
                {/* Avatar — only for other user, only on last message in group */}
                {!isMe ? (
                  <div className="w-7 shrink-0">
                    {isLastInGroup ? (
                      <Avatar className="h-7 w-7">
                        {message.senderId.profilePic ? (
                          <AvatarImage src={message.senderId.profilePic} />
                        ) : null}
                        <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-violet-500 text-[10px] font-bold text-white">
                          {message.senderId.firstName?.[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                    ) : null}
                  </div>
                ) : null}

                {/* Bubble */}
                <div
                  className={`flex max-w-[72%] flex-col ${
                    isMe ? "items-end" : "items-start"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Shared image"
                      loading="lazy"
                      className={`mb-0.5 max-h-56 w-auto max-w-full rounded-2xl object-cover ${
                        isMe ? "rounded-br-sm" : "rounded-bl-sm"
                      }`}
                    />
                  )}

                  {message.text && (
                    <div
                      className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        isMe
                          ? "rounded-br-sm bg-indigo-600 text-white"
                          : "rounded-bl-sm bg-white text-slate-900 shadow-sm"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  {isLastInGroup && (
                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {formatMessageTime(message.updatedAt)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
