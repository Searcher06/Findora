export const Overlay = ({ onClick }) => {
  return (
    <button
      type="button"
      aria-label="Close menu overlay"
      onClick={onClick}
      className="fixed inset-0 z-20 bg-slate-900/45 backdrop-blur-[2px] md:hidden"
    />
  );
};
