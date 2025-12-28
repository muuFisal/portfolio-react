import { motion } from "framer-motion";
import { useMemo } from "react";

type Tag = {
  text: string;
  top: string;
  left: string;
  size: "sm" | "md" | "lg";
  rotate: number;
  delay: number;
  duration: number;
  colorClass: string;
};

const TAGS = [
  "HTML",
  "CSS",
  "JS",
  "TS",
  "React",
  "Next",
  "Tailwind",
  "Node",
  "API",
  "Laravel",
  "Livewire",
  "Inertia",
  "Redis",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "CI/CD",
  "Webhooks",
  "Payments",
  "Wallet",
  "Queues",
  "Events",
  "i18n",
  "RTL",
  "OAuth",
  "JWT",
  "SSE",
  "Sockets",
  "S3",
  "Nginx",
  "IIS",
  "Testing",
];

const COLORS = [
  "text-sky-600 border-sky-400/30 bg-sky-400/10 dark:text-sky-300 dark:border-sky-400/20 dark:bg-sky-400/10",
  "text-emerald-600 border-emerald-400/30 bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/20 dark:bg-emerald-400/10",
  "text-violet-600 border-violet-400/30 bg-violet-400/10 dark:text-violet-300 dark:border-violet-400/20 dark:bg-violet-400/10",
  "text-amber-700 border-amber-400/30 bg-amber-400/10 dark:text-amber-200 dark:border-amber-400/20 dark:bg-amber-400/10",
  "text-rose-600 border-rose-400/30 bg-rose-400/10 dark:text-rose-300 dark:border-rose-400/20 dark:bg-rose-400/10",
  "text-teal-700 border-teal-400/30 bg-teal-400/10 dark:text-teal-200 dark:border-teal-400/20 dark:bg-teal-400/10",
  "text-indigo-700 border-indigo-400/30 bg-indigo-400/10 dark:text-indigo-200 dark:border-indigo-400/20 dark:bg-indigo-400/10",
  "text-fuchsia-700 border-fuchsia-400/30 bg-fuchsia-400/10 dark:text-fuchsia-200 dark:border-fuchsia-400/20 dark:bg-fuchsia-400/10",
];

function pick<T>(arr: T[], i: number) {
  return arr[i % arr.length];
}

export default function AnimatedBackdrop({
  className = "",
  intensity = "normal",
}: {
  className?: string;
  intensity?: "low" | "normal" | "high";
}) {
  const tags = useMemo<Tag[]>(() => {
    const count = intensity === "high" ? 22 : intensity === "low" ? 10 : 16;

    return Array.from({ length: count }).map((_, i) => {
      const top = `${6 + (i * 86) % 84}%`;
      const left = `${4 + (i * 63) % 92}%`;
      const size: Tag["size"] =
        i % 8 === 0 ? "lg" : i % 3 === 0 ? "md" : "sm";
      const rotate = (i * 17) % 26 - 13;
      const delay = (i * 0.13) % 1.4;
      const duration = 4.5 + (i % 7) * 0.6;

      return {
        text: pick(TAGS, i * 2 + 3),
        top,
        left,
        size,
        rotate,
        delay,
        duration,
        colorClass: pick(COLORS, i),
      };
    });
  }, [intensity]);

  const dotsCount = intensity === "high" ? 18 : intensity === "low" ? 6 : 10;

  return (
    <div className={"pointer-events-none absolute inset-0 overflow-hidden " + className}>
      {/* soft glows */}
      <div className="absolute inset-0 opacity-35">
        <div className="absolute -left-28 top-12 h-72 w-72 rounded-full bg-slate-200 blur-3xl dark:bg-slate-800" />
        <div className="absolute -right-28 top-40 h-72 w-72 rounded-full bg-slate-200 blur-3xl dark:bg-slate-800" />
        <div className="absolute left-1/2 top-[-120px] h-72 w-72 -translate-x-1/2 rounded-full bg-slate-200 blur-3xl dark:bg-slate-800" />
      </div>

      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 52%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 52%, transparent 78%)",
        }}
      />

      {/* floating tags */}
      {tags.map((tag, i) => {
        const pad =
          tag.size === "lg"
            ? "px-4 py-2 text-sm"
            : tag.size === "md"
              ? "px-3 py-1.5 text-xs"
              : "px-2.5 py-1 text-[11px]";
        return (
          <motion.div
            key={i}
            className={[
              "absolute select-none rounded-full border font-extrabold tracking-tight shadow-sm",
              "backdrop-blur",
              pad,
              tag.colorClass,
            ].join(" ")}
            style={{
              top: tag.top,
              left: tag.left,
              transform: `rotate(${tag.rotate}deg)`,
            }}
            animate={{
              y: [0, -14, 0],
              x: [0, 10, 0],
              opacity: [0.55, 0.95, 0.65],
            }}
            transition={{
              duration: tag.duration,
              delay: tag.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {tag.text}
          </motion.div>
        );
      })}

      {/* tiny drifting dots */}
      {Array.from({ length: dotsCount }).map((_, i) => (
        <motion.span
          key={"dot-" + i}
          className="absolute h-1.5 w-1.5 rounded-full bg-slate-300/70 dark:bg-slate-700/70"
          style={{
            top: `${(i * 53) % 100}%`,
            left: `${(i * 31) % 100}%`,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.8, 0.35] }}
          transition={{
            duration: 3.2 + (i % 6) * 0.45,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i * 0.12) % 1.2,
          }}
        />
      ))}
    </div>
  );
}
