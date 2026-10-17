"use client";

import type { IconName } from "@/components/ui";
import { Button, Icon, Link } from "@/components/ui";
import { cn } from "@/packages/utils/cn";
import { panel } from "./panel";
import type { WebDevForm } from "./useWebDevForm";

const IconTile = ({ name }: { name: IconName }) => (
  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
    <Icon name={name} size={22} />
  </span>
);

const tinted = "bg-linear-to-br from-primary/12 via-card/40 to-card/40";

/** "Estimated Timeline" — computed live from the selected options' `effort`. */
export const TimelineCard = ({ form }: { form: WebDevForm }) => {
  const { timeline: copy } = form.config;

  return (
    <section
      aria-label={copy.title}
      className={cn(panel, tinted, "flex gap-3.5 p-5")}
    >
      <IconTile name="calendar" />
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-foreground">{copy.title}</h2>
        <p
          aria-live="polite"
          className="mt-1 text-xl font-semibold text-foreground"
        >
          {form.timeline?.label ?? "—"}
        </p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          {form.timeline ? copy.note : copy.empty}
        </p>
      </div>
    </section>
  );
};

/** "Not sure what to choose?" → applies the config preset. */
export const RecommendCard = ({ form }: { form: WebDevForm }) => {
  const { recommendation: copy } = form.config;

  return (
    <section
      aria-label={copy.title}
      className={cn(panel, tinted, "flex gap-3.5 p-5")}
    >
      <IconTile name="sparkles" />
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-foreground">{copy.title}</h2>
        <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">
          {copy.description}
        </p>
        <Button
          className="mt-4 gap-2"
          onClick={form.applyPreset}
          size="md"
          variant="secondary"
        >
          {copy.action}
          <Icon name="arrow-right" size={16} />
        </Button>
      </div>
    </section>
  );
};

/** "Prefer to talk first?" */
export const TalkCard = ({ form }: { form: WebDevForm }) => {
  const { talk: copy } = form.config;

  return (
    <section aria-label={copy.title} className={cn(panel, "flex gap-3.5 p-5")}>
      <IconTile name="message-square" />
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-foreground">{copy.title}</h2>
        <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">
          {copy.description}
        </p>
        <Link
          className="mt-3 inline-flex items-center gap-1.5 text-sm"
          href={copy.href}
        >
          {copy.action}
          <Icon name="arrow-right" size={15} />
        </Link>
      </div>
    </section>
  );
};
