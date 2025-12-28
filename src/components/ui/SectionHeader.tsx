export default function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
      {subtitle ? (
        <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
