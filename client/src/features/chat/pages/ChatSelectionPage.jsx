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

    // Logic: Identify what the OTHER person is relative to you
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
      name
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
          conversation.lastMessageAt || conversation.updatedAt
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
      chat.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-white mt-14">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-2 pb-2">
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => useChatStore.getState().fetchUsersToChat()}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <RefreshCw
              className={`w-5 h-5 text-blue-600 ${
                isUsersLoading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>

        <div className="px-5 pb-2">
          <h1 className="text-2xl font-bold text-gray-900 font-display">
            Messages
          </h1>
        </div>

        {/* Search Bar */}
        <div className="px-5 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search people or items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            />
          </div>
        </div>

        {/* List */}
        <div className="pb-4">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              className={`flex items-start gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                chat.isUnread ? "bg-blue-50/40" : ""
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden bg-gray-200">
                  <img
                    src={chat.avatar}
                    alt={chat.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {chat.isUnread && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <h3
                    className={`text-sm font-display ${
                      chat.isUnread
                        ? "font-bold text-gray-900"
                        : "font-semibold text-gray-900"
                    }`}
                  >
                    {chat.userName}
                  </h3>
                  <span
                    className={`text-[10px] shrink-0 font-sans ${
                      chat.isUnread
                        ? "text-blue-600 font-bold"
                        : "text-gray-500"
                    }`}
                  >
                    {chat.timestamp}
                  </span>
                </div>

                <p className="text-xs text-blue-600 font-medium mb-1 font-sans">
                  {chat.role}
                </p>

                <p
                  className={`text-sm truncate font-sans ${
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
      </div>
    </div>
  );
};
