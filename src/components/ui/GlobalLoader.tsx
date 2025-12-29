import { motion, AnimatePresence } from "framer-motion";
import { useApiLoading } from "../../app/api/loading";

export default function GlobalLoader() {
  const { loadingCount } = useApiLoading();
  const open = loadingCount > 0;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-white/40 backdrop-blur-sm dark:bg-slate-950/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-4">
            {/* Spinner */}
            <motion.div
              aria-label="Loading"
              className="relative h-16 w-16"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-slate-200/70 dark:border-slate-800/70" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary/90" />
            </motion.div>

            {/* Dots */}
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-slate-900/70 dark:bg-white/70"
                  initial={{ opacity: 0.2, y: 0 }}
                  animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
                />
              ))}
            </div>

            <div className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
              Loading…
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
