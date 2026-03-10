import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({
  open,
  onClose,
  title,
  children,
  subtitle,
  panelClassName = "",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  panelClassName?: string;
}) {
  React.useEffect(() => {
    if (!open) {
      return;
    }

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70]">
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
            aria-label="Close modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={[
                "relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_40px_120px_-45px_rgba(15,23,42,0.45)] dark:border-slate-800/80 dark:bg-slate-950/92 sm:p-7",
                panelClassName,
              ].join(" ")}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent" />

              <div className="relative mb-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {title ? (
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      {title}
                    </h3>
                  ) : null}
                  {subtitle ? (
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {subtitle}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/85 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800/80 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                >
                  X
                </button>
              </div>

              <div className="relative">{children}</div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
