import { useState } from "react";
import {
  Search,
  Circle,
  Clock,
  Check,
  MessageSquare,
  Shield,
  User,
} from "lucide-react";

export const ChatSelectionPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock chat data based on the screenshot
  const chats = [
    {
      id: 1,
      userName: "John Doe",
      role: "Finder",
      itemName: "Laptop Charger",
      lastMessage: "Is the charger still available?",
      timestamp: "2m ago",
      unread: true,
      userInitial: "J",
      isVerified: true,
      isFinder: true,
    },
    {
      id: 2,
      userName: "Sarah Smith",
      role: "Claimer",
      itemName: "Blue Wallet",
      lastMessage: "I think that's mine! It has my library card.",
      timestamp: "15m ago",
      unread: false,
      userInitial: "S",
      isVerified: true,
      isFinder: false,
    },
    {
      id: 3,
      userName: "Mike Ross",
      role: "Finder",
      itemName: "Car Keys",
      lastMessage: "Where would you like to meet for the...",
      timestamp: "1h ago",
      unread: true,
      userInitial: "M",
      isVerified: false,
      isFinder: true,
    },
    {
      id: 4,
      userName: "Emily Chen",
      role: "Claimer",
      itemName: "Sunglasses",
      lastMessage: "Thank you so much for finding these!",
      timestamp: "Yesterday",
      unread: false,
      userInitial: "E",
      isVerified: true,
      isFinder: false,
    },
    {
      id: 5,
      userName: "Alex Rivera",
      role: "Finder",
      itemName: "Backpack",
      lastMessage: "I've dropped it off at the campus security...",
      timestamp: "2 days ago",
      unread: false,
      userInitial: "A",
      isVerified: true,
      isFinder: true,
    },
  ];

  const filteredChats = chats.filter(
    (chat) =>
      chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 font-display">
            Messages
          </h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MessageSquare className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-3 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search people or items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transplaceholder-gray-400"
          />
        </div>
      </header>

      {/* Recent Activity Header */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-sm font-semibold text-gray-700 font-display uppercase tracking-wider">
          RECENT ACTIVITY
        </h2>
      </div>

      {/* Chat List */}
      <div className="px-4 pb-20">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              chat.unread ? "bg-blue-50/50" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              {/* User Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-100 to-blue-50 border border-blue-200 flex items-center justify-center">
                  <span className="text-blue-700 font-semibold text-sm">
                    {chat.userInitial}
                  </span>
                </div>

                {/* Role Indicator */}
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                    chat.isFinder ? "bg-green-100" : "bg-purple-100"
                  }`}
                >
                  {chat.isFinder ? (
                    <Shield className="w-3 h-3 text-green-600" />
                  ) : (
                    <User className="w-3 h-3 text-purple-600" />
                  )}
                </div>

                {/* Online/Unread Indicator */}
                {chat.unread && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 font-display truncate">
                      {chat.userName}
                    </h3>
                    {chat.isVerified && (
                      <Check className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {chat.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      chat.isFinder
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {chat.isFinder ? "Finder" : "Claimer"} of {chat.itemName}
                  </span>
                </div>

                <p
                  className={`text-sm mt-2 truncate ${
                    chat.unread ? "text-gray-900 font-medium" : "text-gray-600"
                  }`}
                >
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredChats.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-sans">No conversations found</p>
            <p className="text-gray-400 text-sm mt-1 font-sans">
              Try searching with different terms
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation (Optional) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between">
        <button className="flex flex-col items-center">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          <span className="text-xs text-blue-500 font-medium mt-1">Chats</span>
        </button>
        <button className="flex flex-col items-center">
          <Circle className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-500 mt-1">Requests</span>
        </button>
        <button className="flex flex-col items-center">
          <User className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-500 mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};
