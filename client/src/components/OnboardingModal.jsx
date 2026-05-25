import { useState, useEffect } from "react";
import { Package, MessageSquare, ShieldCheck, ArrowRight, X, Sparkles } from "lucide-react";

const STORAGE_KEY = "findora_onboarded";

const STEPS = [
  {
    icon: Package,
    accent: "indigo",
    badge: "Step 1 of 3",
    title: "Report It",
    subtitle: "Lost or found — post it in seconds",
    bullets: [
      "Lost something? Describe it, add a photo, and post it.",
      "Found something? Report it so the owner can reach you.",
      "Every report is visible to the whole campus community.",
    ],
    bg: "from-indigo-50 to-violet-50/60",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-700",
    dot: "bg-indigo-600",
  },
  {
    icon: MessageSquare,
    accent: "violet",
    badge: "Step 2 of 3",
    title: "Connect & Chat",
    subtitle: "Verified requests, direct conversations",
    bullets: [
      "Browse items and submit a claim request.",
      "The finder reviews and accepts — no strangers, just verified users.",
      "Chat opens instantly once the request is accepted.",
    ],
    bg: "from-violet-50 to-purple-50/60",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
    dot: "bg-violet-600",
  },
  {
    icon: ShieldCheck,
    accent: "emerald",
    badge: "Step 3 of 3",
    title: "Verify & Handover",
    subtitle: "Safe, confirmed item returns",
    bullets: [
      "When you meet, both sides exchange secret handover codes.",
      "Codes verified → item officially returned.",
      "Earn trust points and climb the campus leaderboard.",
    ],
    bg: "from-emerald-50 to-teal-50/60",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    dot: "bg-emerald-600",
  },
];

export function OnboardingModal() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Small delay so page renders first
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
      setExiting(false);
    }, 250);
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else dismiss();
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  if (!visible) return null;

  const current = STEPS[step];
  const Icon = current.icon;
  const isLast = step === STEPS.length - 1;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-opacity duration-250 ${exiting ? "opacity-0" : "opacity-100"}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={dismiss} />

      {/* Card */}
      <div className={`relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl transition-all duration-250 ${exiting ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}>

        {/* Close */}
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100"
          aria-label="Skip onboarding"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Coloured hero band */}
        <div className={`relative bg-linear-to-br ${current.bg} px-6 pb-8 pt-7`}>
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/30 blur-2xl" />
          <div className="pointer-events-none absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-white/20 blur-xl" />

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-600">
            <Sparkles className="h-3 w-3 text-violet-500" />
            {current.badge}
          </span>

          {/* Icon */}
          <div className={`mt-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${current.iconBg} shadow-sm`}>
            <Icon className={`h-7 w-7 ${current.iconColor}`} />
          </div>

          {/* Title */}
          <h2 className="mt-4 font-display text-2xl font-bold text-slate-900">{current.title}</h2>
          <p className="mt-1 text-sm text-slate-600">{current.subtitle}</p>
        </div>

        {/* Bullets */}
        <div className="px-6 py-5">
          <ul className="space-y-3">
            {current.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${current.dot}`} />
                <p className="text-sm text-slate-700">{b}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                className={`h-2 rounded-full transition-all ${i === step ? `w-6 ${current.dot}` : "w-2 bg-slate-200"}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={prev}
                className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={next}
              className={`inline-flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white transition active:scale-95 ${
                isLast ? "bg-emerald-600 hover:bg-emerald-700" : "bg-indigo-700 hover:bg-indigo-800"
              }`}
            >
              {isLast ? "Let's go!" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-open helper — call this from the sidebar "How it works" link
export function resetOnboarding() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}
