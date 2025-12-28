import React from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        className="absolute inset-0 bg-black/40"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div className="relative mx-auto mt-20 w-[92%] max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title ? <h3 className="text-lg font-extrabold">{title}</h3> : null}
          </div>
          <button
            onClick={onClose}
            className="rounded-xl px-3 py-1 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
