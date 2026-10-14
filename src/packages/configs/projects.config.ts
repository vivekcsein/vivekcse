import type { Project } from "@/types/projects";
import arApps from "./projects/arApps";
import backendApps from "./projects/backendApps";
import creativeApps from "./projects/creativeApps";
import fullstackApps from "./projects/fullstackApps";
import mobileApps from "./projects/mobileApps";
import reactApps from "./projects/reactApps";
import webApps from "./projects/webApps";

const projectsConfig = {
  /**
   * Which full-stack project is featured at the top of /projects.
   * Change this ONE number: 1 = the first project in `projects/fullstackApps.ts`,
   * 2 = the second, and so on. Out of range falls back to the first.
   */
  featuredFullStackProject: 3,

  /** Hero on /projects (same design as the Knowledge Base hero). */
  hero: {
    eyebrow: "Projects",
    title: "Things I’ve created",
    highlightPrefix: "building",
    highlight: "on the web.",
    subtitle:
      "A growing collection of products, systems, experiments and immersive experiences, each one a live site you can open.",
  },

  eyebrow: "Selected Work",

  title: "Engineering through projects",

  description:
    "A collection of products, systems, experiments, and interactive experiences built with a focus on performance, scalability, and thoughtful user experience.",

  cta: {
    label: "View All Projects",
    href: "/projects",
  },

  projects: [
    {
      key: "full-stack",
      color: "violet",
      title: "Full-Stack Products",
      eyebrow: "Product Engineering",

      cta: {
        label: "View All full-stack projects",
        href: "/projects/full-stack",
      },

      description:
        "Production-oriented applications connecting modern interfaces with secure APIs, business logic, and reliable data systems.",

      positioning: "From product idea to production-ready application.",

      capabilities: [
        "Product architecture",
        "Frontend development",
        "Backend services",
        "Authentication",
        "Database integration",
        "Performance optimization",
      ],

      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Supabase",
      ],

      icon: "layers",

      stats: [
        { label: "Focus", value: "Production" },
        { label: "Architecture", value: "Full Stack" },
      ],

      projectList: fullstackApps,
    },

    {
      key: "web",
      color: "sky",
      title: "Web Applications",
      eyebrow: "Frontend Engineering",
      cta: {
        label: "View All web projects",
        href: "/projects/web",
      },

      description:
        "Modern web experiences designed around responsive interfaces, accessibility, performance, and maintainable frontend architecture.",

      positioning:
        "Fast, accessible interfaces that feel great on every screen.",

      capabilities: [
        "Responsive UI",
        "Component architecture",
        "Accessibility",
        "SEO",
        "Animations",
        "Performance",
      ],

      stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],

      icon: "layout-grid",

      stats: [
        { label: "Focus", value: "UX & Performance" },
        { label: "Platform", value: "Web" },
      ],

      projectList: webApps,
    },

    {
      key: "backend",
      color: "teal",
      title: "Backend & APIs",
      eyebrow: "Systems Engineering",
      cta: {
        label: "View All backend projects",
        href: "/projects/backend",
      },

      description:
        "Backend services and APIs built around security, validation, maintainability, scalability, and reliable data flow.",

      positioning: "Reliable systems behind the interfaces people use.",

      capabilities: [
        "REST APIs",
        "Authentication",
        "Authorization",
        "Database design",
        "Validation",
        "Service architecture",
      ],

      stack: [
        "Node.js",
        "Express.js",
        "Fastify",
        "Hono",
        "PostgreSQL",
        "MySQL",
      ],

      icon: "server",

      stats: [
        { label: "Focus", value: "Reliability" },
        { label: "Architecture", value: "API & Services" },
      ],

      projectList: backendApps,
    },

    {
      key: "3d-ar",
      color: "magenta",
      title: "3D & AR Experiences",
      eyebrow: "Creative Engineering",
      cta: {
        label: "View All 3D & AR projects",
        href: "/projects/3d-ar",
      },

      description:
        "Interactive 3D and augmented-reality experiences combining engineering, visual design, real-time graphics, and interaction.",

      positioning: "Where software engineering meets immersive experiences.",

      capabilities: [
        "3D interfaces",
        "WebGL",
        "Real-time rendering",
        "3D asset pipelines",
        "AR experiences",
        "Interactive animation",
      ],

      stack: ["Three.js", "React Three Fiber", "Blender", "GLB", "Lens Studio"],

      icon: "box",

      stats: [
        { label: "Focus", value: "Interactive 3D" },
        { label: "Rendering", value: "Real Time" },
      ],

      projectList: arApps,
    },

    {
      key: "experiments",
      color: "amber",
      title: "Experiments & Tools",
      eyebrow: "Exploration",
      cta: {
        label: "View All experiments projects",
        href: "/projects/experiments",
      },

      description:
        "Smaller experiments, developer tools, UI systems, prototypes, and ideas created to explore new technologies and improve development workflows.",

      positioning: "Small experiments that often become bigger ideas.",

      capabilities: [
        "Prototyping",
        "Developer tooling",
        "UI systems",
        "New technologies",
        "Automation",
        "Proof of concepts",
      ],

      stack: [
        "TypeScript",
        "React",
        "Next.js",
        "React Native",
        "GSAP",
        "Three.js",
      ],

      icon: "flask",

      stats: [
        { label: "Focus", value: "Experimentation" },
        { label: "Style", value: "Rapid Prototyping" },
      ],

      projectList: [...reactApps, ...mobileApps, ...creativeApps] as Project[],
    },
  ],
} as const;

export default projectsConfig;
