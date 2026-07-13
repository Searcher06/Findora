import { ChatArea } from "../components/ChatArea";
import { InputsSection } from "../components/InputsSection";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchRequestById } from "@/features/verification";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useRef } from "react";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const ChatPage = () => {
  const { requestId, username } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
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
      messageEndref.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Determine the other user
  const otherUser =
    request?.finderId?._id === user?._id
      ? request?.claimerId
      : request?.finderId;

  const otherUserName = otherUser
    ? `${otherUser.firstName || ""} ${otherUser.lastName || ""}`.trim() ||
      otherUser.username
    : username;

  const getInitial = (name) => (name ? name[0].toUpperCase() : "?");

  return (
    <>
      {/* ── MOBILE / TABLET ── */}
      <div className="fixed inset-0 flex flex-col bg-[#f0f2f5] lg:hidden" style={{ top: 0, bottom: 0 }}>
        {/* Top bar */}
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200/80 bg-white px-3 shadow-sm">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <Avatar className="h-9 w-9 shrink-0">
            {otherUser?.profilePic ? (
              <AvatarImage src={otherUser.profilePic} alt={otherUserName} />
            ) : null}
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
              {getInitial(otherUserName)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {otherUserName}
            </p>
            <p className="truncate text-xs text-slate-500">
              {request?.itemId?.name
                ? `Re: ${request.itemId.name}`
                : "Loading..."}
            </p>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
            aria-label="More options"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        {/* Messages — fills remaining space */}
        <div className="flex-1 overflow-hidden">
          <ChatArea
            messages={messages}
            loading={isMessagesLoading}
            error={null}
            messageEndref={messageEndref}
          />
        </div>

        {/* Input pinned to bottom */}
        <div className="shrink-0 border-t border-slate-200/80 bg-white">
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

      {/* ── DESKTOP ── unchanged layout */}
      <div className="relative mx-auto hidden h-[calc(100dvh-2rem)] w-full max-w-7xl gap-4 px-4 py-4 lg:flex">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_35px_90px_-75px_rgba(15,23,42,0.8)]">
          {/* Desktop top bar */}
          <div className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 px-5">
            <Avatar className="h-10 w-10 shrink-0">
              {otherUser?.profilePic ? (
                <AvatarImage src={otherUser.profilePic} alt={otherUserName} />
              ) : null}
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                {getInitial(otherUserName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {otherUserName}
              </p>
              <p className="truncate text-xs text-slate-500">
                {request?.itemId?.name
                  ? `Re: ${request.itemId.name}`
                  : "Loading..."}
              </p>
            </div>
          </div>

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

        {/* Desktop right sidebar — item details */}
        <div className="w-80 shrink-0 overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_35px_90px_-75px_rgba(15,23,42,0.8)] xl:w-96">
          {request && (
            <div className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Item Details
              </h2>
              {request.itemId?.image && (
                <img
                  src={request.itemId.image}
                  alt={request.itemId.name}
                  className="w-full rounded-2xl object-cover aspect-video border border-slate-200"
                />
              )}
              <p className="font-display text-lg font-bold text-slate-900">
                {request.itemId?.name}
              </p>
              <p className="text-sm text-slate-500">
                {request.itemId?.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
