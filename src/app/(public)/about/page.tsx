import type { Metadata } from "next";
import About from "@/components/features/home/sections/About";
import { FaqAccordion } from "@/components/features/home/sections/Faqs";
import Journey from "@/components/features/home/sections/Journey";
import PageHero from "@/components/layouts/PageHero";
import { siteConfig } from "@/packages/configs/site.config";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.about.description,
};

const AboutPage = () => {
  return (
    <PageHero
      badge="About"
      title="About Me"
      description={siteConfig.about.description}
    >
      <About />
      <Journey />
      <FaqAccordion />
    </PageHero>
  );
};

export default AboutPage;
