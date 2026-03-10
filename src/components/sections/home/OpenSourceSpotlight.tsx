import { useHomeOpenSourceQuery } from "../../../app/api/resources";
import Container from "../../layout/Container";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import MotionSection from "../../ui/MotionSection";

export default function OpenSourceSpotlight() {
  const { data, loading, error, refetch } = useHomeOpenSourceQuery();
  const items = data?.items || [];

  return (
    <MotionSection className="py-16">
      <Container>
        <Card className="overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[0.95fr,1.05fr]">
            <div className="bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 p-8 sm:p-10">
              <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-extrabold text-primary">
                {data?.title || "Open Source"}
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {data?.subtitle || "Public work and reusable patterns"}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                {data?.description || data?.content.description || ""}
              </p>

              {error ? (
                <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-200">
                  <div>{error.message}</div>
                  <div className="mt-3">
                    <Button onClick={refetch} variant="secondary">
                      Retry
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="p-8 sm:p-10">
              <div className="grid gap-4 sm:grid-cols-2">
                {loading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/30"
                      >
                        <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      </div>
                    ))
                  : items.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-slate-200 bg-white/70 p-4 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/30 dark:hover:border-slate-700"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="font-extrabold">{item.name}</div>
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                            {item.language}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                          {item.description}
                        </div>
                        <div className="mt-4 text-xs font-bold text-primary">★ {item.stars}</div>
                      </a>
                    ))}
              </div>

              {!loading && !items.length && !error ? (
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-300">
                  No open source projects are published yet.
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      </Container>
    </MotionSection>
  );
}
