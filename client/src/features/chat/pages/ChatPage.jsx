/* eslint-disable no-unused-vars */
import { RequestDetail } from "../components/RequestDetail";
import { ChatArea } from "../components/ChatArea";
import { InputsSection } from "../components/InputsSection";
import { useParams } from "react-router-dom";
import { useFetchRequestById } from "@/features/verification";
import { useChatStore } from "@/store/useChatStore";
import { useEffect, useRef } from "react";
// ChatPage.jsx
export const ChatPage = () => {
  const { requestId, username } = useParams();
  // prettier-ignore
  const {request,loading: requestLoading, requestError,AcceptClaim,subscribeToAcceptClaim,unsubscribeToAcceptClaim} = useFetchRequestById(requestId);
  // prettier-ignore
  const { messages, isMessagesLoading, getMessages,subscribeToMessages,unsubscribeFromMessage } = useChatStore();
  const messageEndref = useRef(null);
  useEffect(() => {
    getMessages(requestId, username);

    subscribeToMessages(username);

    return () => unsubscribeFromMessage();
  }, [
    requestId,
    username,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessage,
  ]);

  useEffect(() => {
    subscribeToAcceptClaim(requestId, username);

    return () => unsubscribeToAcceptClaim();
  }, [requestId, username, subscribeToAcceptClaim, unsubscribeToAcceptClaim]);

  useEffect(() => {
    if (messageEndref.current && messages)
      messageEndref.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <div className="mt-14 flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Request Detail - Fixed at top */}
      <div className="shrink-0 px-3">
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
          messageEndref={messageEndref}
        />
      </div>

      {/* Fixed Input Section at bottom */}
      <div className="shrink-0">
        <InputsSection
          requestId={requestId}
          username={username}
          request={request}
          requestLoading={requestLoading}
          requestError={requestError}
          AcceptClaim={AcceptClaim}
        />
      </div>
    </div>
  );
};
