import { useTranslation } from "react-i18next";
import Container from "../../layout/Container";
import MotionSection from "../../ui/MotionSection";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

export default function OpenSourceSpotlight() {
  const { t } = useTranslation();

  return (
    <MotionSection className="py-16">
      <Container>
        <Card className="overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 p-8 sm:p-10">
              <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-extrabold text-primary">
                {t("home.opensource.badge", { defaultValue: "Open Source" })}
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                fisal/laravel-otp
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                {t("home.opensource.desc", { defaultValue: "A reusable Laravel package for OTP generation and verification with multiple Laravel versions support, cleaner integration, and safer limits handling." })}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://packagist.org/packages/fisal/laravel-otp" target="_blank" rel="noreferrer">
                  <Button>{t("home.opensource.packagist", { defaultValue: "View on Packagist" })}</Button>
                </a>
                <a href="https://github.com/muuFisal" target="_blank" rel="noreferrer">
                  <Button variant="ghost">{t("home.opensource.github", { defaultValue: "GitHub Profile" })}</Button>
                </a>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [t("home.opensource.i1t", "Laravel 9–12"), t("home.opensource.i1d", "Wide compatibility for modern apps")],
                  [t("home.opensource.i2t", "Attempts limiting"), t("home.opensource.i2d", "Safer OTP workflows with abuse control")],
                  [t("home.opensource.i3t", "Drop-in integration"), t("home.opensource.i3d", "Easy adoption across auth and recovery flows")],
                  [t("home.opensource.i4t", "Production mindset"), t("home.opensource.i4d", "Built from real project needs, not demos")],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/30">
                    <div className="font-extrabold">{title}</div>
                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </MotionSection>
  );
}
