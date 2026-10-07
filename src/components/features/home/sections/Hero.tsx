// import { ClientModelViewer } from "@/components/features/models/ClientModelViewer";
import { Icon, type IconName, Link } from "@/components/ui";
import appConfig from "@/packages/configs/app.config";
import {
  type HeadlineSegment,
  type SocialKey,
  siteConfig,
} from "@/packages/configs/site.config";
import { cn } from "@/packages/utils/cn";
import Hero3D from "./Hero3D";

const { main } = siteConfig.hero;

type SocialLink = {
  key: SocialKey;
  label: string;
  icon: IconName;
  href: string;
};

/** Icon + URL per social key. URLs come from env via app.config (not duplicated here). */
const SOCIALS: Record<SocialKey, SocialLink> = {
  github: {
    key: "github",
    label: "GitHub",
    icon: "github",
    href: appConfig.social.github.handle,
  },
  linkedin: {
    key: "linkedin",
    label: "LinkedIn",
    icon: "linkedin",
    href: appConfig.social.linkedin.handle,
  },
  twitter: {
    key: "twitter",
    label: "Twitter",
    icon: "twitter",
    href: appConfig.social.twitter.handle,
  },
  email: {
    key: "email",
    label: "Email",
    icon: "mail",
    href: `mailto:${appConfig.author.email}`,
  },
};

const GRADIENT_TEXT =
  "bg-linear-to-r from-brand-from via-brand-via to-brand-to bg-clip-text text-transparent [box-decoration-break:clone]";

const SocialButton = ({ label, icon, href }: SocialLink) => (
  <Link
    variant="primary-button"
    aria-label={label}
    className={cn(
      "grid size-8 place-items-center rounded-md",
      "border border-border bg-card/60 backdrop-blur",
      "transition-[color,border-color,transform] duration-200",
      "hover:-translate-y-0.5 hover:border-primary/50",
    )}
    href={href}
    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
    target={href.startsWith("mailto:") ? undefined : "_blank"}
  >
    <Icon name={icon} size={15} />
  </Link>
);

/** Home page hero — Figma "hero": copy on the left, 3D workstation on the right. */
export const Hero = () => {
  const socials = main.connect.socials.map((key) => SOCIALS[key]);

  return (
    <section className="relative isolate min-h-[calc(100svh-var(--header-h))] overflow-hidden bg-background">
      {/* Ambient wash, all from theme tokens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage: [
            "radial-gradient(55% 80% at 8% 25%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)",
            "radial-gradient(45% 70% at 88% 55%, color-mix(in oklab, var(--primary) 13%, transparent), transparent 70%)",
          ].join(","),
        }}
      />
      {/* Dotted grid, top-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 -z-10 size-48 bg-[radial-gradient(circle,var(--primary)_1px,transparent_1px)] bg-size-[12px_12px] opacity-20 mask-[linear-gradient(to_bottom_right,black,transparent)]"
      />

      <div className="mx-auto grid min-h-[inherit] max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-2 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-6 lg:px-10 lg:pb-24 lg:pt-6">
        {/* Copy */}
        <div className="flex max-w-xl flex-col items-center justify-self-center text-center lg:items-start lg:justify-self-auto lg:text-left">
          <p className="rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            {main.eyebrow}
          </p>

          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[3.35rem]">
            {main.headline.map((line, index) => (
              <span key={line.map((s) => s.text).join("")} className="block">
                {line.map((segment: HeadlineSegment) =>
                  segment.highlight ? (
                    <span key={segment.text} className={GRADIENT_TEXT}>
                      {segment.text}
                    </span>
                  ) : (
                    <span key={segment.text}>{segment.text}</span>
                  ),
                )}
                {index === main.headline.length - 1 ? (
                  /* Typing caret, on the same line as the last word */
                  <span
                    aria-hidden="true"
                    className="invisible ml-1.5  h-[0.85em] w-[0.09em] translate-y-[0.08em] bg-primary motion-safe:animate-pulse"
                  />
                ) : (
                  " "
                )}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-md text-balance text-sm leading-6 text-muted-foreground sm:text-[0.9375rem] sm:leading-7">
            {main.subtitle}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link href={main.primaryCta.href} variant="primary-button">
              {main.primaryCta.label}
              <Icon
                className="ml-2 transition-transform group-hover:translate-x-0.5"
                name="arrow-right"
                size={16}
              />
            </Link>
            <Link
              download={main.secondaryCta.fileName}
              href={main.secondaryCta.href}
              prefetch={false}
              variant="secondary-button"
            >
              {main.secondaryCta.label}
              <Icon className="ml-2" name="download" size={16} />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="text-xs text-muted-foreground">
              {main.connect.label}
            </span>
            <ul className="flex items-center gap-2">
              {socials.map((social) => (
                <li key={social.key}>
                  <SocialButton {...social} />
                </li>
              ))}
            </ul>
            <span className="text-xs font-medium text-foreground/80">
              @{appConfig.author.handle}
            </span>
          </div>
        </div>

        {/* 3D scene — explicit height; the viewer fills its parent */}
        <div className="relative h-88 sm:h-120 lg:h-144">
          {/* <ClientModelViewer eager fadeEdges modelKey="hero-workstation" /> */}
          <Hero3D rotation={false} spread={1} />
        </div>
      </div>

      {/* Scroll hint */}
      <a
        className="absolute bottom-6 left-5 flex items-center gap-3 text-xs text-muted-foreground transition-colors hover:text-foreground sm:left-8 lg:left-10"
        href={main.scroll.href}
      >
        <span className="grid h-9 w-6 place-items-center rounded-full border border-border bg-card/60">
          <Icon className="motion-safe:animate-bounce" name="mouse" size={14} />
        </span>
        {main.scroll.label}
      </a>

      {/* Bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
      />
    </section>
  );
};
