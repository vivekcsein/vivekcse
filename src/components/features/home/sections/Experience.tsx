"use client";

import { useRef } from "react";
import { Icon, type IconName } from "@/components/ui";
import { siteConfig } from "@/packages/configs/site.config";
import { useExperienceAnimation } from "@/packages/gsap/useExperienceAnimation";

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useExperienceAnimation({
    scope: sectionRef,
  });
  const { about } = siteConfig;

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2"
    >
      <div className="flex flex-col gap-5">
        {about.stats.slice(0, 3).map((stat) => (
          <ExperienceItem key={stat.label} {...stat} />
        ))}
      </div>

      <div className="flex flex-col gap-5">
        {about.stats.slice(3).map((stat) => (
          <ExperienceItem key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
};

interface ExperienceItemProps {
  icon: string;
  label: string;
  value: string;
}

const ExperienceItem = ({ icon, label, value }: ExperienceItemProps) => {
  return (
    <div className="experience-item group flex items-start gap-3">
      <div
        className="
          experience-icon
          flex
          size-10
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-primary/10
          bg-primary/10
          text-primary
          transition-colors
          duration-200
          group-hover:border-primary/20
          group-hover:bg-primary/15
        "
      >
        <Icon name={icon as IconName} className="size-4.5" />
      </div>

      <div className="min-w-0 pt-0.5">
        <p className="text-sm font-semibold leading-5 text-primary">{label}</p>

        <p className="mt-0.5 text-sm leading-5 text-foreground/90">{value}</p>
      </div>
    </div>
  );
};

export default Experience;
