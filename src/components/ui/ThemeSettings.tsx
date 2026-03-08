import { useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../app/providers";
import { COLOR_PRESETS, FONT_OPTIONS } from "../../theme/theme";

function Swatch({
  color,
  active,
  onClick,
}: {
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative h-9 w-9 rounded-xl border transition active:scale-95",
        active
          ? "border-primary shadow-soft"
          : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700",
      ].join(" ")}
      style={{ background: color }}
      aria-label="color"
    >
      {active ? (
        <span className="absolute inset-0 rounded-xl ring-2 ring-white/70 dark:ring-slate-950/30" />
      ) : null}
    </button>
  );
}

export default function ThemeSettings() {
  const ctx = useContext(AppContext);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  if (!ctx) return null;

  const { brand, setPrimary, setSecondary, setFont, resetBrand } = ctx;

  const presets = useMemo(() => COLOR_PRESETS, []);

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 end-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-soft transition hover:brightness-110 active:scale-[0.98]"
        aria-label="settings"
        title="Theme settings"
      >
        ⚙️
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="close"
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="fixed top-0 end-0 z-50 h-full w-[340px] max-w-[92vw] border-slate-200 bg-white/90 p-5 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"
              initial={{ x: 360, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 360, opacity: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {t("themeSettings.title")}
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/60"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 space-y-6">
                <div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {t("themeSettings.primary")}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {presets.map((p) => (
                      <Swatch
                        key={"p-" + p.key}
                        color={p.primary}
                        active={brand.primary.toLowerCase() === p.primary.toLowerCase()}
                        onClick={() => setPrimary(p.primary)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {t("themeSettings.secondary")}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {presets.map((p) => (
                      <Swatch
                        key={"s-" + p.key}
                        color={p.secondary}
                        active={brand.secondary.toLowerCase() === p.secondary.toLowerCase()}
                        onClick={() => setSecondary(p.secondary)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {t("themeSettings.font")}
                  </div>
                  <div className="mt-2 grid gap-2">
                    {FONT_OPTIONS.map((f) => {
                      const active = brand.font === f.name;
                      return (
                        <button
                          key={f.key}
                          type="button"
                          onClick={() => setFont(f.name)}
                          className={[
                            "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                            active
                              ? "border-primary bg-primary/10 text-slate-900 dark:text-white"
                              : "border-slate-200 bg-white/60 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/60",
                          ].join(" ")}
                          style={{ fontFamily: `"${f.name}", var(--font-sans)` }}
                        >
                          <span>{f.name}</span>
                          {active ? <span className="text-primary">●</span> : <span className="text-slate-400">○</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={resetBrand}
                    className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/30 dark:text-white dark:hover:bg-slate-900/60"
                  >
                    {t("themeSettings.reset", "Reset")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-extrabold text-white shadow-soft hover:brightness-110"
                  >
                    {t("themeSettings.done", "Done")}
                  </button>
                </div>

                <div className="text-xs leading-relaxed text-slate-500 dark:text-slate-300">
                  {t("themeSettings.tip")}
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
