import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowUp } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "@/store/useChatStore";

export const InputsSection = ({ requestId, username }) => {
  const { sendMessage } = useChatStore();
  const [message, setMessage] = useState({
    message: { value: "" },
  });

  const handleSend = async () => {
    if (!message.message.value.trim()) return;
    try {
      await sendMessage(requestId, username, message);
      console.log("Sending message:", message);
      setMessage({ message: { value: "" } });
    } catch (error) {
      console.log("Failed to send message :", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white shadow-lg">
      {/* Accept Claim Button */}
      <div className="px-3 py-2 border-b border-gray-100">
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-xs">
          Accept Claim
        </Button>
      </div>

      {/* Message Input */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2">
          {/* Attachment Button */}
          <Button
            variant="ghost"
            size="sm"
            className="flex-shrink-0 rounded-full size-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>

          {/* Input Field */}
          <div className="flex-1">
            <input
              type="text"
              value={message.message.value}
              onChange={(e) =>
                setMessage({ message: { value: e.target.value } })
              }
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder:text-gray-500 text-xs transition-all"
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.message.value.trim()}
            size="sm"
            className="flex-shrink-0 size-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
