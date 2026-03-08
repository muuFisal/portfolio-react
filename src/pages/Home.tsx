import Hero from "../components/sections/home/Hero";
import Highlights from "../components/sections/home/Highlights";
import FeaturedProjects from "../components/sections/home/FeaturedProjects";
import SkillsShowcase from "../components/sections/home/SkillsShowcase";
import Testimonials from "../components/sections/home/Testimonials";
import CTA from "../components/sections/home/CTA";
import ExpertiseStrip from "../components/sections/home/ExpertiseStrip";
import ProcessSection from "../components/sections/home/ProcessSection";
import OpenSourceSpotlight from "../components/sections/home/OpenSourceSpotlight";
import Seo from "../components/ui/Seo";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Seo
        title={t("home.seoTitle", { defaultValue: "Mohamed Fisal | Senior Backend Engineer & Laravel Architect" })}
        description={t("home.seoDesc", { defaultValue: "Senior Backend Engineer specialized in Laravel, React, ERP, CRM, payments, wallets, webhooks, and multilingual product systems." })}
        canonicalPath="/"
      />
      <Hero />
      <ExpertiseStrip />
      <Highlights />
      <FeaturedProjects />
      <ProcessSection />
      <SkillsShowcase />
      <OpenSourceSpotlight />
      <Testimonials />
      <CTA />
    </>
  );
}
