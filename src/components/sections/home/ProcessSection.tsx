import { useHomeProcessQuery } from "../../../app/api/resources";
import Container from "../../layout/Container";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import MotionSection from "../../ui/MotionSection";
import SectionHeader from "../../ui/SectionHeader";

export default function ProcessSection() {
  const { data, loading, error, refetch } = useHomeProcessQuery();
  const steps = data?.items || [];

  return (
    <MotionSection className="py-16">
      <Container>
        <SectionHeader
          title={data?.title || "How I work"}
          subtitle={data?.subtitle || data?.description || ""}
        />

        {error ? (
          <Card className="mb-5 p-5">
            <div className="font-extrabold">Unable to load the process section</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{error.message}</p>
            <div className="mt-4">
              <Button onClick={refetch} variant="secondary">
                Retry
              </Button>
            </div>
          </Card>
        ) : null}

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="p-6">
                  <div className="h-4 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-3 h-6 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </Card>
              ))
            : steps.map((step) => (
                <Card key={step.step} className="p-6">
                  <div className="text-sm font-extrabold text-primary">{step.step}</div>
                  <h3 className="mt-3 text-xl font-extrabold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </Card>
              ))}
        </div>

        {!loading && !steps.length && !error ? (
          <Card className="mt-5 p-5 text-sm text-slate-600 dark:text-slate-300">
            Process steps are not available yet.
          </Card>
        ) : null}
      </Container>
    </MotionSection>
  );
}
