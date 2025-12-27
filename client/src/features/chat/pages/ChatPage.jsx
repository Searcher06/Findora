/* eslint-disable no-unused-vars */
import { RequestDetail } from "../components/RequestDetail";
import { ChatArea } from "../components/ChatArea";
import { InputsSection } from "../components/InputsSection";
import { useParams } from "react-router-dom";
import { useFetchRequestById } from "@/features/verification";
import { useChatStore } from "@/store/useChatStore";
import { useEffect } from "react";
// ChatPage.jsx
export const ChatPage = () => {
  const { requestId, username } = useParams();
  const {
    request,
    loading: requestLoading,
    requestError,
  } = useFetchRequestById(requestId);
  const { messages, isMessagesLoading, getMessages } = useChatStore();

  useEffect(() => {
    getMessages(requestId, username);
  }, [requestId, username, getMessages]);
  console.log(messages);

  return (
    <div className="mt-14 flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Request Detail - Fixed at top */}
      <div className="flex-shrink-0 px-3">
        <RequestDetail
          request={request}
          requestLoading={requestLoading}
          requestError={requestError}
        />
      </div>

      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-hidden">
        <ChatArea
          messages={messages}
          loading={isMessagesLoading}
          error={null}
        />
      </div>

      {/* Fixed Input Section at bottom */}
      <div className="flex-shrink-0">
        <InputsSection requestId={requestId} username={username} />
      </div>
    </div>
  );
};
