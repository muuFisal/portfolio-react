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

export default function Home() {
  return (
    <>
      <Seo pageKey="home" canonicalPath="/" />
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
