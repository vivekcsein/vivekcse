import MarqueePanel from "@/app/dev/panels/MarqueePanel";
import CtaSection from "./sections/CtaSection";
import FeaturedArticleHome from "./sections/FeaturedArticleHome";
import { Hero } from "./sections/Hero";
import Journey from "./sections/Journey";
import Metrics from "./sections/Metrics";
import ProjectsSection from "./sections/ProjectsSection";
import Showcase from "./sections/Showcase";
import TechStack from "./sections/TechStack";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedArticleHome />
      <TechStack />
      <ProjectsSection />
      <Metrics />
      <Journey />
      <Showcase />
      <CtaSection />
      <MarqueePanel />
    </>
  );
}
