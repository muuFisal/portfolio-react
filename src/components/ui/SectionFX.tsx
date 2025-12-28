import { motion } from "framer-motion";

/**
 * Lightweight decorative FX that makes sections feel "alive".
 * Uses CSS variables provided by ThemeProvider:
 * --primary, --secondary
 */
export default function SectionFX({
  className = "",
  density = 1,
}: {
  className?: string;
  density?: 1 | 2 | 3;
}) {
  const dots = density === 3 ? 18 : density === 2 ? 12 : 8;
  const tags = density === 3 ? 7 : density === 2 ? 5 : 4;

  const TAGS = ["HTML", "CSS", "JS", "TS", "React", "API", "SQL", "JWT", "CI/CD", "UX"];

  return (
    <div className={"pointer-events-none absolute inset-0 overflow-hidden " + className} aria-hidden>
      {/* soft gradients */}
      <motion.div
        className="absolute -top-24 -end-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)" }}
        animate={{ x: [0, -16, 0], y: [0, 10, 0], opacity: [0.22, 0.35, 0.26] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -start-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle at center, color-mix(in oklab, var(--secondary) 55%, transparent), transparent 70%)" }}
        animate={{ x: [0, 14, 0], y: [0, -12, 0], opacity: [0.18, 0.32, 0.22] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      {/* floating tags */}
      {Array.from({ length: tags }).map((_, i) => {
        const top = `${8 + (i * 17) % 78}%`;
        const left = `${6 + (i * 23) % 88}%`;
        const txt = TAGS[(i * 3) % TAGS.length];

        return (
          <motion.div
            key={i}
            className="absolute select-none rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur"
            style={{
              top,
              left,
              borderColor: "color-mix(in oklab, var(--primary) 30%, transparent)",
              color: "color-mix(in oklab, var(--primary) 55%, black)",
              background:
                "color-mix(in oklab, var(--primary) 10%, transparent)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: [0.0, 0.65, 0.35, 0.65],
              y: [0, -10, 0],
              x: [0, (i % 2 ? 10 : -10), 0],
            }}
            transition={{
              duration: 6 + (i % 3) * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
          >
            {txt}
          </motion.div>
        );
      })}

      {/* drifting dots */}
      {Array.from({ length: dots }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            top: `${(i * 11) % 100}%`,
            left: `${(i * 19) % 100}%`,
            background: i % 2 ? "var(--primary)" : "var(--secondary)",
            opacity: 0.14,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.08, 0.22, 0.1] }}
          transition={{
            duration: 3.2 + (i % 6) * 0.55,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i * 0.12) % 1.2,
          }}
        />
      ))}
    </div>
  );
}
