"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { RevealGroup } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { projectCategories, projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectsShowcase({
  limit,
  filterable = false,
  showCta = true,
}: {
  limit?: number;
  filterable?: boolean;
  showCta?: boolean;
}) {
  const [filter, setFilter] = useState<string>("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);
  const list = limit ? filtered.slice(0, limit) : filtered;

  return (
    <Section id="projects">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Delivery"
          title="Capability, described honestly"
          lead="These are the deployment patterns we design and build. As client work is completed and permission granted, each becomes a full case study with site photography and measured outcomes."
        />
        {showCta ? (
          <ButtonLink href="/projects" variant="outline" className="shrink-0">
            All work
            <ArrowRight size={16} />
          </ButtonLink>
        ) : null}
      </div>

      {filterable ? (
        <div className="mt-10 flex flex-wrap gap-2">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.8125rem] transition-all duration-300",
                filter === category
                  ? "border-signal/45 bg-signal/12 text-signal-300"
                  : "border-white/10 bg-white/[0.02] text-ink-muted hover:border-white/20 hover:text-ink",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}

      <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </RevealGroup>
    </Section>
  );
}
