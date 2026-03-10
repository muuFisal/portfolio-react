import Button from "./Button";

type Props = {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

function getVisiblePages(page: number, lastPage: number) {
  const start = Math.max(1, page - 1);
  const end = Math.min(lastPage, page + 1);
  const pages = [];

  for (let current = start; current <= end; current += 1) {
    pages.push(current);
  }

  if (!pages.includes(1)) {
    pages.unshift(1);
  }
  if (!pages.includes(lastPage)) {
    pages.push(lastPage);
  }

  return Array.from(new Set(pages));
}

export default function Pagination({ page, lastPage, onPageChange }: Props) {
  if (lastPage <= 1) {
    return null;
  }

  const pages = getVisiblePages(page, lastPage);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="secondary"
        className="px-4 py-2"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>

      {pages.map((currentPage) => (
        <button
          key={currentPage}
          type="button"
          onClick={() => onPageChange(currentPage)}
          className={[
            "min-w-10 rounded-xl border px-3 py-2 text-sm font-bold transition",
            currentPage === page
              ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-950"
              : "border-slate-200 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900/60",
          ].join(" ")}
        >
          {currentPage}
        </button>
      ))}

      <Button
        variant="secondary"
        className="px-4 py-2"
        disabled={page >= lastPage}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
