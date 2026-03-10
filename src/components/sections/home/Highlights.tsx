import { useHomeHighlightsQuery } from "../../../app/api/resources";
import { getIconNode } from "../../../utils/icon-map";
import Container from "../../layout/Container";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import MotionSection from "../../ui/MotionSection";
import SectionHeader from "../../ui/SectionHeader";

export default function Highlights() {
  const { data, loading, error, refetch } = useHomeHighlightsQuery();
  const items = data?.items || [];

  return (
    <MotionSection className="py-14">
      <Container>
        <SectionHeader
          title={data?.title || "Highlights"}
          subtitle={data?.subtitle || data?.description || ""}
        />

        {error ? (
          <Card className="mb-5 p-5">
            <div className="font-extrabold">Unable to load highlights</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{error.message}</p>
            <div className="mt-4">
              <Button onClick={refetch} variant="secondary">
                Retry
              </Button>
            </div>
          </Card>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="p-5">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-4 h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-2 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </Card>
              ))
            : items.map((item) => (
                <Card key={item.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-lg text-primary">
                      {getIconNode(item.icon)}
                    </div>
                    {item.value != null ? (
                      <div className="text-xl font-black text-slate-900 dark:text-white">
                        {item.value}
                        {item.unit || ""}
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-4 text-lg font-extrabold">{item.title}</div>
                  {item.description ? (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  ) : null}
                </Card>
              ))}
        </div>

        {!loading && !items.length && !error ? (
          <Card className="mt-5 p-5 text-sm text-slate-600 dark:text-slate-300">
            No highlights are available yet.
          </Card>
        ) : null}
      </Container>
    </MotionSection>
  );
}
