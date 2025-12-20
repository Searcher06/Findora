import { RequestDetail } from "../components/RequestDetail";
import { ChatArea } from "../components/ChatArea";
import { InputsSection } from "../components/InputsSection";

// ChatPage.jsx
export const ChatPage = () => {
  return (
    <div className="mt-14 flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Request Detail - Fixed at top */}
      <div className="flex-shrink-0 px-3">
        <RequestDetail />
      </div>

      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-hidden">
        <ChatArea />
      </div>

      {/* Fixed Input Section at bottom */}
      <div className="flex-shrink-0">
        <InputsSection />
      </div>
    </div>
  );
};
