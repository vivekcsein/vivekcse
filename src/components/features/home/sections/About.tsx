"use client";

import ImageComponent from "@/components/ui/images/ImageComponent";
import Reveal from "@/components/ui/reveal/Reveal";
import appConfig from "@/packages/configs/app.config";
import { siteConfig } from "@/packages/configs/site.config";
import Experience from "./Experience";

const About = () => {
  const { about } = siteConfig;

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal
          direction="left"
          className="w-full max-w-sm aspect-square mx-auto lg:mx-0"
        >
          <ImageComponent
            src={appConfig.author.avatar}
            id={"vivekcsein official avatar"}
            alt={"vivekcsein official avatar"}
            width={512}
            height={512}
            className="rounded-2xl"
            loading="eager"
          />
        </Reveal>

        <Reveal direction="right" group className="flex flex-col gap-6">
          <span className="text-xs font-medium tracking-wide text-primary uppercase">
            {about.eyebrow}
          </span>

          <h2 className="text-3xl leading-tight font-bold text-balance sm:text-4xl">
            {about.heading[0]}{" "}
            <span className="text-primary">{about.heading[1]}</span>
          </h2>

          <Experience />
        </Reveal>
      </div>
    </section>
  );
};

export default About;
