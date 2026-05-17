import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/logo";

export const AuthShell = ({ title, subtitle, children, bottomNote }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#f5f3ff_0%,#eef2ff_33%,#f8fafc_72%,#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-20 top-14 h-64 w-64 rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-14 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-44 w-44 rounded-full bg-amber-200/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center">
        <div className="grid w-full items-stretch gap-6 lg:grid-cols-[1.08fr_1fr]">
          <section className="hidden rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-[0_30px_100px_-60px_rgba(67,56,202,0.55)] backdrop-blur lg:flex lg:flex-col lg:justify-between">
            <div>
              <Link to="/" className="inline-flex items-center">
                <Logo className="h-11 w-auto" />
              </Link>
              <h1 className="mt-9 max-w-lg text-4xl font-display font-bold leading-tight text-slate-900 xl:text-5xl">
                Find what matters. Faster.
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">
                Secure verification, trusted messaging, and smoother handovers in one experience.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-white/85 px-4 py-3">
                <ShieldCheck className="h-5 w-5 text-indigo-700" />
                <p className="text-sm font-medium text-slate-700">Protected sessions and verified account flow</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-white/85 px-4 py-3">
                <Sparkles className="h-5 w-5 text-indigo-700" />
                <p className="text-sm font-medium text-slate-700">Designed for speed on mobile and desktop</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-white/85 px-4 py-3">
                <CheckCircle2 className="h-5 w-5 text-indigo-700" />
                <p className="text-sm font-medium text-slate-700">Built for real-world reunions and trust</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_35px_110px_-70px_rgba(30,41,59,0.7)] backdrop-blur sm:p-8 lg:p-10">
            <div className="mb-8">
              <Link to="/" className="mb-6 inline-flex items-center lg:hidden">
                <Logo className="h-11 w-auto" />
              </Link>
              <h2 className="text-3xl font-display font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
              {subtitle ? <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{subtitle}</p> : null}
            </div>

            {children}

            {bottomNote ? <p className="mt-7 text-center text-xs text-slate-500 sm:text-sm">{bottomNote}</p> : null}
          </section>
        </div>
      </div>
    </div>
  );
};
