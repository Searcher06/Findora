import { Button } from "@/components/ui/button";
import { ItemInfo } from "./ItemInfo";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { DeleteItemButton, RequestButton } from "./AlertDialogBox";
import { createFlag } from "@/features/flags/services/flagApi";
import { resolveItem } from "../api/itemApi";
import { toast } from "sonner";
import { useState } from "react";
import { Share2, CheckCircle2, X } from "lucide-react";
import { handleApiError } from "@/utils/handleApiError";

const RESOLVE_REASONS = [
  { value: "Found it myself", label: "Found it myself", desc: "I located the item without help from the platform." },
  { value: "Owner retrieved it", label: "Owner retrieved it", desc: "The owner came and collected the item in person." },
  { value: "No longer needed", label: "No longer needed", desc: "The situation has changed and this listing isn't relevant." },
  { value: "Posted by mistake", label: "Posted by mistake", desc: "This item was reported in error." },
];

const ResolveModal = ({ itemId, itemName, onClose, onResolved }) => {
  const [selected, setSelected] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selected) { toast.error("Please select a reason"); return; }
    try {
      setSubmitting(true);
      await resolveItem(itemId, selected);
      toast.success("Item resolved and removed from listings.");
      onResolved();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resolve item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-indigo-100 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900">Resolve Item</h3>
              <p className="text-xs text-slate-500 truncate max-w-50">"{itemName}"</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <p className="mb-4 text-sm text-slate-600">Why are you closing this listing? This will remove it from public browse.</p>
          <div className="space-y-2.5">
            {RESOLVE_REASONS.map((r) => (
              <label
                key={r.value}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition ${
                  selected === r.value
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition ${
                  selected === r.value ? "border-emerald-600 bg-emerald-600" : "border-slate-300"
                }`}>
                  {selected === r.value && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>
                <input type="radio" className="sr-only" value={r.value} checked={selected === r.value} onChange={() => setSelected(r.value)} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{r.label}</p>
                  <p className="text-xs text-slate-500">{r.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-4">
          <button type="button" onClick={onClose} disabled={submitting}
            className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} disabled={submitting || !selected}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50">
            <CheckCircle2 className="h-4 w-4" />
            {submitting ? "Resolving..." : "Resolve Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ShareButton = ({ name, className = "" }) => {
  const url = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${name} — Findora`, url });
      } catch {
        // user cancelled — do nothing
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } catch {
        toast.error("Could not copy link");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-900 shadow-sm transition-all hover:bg-violet-50 hover:shadow-md active:scale-95 ${className}`}
    >
      <Share2 className="h-4 w-4" />
      Share
    </button>
  );
};

export const DetailedItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { status, reportedBy, _id, name, image } = item;
  const placeholderImage = "/item-placeholder.svg";
  const isOwner = user?._id === reportedBy?._id;
  const canResolve = isOwner && ["lost", "found"].includes(status);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const handleReportItem = async () => {
    if (!reportReason.trim()) {
      toast.error("Please add a reason before submitting.");
      return;
    }

    try {
      setIsSubmittingReport(true);
      await createFlag({
        targetType: "item",
        targetId: _id,
        reason: reportReason.trim(),
      });
      toast.success("Report submitted. Admin will review it.");
      setIsReportModalOpen(false);
      setReportReason("");
    } catch (error) {
      handleApiError(error, "Failed to submit report.");
    } finally {
      setIsSubmittingReport(false);
    }
  };

  return (
    <div className="w-full px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
      {/* Mobile & Tablet Layout (stacked) */}
      <div className="lg:hidden flex flex-col gap-4 sm:gap-5 md:gap-6">
        {/* Image */}
        <div className="w-full flex justify-center px-0">
          <img
            src={image || placeholderImage}
            alt={name}
            className="w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] object-cover aspect-video lg:aspect-square border border-slate-200/50"
          />
        </div>

        {/* Item Info */}
        <div className="w-full max-w-2xl mx-auto rounded-2xl border border-indigo-200/70 bg-linear-to-br from-white to-violet-50/65 p-4 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] backdrop-blur-sm sm:rounded-3xl sm:p-5 md:p-6">
          <ItemInfo item={item} layoutMode="default" />
        </div>

        {/* Action Buttons */}
        <div className="w-full flex justify-center px-3">
          {isOwner ? (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <DeleteItemButton
                itemId={_id}
                itemName={name}
                className="bg-red-500 hover:bg-red-600 rounded-lg sm:rounded-xl font-medium text-sm px-4 sm:px-6 py-2 sm:py-2.5 h-10 sm:h-11 flex items-center justify-center transition-all shadow-sm hover:shadow-md"
              />
              <Button
                className="rounded-lg sm:rounded-xl font-medium text-sm px-4 sm:px-6 py-2 sm:py-2.5 h-10 sm:h-11 active:scale-95 transition-all bg-indigo-700 hover:bg-indigo-700 shadow-sm hover:shadow-md"
                onClick={() => navigate(`/update/${_id}`)}
              >
                Update
              </Button>
              {canResolve && (
                <button
                  type="button"
                  onClick={() => setIsResolveModalOpen(true)}
                  className="inline-flex h-10 sm:h-11 items-center gap-2 rounded-lg sm:rounded-xl border border-emerald-200 bg-emerald-50 px-4 sm:px-5 text-sm font-medium text-emerald-800 transition-all hover:bg-emerald-100 active:scale-95"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Resolve
                </button>
              )}
              <ShareButton name={name} className="h-10 sm:h-11" />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <RequestButton
                itemId={_id}
                itemName={name}
                status={status}
                className="rounded-lg sm:rounded-xl font-medium text-sm px-6 sm:px-8 py-2 sm:py-2.5 h-10 sm:h-11 flex items-center justify-center active:scale-95 transition-all bg-indigo-700 hover:bg-indigo-700 shadow-sm hover:shadow-md"
              />
              <Button
                type="button"
                onClick={() => setIsReportModalOpen(true)}
                className="rounded-lg border border-indigo-200 bg-white text-indigo-900 shadow-sm transition-all h-10 px-5 py-2 text-sm font-medium active:scale-95 hover:bg-violet-50 hover:shadow-md sm:h-11 sm:rounded-xl sm:px-6 sm:py-2.5"
              >
                Report Item
              </Button>
              <ShareButton name={name} className="h-10 sm:h-11" />
            </div>
          )}
        </div>

        {/* Disclaimer Text */}
        <p className="font-sans text-xs sm:text-sm text-gray-600 text-center px-4">You'll get chat access once your request is accepted</p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6 xl:gap-8 items-start max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="flex flex-col gap-4 lg:col-span-5 xl:col-span-4 xl:gap-5">
          {/* Image */}
          <div className="w-full">
            <img
              src={image || placeholderImage}
              alt={name}
              className="w-full rounded-2xl shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] object-cover aspect-4/3 xl:aspect-square border border-slate-200/50"
            />
          </div>

          {/* Owner/Finder Info */}
          <div className="rounded-2xl border border-indigo-200/70 bg-linear-to-br from-white to-violet-50/65 p-4 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] backdrop-blur-sm xl:p-5">
            <ItemInfo item={item} layoutMode="compact" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 w-full">
            {isOwner ? (
              <>
                <DeleteItemButton
                  itemId={_id}
                  itemName={name}
                  className="w-full bg-red-500 hover:bg-red-600 rounded-xl font-medium text-sm xl:text-base active:scale-95 transition-all px-5 py-2.5 h-10 xl:h-11 flex items-center justify-center shadow-sm hover:shadow-md"
                />
                <Button
                  className="w-full rounded-xl font-medium text-sm xl:text-base active:scale-95 transition-all px-5 py-2.5 h-10 xl:h-11 flex items-center justify-center bg-indigo-700 hover:bg-indigo-700 shadow-sm hover:shadow-md"
                  onClick={() => navigate(`/update/${_id}`)}
                >
                  Update
                </Button>
                {canResolve && (
                  <button
                    type="button"
                    onClick={() => setIsResolveModalOpen(true)}
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-medium text-emerald-800 transition-all active:scale-95 hover:bg-emerald-100 xl:h-11 xl:text-base"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Resolve Item
                  </button>
                )}
                <ShareButton name={name} className="w-full h-10 xl:h-11 justify-center" />
              </>
            ) : (
              <>
                <RequestButton
                  itemId={_id}
                  itemName={name}
                  status={status}
                  className="w-full rounded-xl font-medium text-sm xl:text-base active:scale-95 transition-all px-5 py-2.5 h-10 xl:h-11 flex items-center justify-center bg-indigo-700 hover:bg-indigo-700 shadow-sm hover:shadow-md"
                />
                <Button
                  type="button"
                  onClick={() => setIsReportModalOpen(true)}
                  className="flex h-10 w-full items-center justify-center rounded-xl border border-indigo-200 bg-white px-5 py-2.5 text-sm font-medium text-indigo-900 shadow-sm transition-all active:scale-95 hover:bg-violet-50 hover:shadow-md xl:h-11 xl:text-base"
                >
                  Report Item
                </Button>
                <ShareButton name={name} className="w-full h-10 xl:h-11 justify-center" />
              </>
            )}
          </div>

          <p className="text-center font-sans text-xs text-indigo-800/80">
            You'll get chat access once your request is accepted
          </p>
        </div>

        {/* Right Column */}
        <div className="rounded-2xl border border-indigo-200/70 bg-linear-to-br from-white to-violet-50/65 p-5 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] backdrop-blur-sm lg:col-span-7 xl:col-span-8 xl:p-6">
          <ItemInfo item={item} layoutMode="detailed" />
        </div>
      </div>

      {isReportModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4">
          <div className="w-full max-w-md rounded-2xl border border-indigo-200 bg-linear-to-br from-white to-violet-50/70 p-5 shadow-2xl">
            <h3 className="font-display text-xl font-bold text-indigo-950">
              Report This Item
            </h3>
            <p className="mt-1 text-sm text-indigo-800/80">
              Tell us what seems wrong. Admins will review this report.
            </p>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              rows={4}
              placeholder="Example: This item appears fraudulent or contains misleading details."
              className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-violet-100"
            />
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (isSubmittingReport) return;
                  setIsReportModalOpen(false);
                  setReportReason("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleReportItem}
                disabled={isSubmittingReport}
                className="bg-indigo-700 text-white hover:bg-indigo-700"
              >
                {isSubmittingReport ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {isResolveModalOpen && (
        <ResolveModal
          itemId={_id}
          itemName={name}
          onClose={() => setIsResolveModalOpen(false)}
          onResolved={() => navigate("/my-items")}
        />
      )}
    </div>
  );
};
