import { useState } from "react";
import { ChevronLeft, RefreshCw, Search } from "lucide-react";

export const ChatSelectionPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const chats = [
    {
      id: 1,
      userName: "John Doe",
      role: "Owner of Laptop Charger",
      lastMessage: "Is the charger still available?",
      timestamp: "2m ago",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      userName: "Sarah Smith",
      role: "Claimer of Blue Wallet",
      lastMessage: "I think that's mine! It has my library card.",
      timestamp: "15m ago",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 3,
      userName: "Mike Ross",
      role: "Finder of Car keys",
      lastMessage: "Where would you like to meet for the...",
      timestamp: "1h ago",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    {
      id: 4,
      userName: "Emily Chen",
      role: "Claimer of Sunglasses",
      lastMessage: "Thank you so much for finding these!",
      timestamp: "Yesterday",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: 5,
      userName: "Alex Rivera",
      role: "Finder of Backpack",
      lastMessage: "I've dropped it off at the campus securit...",
      timestamp: "2 days ago",
      avatar: "https://i.pravatar.cc/150?img=14",
    },
  ];

  const filteredChats = chats.filter(
    (chat) =>
      chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-white mt-14">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-2 pb-2">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
            <RefreshCw className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        {/* Title */}
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
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            />
          </div>
        </div>

        {/* Recent Activity Label */}
        <div className="px-5 pb-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-display">
            Recent Activity
          </p>
        </div>

        {/* Conversations List */}
        <div className="pb-4">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden">
                  <img
                    src={chat.avatar}
                    alt={chat.userName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <h3 className="font-semibold text-gray-900 text-sm font-display">
                      {chat.userName}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0 font-sans">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 font-medium mb-1 font-sans">
                    {chat.role}
                  </p>
                  <p className="text-sm text-gray-600 truncate font-sans">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center px-5">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium text-sm font-display">
                No conversations found
              </p>
              <p className="text-gray-400 text-xs mt-1 font-sans">
                Try searching with different terms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
