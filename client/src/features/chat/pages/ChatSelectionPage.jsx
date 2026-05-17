/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ChevronLeft, RefreshCw, Search, MessageSquareDashed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatDistanceToNow } from "date-fns";

export const ChatSelectionPage = () => {
  const { isUsersLoading, usersToChat } = useChatStore();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    useChatStore.getState().fetchUsersToChat();
  }, []);

  const handleChatSelect = (chat) => {
    navigate(`/chat/${chat.id}/${chat.username}`);
  };

  const getRoleText = (conversation) => {
    if (!user || !user._id) return "User";

    const isCurrentUserFinder = conversation.finderId._id === user._id;
    const itemName = conversation.itemId?.name || "Item";

    return isCurrentUserFinder
      ? `Claimer of ${itemName}`
      : `Finder of ${itemName}`;
  };

  const checkUnread = (conversation) => {
    if (!user || !conversation.lastMessageAt) return false;
    const isFinder = conversation.finderId._id === user._id;
    const lastSeenTime = isFinder
      ? conversation.lastSeen.finder
      : conversation.lastSeen.claimer;
    return new Date(conversation.lastMessageAt) > new Date(lastSeenTime);
  };

  const getOtherUser = (conversation) => {
    if (!user || !user._id) return null;
    return conversation.finderId._id === user._id
      ? conversation.claimerId
      : conversation.finderId;
  };

  const formatTimestamp = (dateString) => {
    if (!dateString) return "Recently";
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Recently";
    }
  };

  const getAvatarUrl = (userData) => {
    if (userData?.profilePic) return userData.profilePic;
    const name = userData?.username || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=4338CA&color=fff&bold=true`;
  };

  const transformConversationsToChats = () => {
    if (!user || !user._id || !Array.isArray(usersToChat)) return [];

    return usersToChat.map((conversation) => {
      const otherUser = getOtherUser(conversation);
      const isUnread = checkUnread(conversation);
      const lastMessageSenderId = conversation.lastMessage?.senderId;
      const lastMessagePrefix = lastMessageSenderId === user._id ? "You: " : "";

      return {
        id: conversation._id,
        userName: otherUser
          ? `${otherUser.firstName || ""} ${otherUser.lastName || ""}`.trim()
          : "Unknown User",
        username: otherUser?.username || "unknown",
        role: getRoleText(conversation),
        lastMessage: `${lastMessagePrefix}${
          conversation.lastMessage?.text || "No messages yet"
        }`,
        timestamp: formatTimestamp(
          conversation.lastMessageAt || conversation.updatedAt,
        ),
        avatar: getAvatarUrl(otherUser),
        isUnread: isUnread,
        status: conversation.status,
        itemName: conversation.itemId?.name || "Unknown Item",
        requestType: conversation.requestType,
      };
    });
  };

  const filteredChats = transformConversationsToChats().filter(
    (chat) =>
      chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.itemName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100/55 to-white px-3 pb-8 pt-3 sm:px-5 md:px-6">
      <div className="pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        <section className="rounded-3xl border border-indigo-100 bg-[linear-gradient(135deg,#faf9ff_0%,#f3f0ff_54%,#f8f7ff_100%)] px-4 py-5 shadow-[0_35px_90px_-70px_rgba(79,70,229,0.6)] sm:px-6 sm:py-6">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => window.history.back()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => useChatStore.getState().fetchUsersToChat()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-indigo-700 transition hover:bg-indigo-50"
              aria-label="Refresh chats"
            >
              <RefreshCw
                className={`h-4 w-4 ${isUsersLoading ? "animate-spin" : ""}`}
              />
            </button>
          </div>

          <div className="mt-4">
            <img src="/iconplusfindoratext.png" alt="Findora" className="h-7 w-auto" />
            <h1 className="mt-3 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Conversations
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {filteredChats.length} conversation
              {filteredChats.length !== 1 ? "s" : ""} available
            </p>
          </div>

          <div className="relative mt-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search people, items, or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-xl border border-indigo-100 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-violet-100"
            />
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-slate-200/80 bg-white/90 p-3 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] sm:p-4">
          {isUsersLoading && filteredChats.length === 0 ? (
            <div className="space-y-3 p-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-100" />
              ))}
            </div>
          ) : filteredChats.length > 0 ? (
            <div className="grid gap-3">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => handleChatSelect(chat)}
                  className={`w-full rounded-2xl border px-3 py-3 text-left transition sm:px-4 ${
                    chat.isUnread
                      ? "border-indigo-200 bg-indigo-50/65 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src={chat.avatar}
                        alt={chat.userName}
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-white sm:h-12 sm:w-12"
                      />
                      {chat.isUnread ? (
                        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-indigo-700" />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`truncate font-display text-sm sm:text-base ${chat.isUnread ? "font-bold text-slate-900" : "font-semibold text-slate-900"}`}>
                          {chat.userName}
                        </h3>
                        <span className={`shrink-0 text-[11px] font-medium ${chat.isUnread ? "text-indigo-700" : "text-slate-500"}`}>
                          {chat.timestamp}
                        </span>
                      </div>

                      <div className="mt-1 inline-flex rounded-md bg-violet-100 px-2 py-0.5 text-[11px] font-semibold text-violet-700">
                        {chat.role}
                      </div>

                      <p className={`mt-1.5 truncate text-xs sm:text-sm ${chat.isUnread ? "font-medium text-slate-900" : "text-slate-600"}`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                {searchQuery ? <Search className="h-8 w-8" /> : <MessageSquareDashed className="h-8 w-8" />}
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-900">
                No conversations found
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {searchQuery
                  ? "Try a different keyword."
                  : "Start by opening an item request chat."}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
