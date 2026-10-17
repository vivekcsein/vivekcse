import type { IconName } from "@/components/ui";

/**
 * dev-services.config.ts — single source of truth for the Web Development
 * project builder (/services/web-development).
 *
 * Everything on screen comes from here, so the UI grows with the data:
 *   - new option      → add an entry to a section's `options`
 *   - new section     → add an object to `sections` with the `step` it belongs to
 *   - new step        → add an entry to `steps` (and sections that point at it)
 * The form hook (useWebDevForm) and the final `Selection[]` array are built from
 * this file, so nothing else needs to change.
 */

/** Weeks an option adds to the timeline estimate. */
export type Effort = { readonly min: number; readonly max: number };

export type OptionDef = {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly icon?: IconName;
  /** Logo image instead of an icon (technologies). */
  readonly image?: string;
  /** Small label on the card ("Most Popular"). */
  readonly badge?: string;
  readonly effort?: Effort;
};

export type FieldDef = {
  readonly id: string;
  readonly label: string;
  readonly type: "text" | "email" | "tel" | "textarea";
  readonly placeholder?: string;
  readonly required?: boolean;
};

/** single = pick one · multi = pick many · fields = free-text inputs */
export type SectionKind = "single" | "multi" | "fields";

/** cards = large · tiles = feature tiles · chips = logo chips · radio = radio pills */
export type SectionLayout = "cards" | "tiles" | "chips" | "radio";

/** How the "Your Selection" panel shows the value. */
export type SummaryTone = "highlight" | "chips" | "text";

export type SectionDef = {
  readonly id: string;
  /** `steps[].id` this section appears in. */
  readonly step: string;
  readonly title: string;
  /** Shown after the title, e.g. "(Optional)". */
  readonly optionalLabel?: string;
  readonly description: string;
  readonly kind: SectionKind;
  readonly layout?: SectionLayout;
  readonly required?: boolean;
  /** Row in "Your Selection". Omit to keep the section out of the panel. */
  readonly summary?: {
    readonly label: string;
    readonly icon: IconName;
    readonly tone: SummaryTone;
  };
  readonly options?: readonly OptionDef[];
  readonly fields?: readonly FieldDef[];
  /** Option ids selected on first load. */
  readonly defaults?: readonly string[];
};

export type StepDef = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  /** "review" shows the summary + send button instead of sections. */
  readonly kind?: "form" | "review";
};

export type DevServicesConfig = {
  readonly page: {
    readonly breadcrumb: readonly { label: string; href?: string }[];
    readonly title: string;
    readonly highlight: string;
    readonly subtitle: string;
    readonly description: string;
    /** Hand-written note beside the stepper, one entry per line. */
    readonly note: readonly string[];
  };
  readonly steps: readonly StepDef[];
  readonly sections: readonly SectionDef[];
  readonly actions: {
    readonly next: string;
    readonly back: string;
    readonly submit: string;
    readonly reset: string;
    readonly copy: string;
  };
  readonly summary: {
    readonly title: string;
    readonly subtitle: string;
    readonly empty: string;
  };
  readonly timeline: {
    readonly title: string;
    readonly unit: string;
    readonly minWeeks: number;
    readonly note: string;
    readonly empty: string;
  };
  readonly recommendation: {
    readonly title: string;
    readonly description: string;
    readonly action: string;
    /** sectionId → option ids applied by "Get a recommendation". */
    readonly preset: Readonly<Record<string, readonly string[]>>;
  };
  readonly talk: {
    readonly title: string;
    readonly description: string;
    readonly action: string;
    readonly href: string;
  };
  readonly review: {
    readonly title: string;
    readonly description: string;
    readonly emailSubject: string;
  };
};

export const devServicesConfig: DevServicesConfig = {
  page: {
    breadcrumb: [{ label: "Services" }, { label: "Web Development" }],
    title: "Let’s Build Your",
    highlight: "Website",
    subtitle:
      "Tell me what you need. Select the options below and I’ll suggest the best approach, timeline, and estimate.",
    description:
      "Plan your website or web app: choose the type, features, stack and budget, and get a clear timeline estimate.",
    note: ["Customize your project,", "get a clear plan!"],
  },

  steps: [
    { id: "project", title: "Project", subtitle: "What you need" },
    { id: "features", title: "Features", subtitle: "Key options" },
    { id: "details", title: "Details", subtitle: "Tell me more" },
    { id: "review", title: "Review", subtitle: "Get estimate", kind: "review" },
  ],

  sections: [
    // ── Step 1 · Project ──────────────────────────────────────────────
    {
      id: "projectType",
      step: "project",
      title: "Project Type",
      description:
        "What are you building? Choose the option that best describes your project.",
      kind: "single",
      layout: "cards",
      required: true,
      summary: { label: "Project type", icon: "building-2", tone: "highlight" },
      defaults: ["business-website"],
      options: [
        {
          id: "business-website",
          title: "Business Website",
          description:
            "A professional website for your business, service or brand.",
          icon: "building-2",
          badge: "Most Popular",
          effort: { min: 2, max: 4 },
        },
        {
          id: "web-application",
          title: "Web Application",
          description: "Interactive product, dashboard or SaaS platform.",
          icon: "box",
          badge: "Advanced",
          effort: { min: 4, max: 8 },
        },
        {
          id: "landing-page",
          title: "Landing Page",
          description:
            "A focused page built to convert visitors into customers.",
          icon: "rocket",
          badge: "Fast & Effective",
          effort: { min: 1, max: 2 },
        },
      ],
    },
    {
      id: "coreFeatures",
      step: "project",
      title: "Core Features",
      description:
        "Select the features you need. You can choose multiple options.",
      kind: "multi",
      layout: "tiles",
      required: true,
      summary: { label: "Core features", icon: "package", tone: "chips" },
      defaults: ["responsive", "contact-forms", "seo"],
      options: [
        {
          id: "responsive",
          title: "Responsive Design",
          description: "Optimized for all devices",
          icon: "monitor",
          effort: { min: 1, max: 2 },
        },
        {
          id: "cms-blog",
          title: "CMS / Blog",
          description: "Manage content easily",
          icon: "file-text",
          effort: { min: 1, max: 2 },
        },
        {
          id: "contact-forms",
          title: "Contact Forms",
          description: "Get leads and inquiries",
          icon: "mail",
          effort: { min: 0.5, max: 1 },
        },
        {
          id: "authentication",
          title: "Authentication",
          description: "User login & protected pages",
          icon: "lock",
          effort: { min: 1, max: 2 },
        },
        {
          id: "admin-dashboard",
          title: "Admin Dashboard",
          description: "Manage data and users",
          icon: "layout-dashboard",
          effort: { min: 2, max: 4 },
        },
        {
          id: "payments",
          title: "Payments",
          description: "Online payments & billing",
          icon: "credit-card",
          effort: { min: 1, max: 3 },
        },
        {
          id: "api-integration",
          title: "API Integration",
          description: "Connect with third-party tools",
          icon: "code",
          effort: { min: 1, max: 2 },
        },
        {
          id: "seo",
          title: "SEO & Performance",
          description: "Optimized for search engines",
          icon: "chart-column",
          effort: { min: 0.5, max: 1 },
        },
      ],
    },
    {
      id: "technology",
      step: "project",
      title: "Preferred Technology",
      optionalLabel: "(Optional)",
      description:
        "Choose your preferred stack. Not sure? I’ll recommend the best tools for your project.",
      kind: "multi",
      layout: "chips",
      summary: { label: "Technology", icon: "cpu", tone: "chips" },
      defaults: ["nextjs", "react", "typescript", "tailwind"],
      options: [
        { id: "nextjs", title: "Next.js", image: "/icons/icon_nextjs.png" },
        { id: "react", title: "React", image: "/icons/icon_react.png" },
        {
          id: "typescript",
          title: "TypeScript",
          image: "/icons/icon_typescript.png",
        },
        {
          id: "tailwind",
          title: "Tailwind CSS",
          image: "/icons/icon_tailwindcss.png",
        },
        { id: "other", title: "Other / Not sure", icon: "circle-help" },
      ],
    },
    {
      id: "budget",
      step: "project",
      title: "Budget Range",
      description:
        "Select an estimated budget range. This helps me suggest the right approach.",
      kind: "single",
      layout: "radio",
      required: true,
      summary: { label: "Budget range", icon: "clock", tone: "text" },
      defaults: ["500-1500"],
      options: [
        { id: "under-500", title: "Under $500" },
        { id: "500-1500", title: "$500 – $1.5k" },
        { id: "1500-3000", title: "$1.5k – $3k" },
        { id: "3000-plus", title: "$3k+" },
        { id: "lets-discuss", title: "Let’s discuss" },
      ],
    },

    // ── Step 2 · Features ─────────────────────────────────────────────
    {
      id: "extras",
      step: "features",
      title: "Extras & Integrations",
      optionalLabel: "(Optional)",
      description: "Add anything that makes the product feel complete.",
      kind: "multi",
      layout: "tiles",
      summary: { label: "Extras", icon: "sparkles", tone: "chips" },
      options: [
        {
          id: "analytics",
          title: "Analytics",
          description: "Understand your visitors",
          icon: "chart-column",
          effort: { min: 0.5, max: 0.5 },
        },
        {
          id: "multilingual",
          title: "Multi-language",
          description: "Reach a global audience",
          icon: "languages",
          effort: { min: 1, max: 2 },
        },
        {
          id: "animations",
          title: "Animations & 3D",
          description: "Premium motion and 3D scenes",
          icon: "sparkles",
          effort: { min: 1, max: 3 },
        },
        {
          id: "newsletter",
          title: "Newsletter",
          description: "Collect and manage subscribers",
          icon: "mail",
          effort: { min: 0.5, max: 1 },
        },
      ],
    },
    {
      id: "designSource",
      step: "features",
      title: "Design",
      description: "Do you already have a design for the project?",
      kind: "single",
      layout: "tiles",
      required: true,
      summary: { label: "Design", icon: "palette", tone: "text" },
      options: [
        {
          id: "have-design",
          title: "I have a design",
          description: "Figma or similar is ready",
          icon: "pen-tool",
        },
        {
          id: "need-design",
          title: "Design it for me",
          description: "UI/UX included in the build",
          icon: "palette",
          effort: { min: 1, max: 2 },
        },
        {
          id: "template",
          title: "Use a template",
          description: "Fastest, most affordable path",
          icon: "layout-template",
        },
      ],
    },

    // ── Step 3 · Details ──────────────────────────────────────────────
    {
      id: "contact",
      step: "details",
      title: "Your Details",
      description:
        "Tell me a little about you and the project so I can reply with an accurate estimate.",
      kind: "fields",
      fields: [
        {
          id: "name",
          label: "Your name",
          type: "text",
          placeholder: "Jane Doe",
          required: true,
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "jane@company.com",
          required: true,
        },
        {
          id: "phone",
          label: "WhatsApp / phone (optional)",
          type: "tel",
          placeholder: "+91 98765 43210",
        },
        {
          id: "notes",
          label: "Anything else? (optional)",
          type: "textarea",
          placeholder: "Goals, deadlines, links to inspiration…",
        },
      ],
    },
  ],

  actions: {
    next: "Continue to next step",
    back: "Back",
    submit: "Send my request",
    reset: "Reset selections",
    copy: "Copy as JSON",
  },

  summary: {
    title: "Your Selection",
    subtitle: "Here’s what you’ve selected so far.",
    empty: "Not selected",
  },

  timeline: {
    title: "Estimated Timeline",
    unit: "weeks",
    minWeeks: 1,
    note: "Timeline may vary based on project complexity and additional requirements.",
    empty: "Pick a project type to see an estimate.",
  },

  recommendation: {
    title: "Not sure what to choose?",
    description:
      "No worries! I can suggest the best stack and features based on your goals.",
    action: "Get a recommendation",
    preset: {
      projectType: ["business-website"],
      coreFeatures: ["responsive", "contact-forms", "seo"],
      technology: ["nextjs", "react", "typescript", "tailwind"],
      budget: ["500-1500"],
    },
  },

  talk: {
    title: "Prefer to talk first?",
    description:
      "Let’s discuss your idea and I’ll guide you to the right solution.",
    action: "Schedule a call",
    href: "/contact",
  },

  review: {
    title: "Review your request",
    description:
      "Here is everything you selected. Send it over and I’ll reply with a clear plan and estimate.",
    emailSubject: "Web development project request",
  },
};
