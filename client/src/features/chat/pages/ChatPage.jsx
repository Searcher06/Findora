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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100/45 to-white">
      <div className="pointer-events-none absolute -left-24 top-6 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="relative lg:hidden h-[calc(100dvh-3.5rem)] md:h-[calc(100dvh-4rem)]">
        <div className="flex h-full flex-col px-3 pb-2 sm:px-4">
          <div className="shrink-0">
            <RequestDetail
              request={request}
              requestLoading={requestLoading}
              requestError={requestError}
            />
          </div>

          <div className="mt-2 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <ChatArea
              messages={messages}
              loading={isMessagesLoading}
              error={null}
              messageEndref={messageEndref}
            />
          </div>

          <div className="mt-2 shrink-0 rounded-2xl border border-slate-200 bg-white shadow-sm">
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
      </div>

      <div className="relative mx-auto hidden h-[calc(100dvh-2rem)] w-full max-w-7xl gap-4 px-4 py-4 lg:flex">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_35px_90px_-75px_rgba(15,23,42,0.8)]">
          <div className="flex-1 overflow-hidden">
            <ChatArea
              messages={messages}
              loading={isMessagesLoading}
              error={null}
              messageEndref={messageEndref}
            />
          </div>

          <div className="shrink-0 border-t border-slate-200 bg-white/80 backdrop-blur">
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

        <div className="w-80 shrink-0 overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_35px_90px_-75px_rgba(15,23,42,0.8)] xl:w-96">
          <RequestDetail
            request={request}
            requestLoading={requestLoading}
            requestError={requestError}
            isDesktopSidebar={true}
          />
        </div>
      </div>
    </div>
  );
};
