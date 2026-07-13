import { useEffect, useState } from "react";
import { Search, MessageSquareDashed, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const ChatSelectionPage = () => {
  const { isUsersLoading, usersToChat } = useChatStore();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    useChatStore.getState().fetchUsersToChat();
  }, []);

  const getOtherUser = (conv) =>
    conv.finderId._id === user._id ? conv.claimerId : conv.finderId;

  const checkUnread = (conv) => {
    if (!conv.lastMessageAt) return false;
    const isFinder = conv.finderId._id === user._id;
    const lastSeen = isFinder ? conv.lastSeen?.finder : conv.lastSeen?.claimer;
    return new Date(conv.lastMessageAt) > new Date(lastSeen);
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "";
    }
  };

  const chats = usersToChat
    .map((conv) => {
      const other = getOtherUser(conv);
      const isUnread = checkUnread(conv);
      const isMe = conv.lastMessage?.senderId === user._id;
      return {
        id: conv._id,
        username: other?.username || "unknown",
        name: `${other?.firstName || ""} ${other?.lastName || ""}`.trim() || other?.username || "Unknown",
        avatar: other?.profilePic || null,
        initial: (other?.firstName?.[0] || "?").toUpperCase(),
        itemName: conv.itemId?.name || "Unknown Item",
        lastMessage: isMe
          ? `You: ${conv.lastMessage?.text || ""}`
          : conv.lastMessage?.text || "No messages yet",
        time: formatTime(conv.lastMessageAt || conv.updatedAt),
        isUnread,
        requestType: conv.requestType,
      };
    })
    .filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="sticky top-14 z-10 border-b border-slate-200/80 bg-white/95 px-4 pb-3 pt-4 backdrop-blur-xl md:top-16">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-display text-xl font-bold text-slate-900">Messages</h1>
          <button
            type="button"
            onClick={() => useChatStore.getState().fetchUsersToChat()}
            aria-label="Refresh"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
          >
            <RefreshCw className={`h-4 w-4 ${isUsersLoading ? "animate-spin text-indigo-600" : ""}`} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-full border border-slate-200 bg-slate-100 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1">
        {isUsersLoading && chats.length === 0 ? (
          <div className="space-y-0 divide-y divide-slate-100">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-32 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-3 w-48 animate-pulse rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : chats.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {chats.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => navigate(`/chat/${chat.id}/${chat.username}`)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition active:bg-slate-50"
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <Avatar className="h-12 w-12">
                    {chat.avatar ? (
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-base font-bold text-white">
                      {chat.initial}
                    </AvatarFallback>
                  </Avatar>
                  {chat.isUnread && (
                    <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-indigo-600" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className={`truncate text-sm ${chat.isUnread ? "font-bold text-slate-900" : "font-semibold text-slate-800"}`}>
                      {chat.name}
                    </p>
                    <span className={`shrink-0 text-[11px] ${chat.isUnread ? "font-semibold text-indigo-600" : "text-slate-400"}`}>
                      {chat.time}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-indigo-600/80 font-medium">
                    Re: {chat.itemName}
                  </p>
                  <p className={`mt-0.5 truncate text-xs ${chat.isUnread ? "font-semibold text-slate-800" : "text-slate-500"}`}>
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Unread dot */}
                {chat.isUnread && (
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-600" />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 px-6 py-20 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
              {searchQuery
                ? <Search className="h-7 w-7 text-indigo-400" />
                : <MessageSquareDashed className="h-7 w-7 text-indigo-500" />}
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900">
                {searchQuery ? "No results found" : "No conversations yet"}
              </h3>
              <p className="mt-1 max-w-xs text-sm text-slate-500">
                {searchQuery
                  ? "Try a different search term."
                  : "Once a claim request is accepted, your chat will appear here."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
