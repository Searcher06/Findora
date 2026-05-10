import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export const AuthShell = ({ title, subtitle, children, bottomNote }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-violet-50 to-emerald-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-16 top-20 h-56 w-56 rounded-full bg-violet-300/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-16 h-56 w-56 rounded-full bg-emerald-300/35 blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 top-1/4 h-40 w-40 rounded-full bg-amber-300/25 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center">
        <div className="grid w-full items-stretch gap-6 lg:grid-cols-[1.05fr_1fr]">
          <section className="hidden rounded-3xl border border-white/70 bg-white/70 p-8 backdrop-blur lg:flex lg:flex-col lg:justify-between">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-lg font-display font-bold text-slate-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-sm text-white">F</span>
                Findora
              </Link>
              <h1 className="mt-8 text-4xl font-display font-bold leading-tight text-slate-900">Find what matters. Faster.</h1>
              <p className="mt-4 max-w-md text-base text-slate-600">
                Secure verification, trusted messaging, and smoother handovers in one experience.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-slate-900/5 px-4 py-3">
                <ShieldCheck className="h-5 w-5 text-slate-700" />
                <p className="text-sm text-slate-700">Protected sessions and verified account flow</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-900/5 px-4 py-3">
                <Sparkles className="h-5 w-5 text-slate-700" />
                <p className="text-sm text-slate-700">Designed for speed on mobile and desktop</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-900/5 px-4 py-3">
                <CheckCircle2 className="h-5 w-5 text-slate-700" />
                <p className="text-sm text-slate-700">Built for real-world reunions and trust</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_20px_70px_-40px_rgba(2,132,199,0.45)] sm:p-8 lg:p-10">
            <div className="mb-8">
              <Link to="/" className="mb-6 inline-flex items-center gap-2 text-base font-display font-bold text-slate-900 lg:hidden">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-sm text-white">F</span>
                Findora
              </Link>
              <h2 className="text-3xl font-display font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
              {subtitle ? <p className="mt-2 text-sm text-slate-600 sm:text-base">{subtitle}</p> : null}
            </div>

            {children}

            {bottomNote ? <p className="mt-6 text-center text-xs text-slate-500 sm:text-sm">{bottomNote}</p> : null}
          </section>
        </div>
      </div>
    </div>
  );
};
