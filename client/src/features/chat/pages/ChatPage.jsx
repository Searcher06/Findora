import { RequestDetail } from "../components/RequestDetail";
import { ChatArea } from "../components/ChatArea";
import { InputsSection } from "../components/InputsSection";
import { useParams } from "react-router-dom";
import { useFetchRequestById } from "@/features/verification";
import { useChatStore } from "@/store/useChatStore";
import { useEffect, useRef } from "react";

export const ChatPage = () => {
  const { requestId, username } = useParams();
  const {
    request,
    loading: requestLoading,
    requestError,
    AcceptClaim,
    subscribeToAcceptClaim,
    unsubscribeToAcceptClaim,
  } = useFetchRequestById(requestId);
  const { messages, isMessagesLoading, getMessages } = useChatStore();
  const messageEndref = useRef(null);

  useEffect(() => {
    getMessages(requestId, username);
  }, [requestId, username, getMessages]);

  useEffect(() => {
    useChatStore.getState().markMessagesAsRead(requestId);
  }, [requestId]);

  useEffect(() => {
    subscribeToAcceptClaim(requestId, username);

    return () => unsubscribeToAcceptClaim();
  }, [requestId, username, subscribeToAcceptClaim, unsubscribeToAcceptClaim]);

  useEffect(() => {
    if (messageEndref.current && messages)
      messageEndref.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Mobile & Tablet View (< lg) - Stacked Layout */}
      <div className="lg:hidden mt-14 flex flex-col h-[calc(100vh-3.5rem)]">
        {/* Request Detail - Fixed at top */}
        <div className="shrink-0 px-3 sm:px-4">
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

      {/* Desktop View (≥ lg) - Side-by-side Layout */}
      <div className="hidden lg:flex mt-14 md:mt-16 h-[calc(100vh-4rem)] gap-4 px-4 py-4 bg-gray-50">
        {/* Main Chat Section - Left Side (70%) */}
        <div className="flex-1 flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 overflow-hidden">
            <ChatArea
              messages={messages}
              loading={isMessagesLoading}
              error={null}
              messageEndref={messageEndref}
            />
          </div>

          {/* Input Section at bottom */}
          <div className="shrink-0 border-t border-gray-200">
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

        {/* Request Detail Sidebar - Right Side (30%) */}
        <div className="w-80 xl:w-96 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-5 overflow-y-auto">
          <RequestDetail
            request={request}
            requestLoading={requestLoading}
            requestError={requestError}
            isDesktopSidebar={true}
          />
        </div>
      </div>
    </>
  );
};
