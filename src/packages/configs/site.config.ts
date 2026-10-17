import type { IconName } from "@/components/ui";
import appConfig from "./app.config";

export type HeadlineSegment = {
  readonly text: string;
  readonly highlight?: boolean;
};

export type HeadlineLine = readonly HeadlineSegment[];

export type SocialKey = "github" | "linkedin" | "twitter" | "email";

export type CTA = {
  readonly label: string;
  readonly href: string;
};

export type IconKey = IconName;

export type Stat = {
  readonly label: string;
  readonly value: string;
  readonly icon: IconKey;
};

export type TechStackCategory =
  | "All"
  | "Frontend"
  | "Backend"
  | "Database & Tools"
  | "Others";

export type TechStackItem = {
  readonly name: string;
  readonly icon: string;
  readonly category: Exclude<TechStackCategory, "All">;
  readonly image: string;
};

export type JourneyStep = {
  readonly title: string;
  readonly description: string;
  readonly icon: IconKey;
};

export type ShowcaseItem = {
  readonly title: string;
  readonly icon: IconKey;
  readonly modelKey: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
  };
  readonly description: string;
};

export type FaqPoint = {
  label: string;
  text: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  points?: readonly FaqPoint[];
};

export type FaqGroup = {
  id: string;
  title: string;
  items: readonly FaqItem[];
};

export type FaqConfig = {
  heading: string;
  description: string;
  allowMultiple: boolean;
  defaultOpenId: string | null;
  groups: readonly FaqGroup[];
};

export type SiteConfig = {
  readonly hero: {
    readonly main: {
      readonly eyebrow: string;
      readonly headline: readonly HeadlineLine[];
      readonly subtitle: string;
      readonly primaryCta: CTA;
      readonly secondaryCta: CTA & {
        readonly fileName: string;
      };
      readonly connect: {
        readonly label: string;
        readonly socials: readonly SocialKey[];
      };
      readonly scroll: CTA;
    };

    readonly article: {
      readonly eyebrow: string;
      readonly title: string;
      readonly highlightPrefix: string;
      readonly highlight: string;
      readonly subtitle: string;
    };
  };

  readonly about: {
    readonly eyebrow: string;
    readonly heading: readonly string[];
    readonly description: string;
    readonly stats: readonly Stat[];
  };

  readonly techStack: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly categories: readonly TechStackCategory[];
    readonly items: readonly TechStackItem[];
  };

  readonly metrics: readonly Stat[];

  readonly journey: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly steps: readonly JourneyStep[];
  };

  readonly showcase: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly description: string;
    readonly cta: CTA;
    readonly items: readonly ShowcaseItem[];
  };

  readonly cta: {
    readonly heading: readonly string[];
    readonly description: string;
    readonly button: CTA;
    readonly quote: {
      readonly text: string;
      readonly author: string;
      readonly role: string;
    }[];
    readonly subtext: string;
  };

  readonly faqs: FaqConfig;
};

export const siteConfig = {
  hero: {
    main: {
      eyebrow: "Full Stack Developer",

      headline: [
        [{ text: "I build digital products" }],
        [{ text: "that are " }, { text: "fast, scalable", highlight: true }],
        [{ text: "and " }, { text: "built to last.", highlight: true }],
      ],

      subtitle:
        "Full Stack Developer specializing in React, Next.js, Node.js and modern web technologies. I help startups and businesses turn ideas into production-ready products.",

      primaryCta: {
        label: "View My Work",
        href: "/projects",
      },

      secondaryCta: {
        label: "Download Resume",
        href: "/resume.pdf",
        fileName: "Vivek-Resume.pdf",
      },

      connect: {
        label: "Connect with me",
        socials: ["github", "linkedin", "twitter", "email"],
      },

      scroll: {
        label: "Scroll Down",
        href: "#about",
      },
    },

    article: {
      eyebrow: "Knowledge Base",
      title: "Things I’ve learned",
      highlightPrefix: "building",
      highlight: "on the web.",
      subtitle:
        "A growing collection of guides, notes, and resources on development, freelancing, careers and more.",
    },
  },

  about: {
    eyebrow: "About Me",

    heading: ["Building solutions that solve", "real problems."],

    description:
      "I'm a Full Stack Developer who loves creating clean, scalable and high-performance web applications. I enjoy turning complex requirements into simple and delightful experiences.",

    stats: [
      {
        label: "Experience",
        value: "5+ Years",
        icon: "calendar",
      },
      {
        label: "Availability",
        value: "Open to freelance & full-time",
        icon: "check",
      },
      {
        label: "Location",
        value: "India",
        icon: "map-pin",
      },
      {
        label: "Email",
        value: appConfig.author.email,
        icon: "mail",
      },
      {
        label: "Focus",
        value: "Full Stack Development",
        icon: "target",
      },
      {
        label: "Handle",
        value: appConfig.author.handle,
        icon: "at-sign",
      },
    ],
  },

  techStack: {
    eyebrow: "Tech Stack",
    heading: "Technologies I work with",

    categories: ["All", "Frontend", "Backend", "Database & Tools", "Others"],

    items: [
      {
        name: "React",
        icon: "react",
        category: "Frontend",
        image: "/icons/icon_react.png",
      },
      {
        name: "Next.js",
        icon: "nextjs",
        category: "Frontend",
        image: "/icons/icon_nextjs.png",
      },
      {
        name: "TypeScript",
        icon: "typescript",
        category: "Frontend",
        image: "/icons/icon_typescript.png",
      },
      {
        name: "Node.js",
        icon: "nodejs",
        category: "Backend",
        image: "/icons/icon_nodejs.png",
      },
      {
        name: "Express.js",
        icon: "express",
        category: "Backend",
        image: "/icons/icon_express.png",
      },
      {
        name: "Hono",
        icon: "hono",
        category: "Backend",
        image: "/icons/icon_hono.png",
      },
      {
        name: "Fastify",
        icon: "fastify",
        category: "Backend",
        image: "/icons/icon_fastify.png",
      },
      {
        name: "PostgreSQL",
        icon: "postgresql",
        category: "Database & Tools",
        image: "/icons/icon_postgres.png",
      },
      {
        name: "MySQL",
        icon: "mysql",
        category: "Database & Tools",
        image: "/icons/icon_mysql.png",
      },
      {
        name: "Supabase",
        icon: "supabase",
        category: "Database & Tools",
        image: "/icons/icon_supabase.png",
      },
      {
        name: "Redis",
        icon: "redis",
        category: "Database & Tools",
        image: "/icons/icon_redis.png",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
        category: "Frontend",
        image: "/icons/icon_tailwindcss.png",
      },
      {
        name: "Shadcn UI",
        icon: "shadcn",
        category: "Frontend",
        image: "/icons/icon_shadcn.png",
      },
      {
        name: "Redux Toolkit",
        icon: "redux",
        category: "Frontend",
        image: "/icons/icon_reduxtoolkit.png",
      },
      {
        name: "Zustand",
        icon: "zustand",
        category: "Frontend",
        image: "/icons/icon_zustand.png",
      },
      {
        name: "Zod",
        icon: "zod",
        category: "Others",
        image: "/icons/icon_zod.png",
      },
    ],
  },

  metrics: [
    {
      label: "Years Experience",
      value: "2+",
      icon: "calendar",
    },
    {
      label: "Projects Completed",
      value: "30+",
      icon: "grid-small",
    },
    {
      label: "Client Satisfaction",
      value: "100%",
      icon: "shield",
    },
    {
      label: "On TopDev & GitHub",
      value: "Top 1%",
      icon: "trophy",
    },
  ],

  journey: {
    eyebrow: "My Journey",
    heading: "The path that shaped me",

    steps: [
      {
        title: "Learning & Exploring",
        description:
          "Started my journey with HTML, CSS & JS and discovered the joy of building on the web.",
        icon: "book",
      },
      {
        title: "Frontend Developer",
        description:
          "Deep dived into React, Next.js and modern frontend ecosystem.",
        icon: "layout-grid",
      },
      {
        title: "Backend Developer",
        description:
          "Explored Node.js, databases, APIs and authentication systems.",
        icon: "server",
      },
      {
        title: "Full Stack Developer",
        description:
          "Building scalable full stack applications and helping businesses grow.",
        icon: "layers",
      },
      {
        title: "Building & Sharing",
        description:
          "Contributing to open source, writing blogs and sharing knowledge.",
        icon: "share",
      },
      {
        title: "Future Goals",
        description:
          "Continuously learning and building impactful products that make a difference.",
        icon: "flag",
      },
    ],
  },

  showcase: {
    eyebrow: "Interactive 3D Showcase",
    heading: "Explore what I build",

    description:
      "Interactive 3D models of the tools, systems, and experiences I work with.",

    cta: {
      label: "View 3D Showcase",
      href: "/projects",
    },

    items: [
      {
        title: "Web Apps",
        icon: "laptop",
        modelKey: "showcase-web-apps",
        image: {
          src: "/images/card/web-apps.jpg",
          alt: "Web Apps",
        },
        description:
          "Fast, accessible Next.js and React interfaces with clean architecture, from marketing sites to full dashboards.",
      },
      {
        title: "APIs & Backend",
        icon: "server",
        modelKey: "showcase-api-backend",
        image: {
          src: "/images/card/api-backend.jpg",
          alt: "APIs & Backend",
        },
        description:
          "Typed Node.js and Hono APIs with validation, authentication and clear error handling that scale with your product.",
      },
      {
        title: "Databases",
        icon: "database",
        modelKey: "showcase-database",
        image: {
          src: "/images/card/databases.jpg",
          alt: "Databases",
        },
        description:
          "Schema design, queries and migrations on PostgreSQL, MySQL and Supabase, built for integrity and speed.",
      },
      {
        title: "AR Experiences",
        icon: "sparkles",
        modelKey: "showcase-ar-experience",
        image: {
          src: "/images/card/augmented-reality.jpg",
          alt: "AR Experiences",
        },
        description:
          "Immersive 3D on the web: interactive models, scroll-driven scenes and playful product demos.",
      },
    ],
  },

  cta: {
    heading: ["Let's build something", "amazing together"],

    description:
      "I'm open to freelance projects, full-time opportunities and exciting collaborations.",

    button: {
      label: "Let's Connect",
      href: "/contact",
    },

    quote: [
      {
        text: "Vivek is an exceptional developer who delivers high-quality work on time. His expertise in Next.js and backend architecture is top-notch.",
        author: "Sandeep Singh",
        role: "Salesforce Developer",
      },
      {
        text: "Vivek brings a strong technical mindset and a keen eye for detail to every project. His ability to turn ideas into modern, scalable web experiences makes him a valuable developer to work with.",
        author: "Yashi Mishra",
        role: "Co-Founder, Techkilla Technologies",
      },
      {
        text: "Working with Vivek was a great experience. He understands project requirements well and focuses on building clean, responsive, and user-friendly interfaces. His dedication to delivering quality work makes him a reliable developer for freelance projects.",
        author: "Nilesh Singh",
        role: "Freelance Client",
      },
    ],

    subtext: "Building Global Digital Experiences",
  },

  faqs: {
    heading: "Frequently asked questions",
    description: "How I think, build, and ship.",
    allowMultiple: false,
    defaultOpenId: "engineering-approach",
    groups: [
      {
        id: "engineering",
        title: "Engineering",
        items: [
          {
            id: "engineering-approach",
            question: "What makes my engineering approach different?",
            answer: "A few habits show up in every codebase I touch.",
            points: [
              {
                label: "Architectural discipline",
                text: "GSAP/ScrollTrigger and Framer Motion live in separate 'use client' leaves and never share a tree.",
              },
              {
                label: "Single source of truth",
                text: "Handles and social links come from one constants file instead of being scattered across components.",
              },
              {
                label: "Forward planning",
                text: "The hero reserves space for a future dependency-graph canvas, so the layout never needs rebuilding.",
              },
              {
                label: "Taste calibration",
                text: "I benchmark against Linear, Vercel, and Stripe, and frame the site as a documentation-inspired engineering hub, not a resume.",
              },
              {
                label: "Execution discipline",
                text: "I scope work explicitly and build in deliberate passes instead of everything at once.",
              },
              {
                label: "Stack fluency",
                text: "Next.js App Router, strict TypeScript, Tailwind v4 CSS-first theming, Bun, and Lenis driven by GSAP's ticker instead of its default rAF loop.",
              },
            ],
          },
          {
            id: "stack",
            question: "What stack do I build with?",
            answer: "Next.js, TypeScript, Bun, Hono, and React.",
          },
          {
            id: "lenis-gsap-ticker",
            question:
              "Why do you drive Lenis from GSAP's ticker instead of its default loop?",
            answer:
              "Lenis and GSAP each run their own requestAnimationFrame loop by default. Two loops means two update orders per frame, so ScrollTrigger can fall out of step with the scroll position Lenis just applied. I run both from one clock so every frame has a single, predictable order.",
            points: [
              {
                label: "One clock",
                text: "Lenis's autoRaf is off and gsap.ticker calls lenis.raf(), so smooth scroll and animation update in the same tick.",
              },
              {
                label: "Synced triggers",
                text: "lenis.on('scroll', ScrollTrigger.update) keeps ScrollTrigger reading the position Lenis just set.",
              },
              {
                label: "Lag smoothing off",
                text: "gsap.ticker.lagSmoothing(0) stops GSAP from skipping time after a dropped frame, so scroll-linked animation stays aligned.",
              },
              {
                label: "The rest of the stack",
                text: "Next.js App Router, strict TypeScript, Tailwind v4 CSS-first theming, and Bun, with each concern owned in exactly one place.",
              },
            ],
          },
        ],
      },
    ],
  },
} satisfies SiteConfig;
