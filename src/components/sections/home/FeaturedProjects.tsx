import Container from "../../layout/Container";
import Card from "../../ui/Card";
import SectionHeader from "../../ui/SectionHeader";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import MotionSection from "../../ui/MotionSection";
import { projects } from "../../../data/projects";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <MotionSection className="py-14">
      <Container>
        <SectionHeader
          title={t("home.featured.title")}
          subtitle={t("home.featured.subtitle")}
        />

        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <Card className="group overflow-hidden p-0">
                <div className="relative">
                  <img
                    src={p.image || "/projects/ecommerce-react.svg"}
                    alt={t(p.titleKey)}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute start-3 top-3">
                    <Badge>{p.category}</Badge>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-lg font-extrabold">{t(p.titleKey)}</div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                    {t(p.descKey)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link to="/projects">
            <Button className="px-6 py-2.5">{t("home.featured.cta")}</Button>
          </Link>
        </div>
      </Container>
    </MotionSection>
  );
}
