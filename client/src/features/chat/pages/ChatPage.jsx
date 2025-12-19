import { RequestDetail } from "../components/RequestDetail";
import { ChatArea } from "../components/ChatArea";

// ChatPage.jsx
export const ChatPage = () => {
  return (
    <div className="mt-14 flex flex-col px-3">
      <RequestDetail />
      <ChatArea />
    </div>
  );
};
