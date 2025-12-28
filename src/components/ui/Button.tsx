import React from "react";
import { clsx } from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  className,
  variant = "primary",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none";

  const variants: Record<NonNullable<Props["variant"]>, string> = {
    primary:
      "bg-primary text-white shadow-soft hover:brightness-110 dark:hover:brightness-110",
    secondary:
      "bg-secondary text-white shadow-soft hover:brightness-110 dark:hover:brightness-110",
    ghost:
      "border border-slate-200 bg-white/70 text-slate-900 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/30 dark:text-white dark:hover:bg-slate-900/60",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props} />
  );
}
