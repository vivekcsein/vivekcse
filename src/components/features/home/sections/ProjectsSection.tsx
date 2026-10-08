"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui";
import Reveal from "@/components/ui/reveal/Reveal";
import projects from "@/packages/configs/projects.config";
import { getTopProjects } from "@/packages/utils/projects";

const ProjectsSection = () => {
  return (
    <section id="projects" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Reveal>
            <span className="text-xs font-medium tracking-wide text-primary uppercase">
              {projects.eyebrow}
            </span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              {projects.title}
            </h2>
          </Reveal>

          <Link
            href={projects.cta.href}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            {projects.cta.label} →
          </Link>
        </div>

        <Reveal group className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {getTopProjects(3).map((project) => (
            <Card key={project.title} variant="interactive-glow">
              <Link
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-lg"
              >
                <div className="relative flex aspect-video items-center justify-center bg-linear-to-br from-primary/20 via-muted to-fuchsia-400/10">
                  {project.coverImage && (
                    <Image
                      id={`showcase-item-${project.title}`}
                      src={project.coverImage}
                      alt={project.title}
                      width={1024}
                      height={768}
                    />
                  )}
                  <ExternalLink className="size-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {project?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default ProjectsSection;
