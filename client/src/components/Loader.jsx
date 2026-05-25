export const Loader = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-linear-to-b from-slate-50 to-white px-6 py-safe">
      {/* Glow blobs — decorative, pointer-events off */}
      <div className="pointer-events-none fixed -left-24 top-1/4 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl sm:h-80 sm:w-80" />
      <div className="pointer-events-none fixed -right-24 bottom-1/4 h-64 w-64 rounded-full bg-indigo-200/20 blur-3xl sm:h-80 sm:w-80" />

      <div className="relative flex flex-col items-center gap-8 sm:gap-10">
        {/* Logo */}
        <img
          src="/iconplusfindoratext.png"
          alt="Findora"
          className="h-9 w-auto sm:h-11"
          draggable={false}
        />

        {/* Spinner */}
        <div className="relative h-14 w-14 sm:h-16 sm:w-16">
          {/* Outer track */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
          {/* Spinning arc */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-l-indigo-500 border-t-indigo-500" />
          {/* Centre dot */}
          <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500" />
        </div>

        {/* Label */}
        <p className="text-center text-sm font-medium text-slate-500 sm:text-base">
          Loading your secure environment…
        </p>
      </div>
    </div>
  );
};
