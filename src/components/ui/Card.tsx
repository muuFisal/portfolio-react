import React from "react";
import { clsx } from "clsx";

export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900/40",
        className
      )}
    >
      {children}
    </div>
  );
}
