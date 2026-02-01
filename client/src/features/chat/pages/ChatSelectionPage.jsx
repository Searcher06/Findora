/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ChevronLeft, RefreshCw, Search } from "lucide-react";
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
    )}&background=3B82F6&color=fff&bold=true`;
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
    <div className="min-h-screen bg-gray-50 md:bg-white">
      <div className="w-full bg-white mt-14 md:mt-16">
        {/* Header - Responsive */}
        <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 lg:px-8 pt-2 sm:pt-3 pb-2">
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
          <button
            onClick={() => useChatStore.getState().fetchUsersToChat()}
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <RefreshCw
              className={`w-4 h-4 sm:w-5 sm:h-5 text-blue-600 ${
                isUsersLoading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>

        {/* Title - Responsive */}
        <div className="px-4 sm:px-5 md:px-6 lg:px-8 pb-2 sm:pb-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 font-display">
            Messages
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-sans hidden md:block">
            {filteredChats.length} conversation
            {filteredChats.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Search Bar - Responsive */}
        <div className="px-4 sm:px-5 md:px-6 lg:px-8 pb-3 sm:pb-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search people or items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 md:pl-12 pr-4 py-2 sm:py-2.5 md:py-3 bg-gray-50 md:bg-gray-100 border-none rounded-lg md:rounded-xl text-xs sm:text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans transition-all"
            />
          </div>
        </div>

        {/* Chat List - Responsive with alternative desktop layout */}
        <div className="pb-4 md:px-4 lg:px-6">
          {/* Mobile & Tablet View (< lg) */}
          <div className="lg:hidden">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`flex items-start gap-3 px-4 sm:px-5 py-3 sm:py-3.5 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                  chat.isUnread ? "bg-blue-50/40" : ""
                }`}
              >
                <div className="relative">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0 overflow-hidden bg-gray-200">
                    <img
                      src={chat.avatar}
                      alt={chat.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {chat.isUnread && (
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <h3
                      className={`text-sm sm:text-base font-display ${
                        chat.isUnread
                          ? "font-bold text-gray-900"
                          : "font-semibold text-gray-900"
                      }`}
                    >
                      {chat.userName}
                    </h3>
                    <span
                      className={`text-[10px] sm:text-xs shrink-0 font-sans ${
                        chat.isUnread
                          ? "text-blue-600 font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      {chat.timestamp}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1 font-sans">
                    {chat.role}
                  </p>

                  <p
                    className={`text-xs sm:text-sm truncate font-sans ${
                      chat.isUnread
                        ? "text-gray-900 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View (≥ lg) - Card-based layout */}
          <div className="hidden lg:grid lg:grid-cols-1 xl:grid-cols-2 gap-3 max-w-7xl mx-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`flex items-start gap-4 p-5 rounded-xl border-2 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all ${
                  chat.isUnread
                    ? "bg-blue-50/50 border-blue-200"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full shrink-0 overflow-hidden bg-gray-200 ring-2 ring-white shadow-sm">
                    <img
                      src={chat.avatar}
                      alt={chat.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {chat.isUnread && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3
                      className={`text-base font-display ${
                        chat.isUnread
                          ? "font-bold text-gray-900"
                          : "font-semibold text-gray-900"
                      }`}
                    >
                      {chat.userName}
                    </h3>
                    <span
                      className={`text-xs shrink-0 font-sans ${
                        chat.isUnread
                          ? "text-blue-600 font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      {chat.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="px-2 py-0.5 bg-blue-100 rounded-md">
                      <p className="text-xs text-blue-700 font-semibold font-sans">
                        {chat.role}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`text-sm font-sans line-clamp-2 ${
                      chat.isUnread
                        ? "text-gray-900 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredChats.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 font-display">
                No conversations found
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 text-center font-sans">
                {searchQuery
                  ? "Try a different search term"
                  : "Start a conversation by claiming an item"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
