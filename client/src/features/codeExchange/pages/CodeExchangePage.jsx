import { useFetchRequestById } from "@/features/verification";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSendCode } from "../hooks/useSendCode";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { CheckCircle2, Copy, Loader2, ShieldCheck } from "lucide-react";

export const CodeExchangePage = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const { user } = useAuthStore();
  const { loading, request, error, setRequest } = useFetchRequestById(requestId);
  const [otp, setOtp] = useState("");
  const { sendCode, loading: sending } = useSendCode();
  const socket = useAuthStore.getState().socket;

  useEffect(() => {
    if (!requestId) return;
    socket.emit("join:request", { requestId });
    socket.on("request:verified", (updatedRequest) => {
      toast.success("Both users verified. Item successfully returned!");
      setRequest(updatedRequest);
    });
    return () => socket.off("request:verified");
  }, [requestId, setRequest, socket]);

  const handleSubmitOtp = async () => {
    if (otp.length !== 5) {
      toast.error("Please enter the complete 5-digit code.");
      return;
    }
    const data = await sendCode(requestId, { code: otp });
    if (data) { setRequest(data); setOtp(""); }
  };

  const handleCopy = () => {
    if (userCode) {
      navigator.clipboard.writeText(userCode);
      toast.success("Code copied!");
    }
  };

  const isFinder = request?.finderId?._id === user?._id;
  const isClaimer = request?.claimerId?._id === user?._id;
  const isFinderVerified = request?.finderVerified || false;
  const isClaimerVerified = request?.claimerVerified || false;
  const isUserVerified = isFinder ? isFinderVerified : isClaimerVerified;
  const isOtherUserVerified = isFinder ? isClaimerVerified : isFinderVerified;
  const userCode = isFinder ? request?.finderCode : isClaimer ? request?.claimerCode : null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!loading && (request?.status === "pending" || !request)) {
    navigate("/");
    return null;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  // ── Success screen ──
  if (request?.status === "returned") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-5 pb-10 pt-10 text-center">
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full bg-emerald-400/30 blur-2xl scale-150" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-xl">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>
        </div>

        <h1 className="font-display text-2xl font-bold text-slate-900">Handover Complete!</h1>
        <p className="mt-2 max-w-xs text-sm text-slate-500">
          The item has been successfully returned and recorded.
        </p>

        <div className="mt-6 w-full max-w-xs rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Item</span>
            <span className="font-semibold text-slate-900">{request?.itemId?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Finder</span>
            <span className="font-semibold text-slate-900">{request?.finderId?.firstName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Claimer</span>
            <span className="font-semibold text-slate-900">{request?.claimerId?.firstName}</span>
          </div>
          <div className="flex items-center justify-center gap-2 border-t border-slate-200 pt-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700">Both parties verified</span>
          </div>
        </div>

        <div className="mt-5 text-xs text-slate-400 flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5" />
          +10 trust points awarded to both parties
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-6 w-full max-w-xs rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98]"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // ── Verification screen ──
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="border-b border-slate-100 px-5 pb-4 pt-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">
          <ShieldCheck className="h-6 w-6 text-indigo-700" />
        </div>
        <h1 className="font-display text-xl font-bold text-slate-900">Verify Handover</h1>
        <p className="mt-1 text-sm text-slate-500">Exchange codes to confirm the in-person exchange</p>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-4 py-5">

        {/* How it works */}
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 px-4 py-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-600">How it works</p>
          <ol className="space-y-1.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">1</span>
              <span><strong>Share</strong> your code with the other person</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">2</span>
              <span><strong>Enter</strong> the code they give you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">3</span>
              <span><strong>Submit</strong> to complete the handover</span>
            </li>
          </ol>
        </div>

        {/* Your code */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Your Code</p>
          <div className="flex items-center justify-center gap-3">
            <p className="font-mono text-4xl font-bold tracking-[0.2em] text-indigo-600">
              {userCode || "-----"}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy code"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-400">Show this to the other person</p>

          {isUserVerified && (
            <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700">They've verified your code ✓</span>
            </div>
          )}
        </div>

        {/* Enter their code */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Enter Their Code
          </p>

          <div className="flex justify-center mb-4">
            <InputOTP
              maxLength={5}
              value={otp}
              onChange={setOtp}
              disabled={isOtherUserVerified}
            >
              <InputOTPGroup>
                {[0,1,2,3,4].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="h-12 w-10 text-lg font-bold rounded-xl border-2 border-slate-200 focus:border-indigo-500"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {isOtherUserVerified ? (
            <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 py-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Verification complete</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSubmitOtp}
              disabled={sending || otp.length !== 5}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-sm transition disabled:opacity-40 active:scale-[0.98]"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {sending ? "Verifying..." : "Submit Code"}
            </button>
          )}
        </div>

        {/* Waiting state */}
        {isOtherUserVerified && !isUserVerified && (
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
            <span className="text-xs font-semibold text-amber-700">Waiting for them to enter your code...</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-4 py-3 text-center">
        <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="h-3 w-3" />
          Secure verification · Findora
        </p>
      </div>
    </div>
  );
};
