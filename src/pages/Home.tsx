import Hero from "../components/sections/home/Hero";
import Highlights from "../components/sections/home/Highlights";
import FeaturedProjects from "../components/sections/home/FeaturedProjects";
import SkillsShowcase from "../components/sections/home/SkillsShowcase";
import Testimonials from "../components/sections/home/Testimonials";
import CTA from "../components/sections/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <FeaturedProjects />
      <SkillsShowcase />
      <Testimonials />
      <CTA />
    </>
  );
}
