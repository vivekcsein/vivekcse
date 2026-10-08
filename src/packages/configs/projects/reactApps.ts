import type { Project } from "@/types/projects";
import appConfig from "../app.config";

const reactApps = [
  {
    key: "create-next-template",
    title: "Create Next Template",
    role: "Frontend Developer",
    client: "self",
    description:
      "A production-grade Next.js starter that powers client projects, with a complete auth system, Vitest suite, proxy middleware, dynamic OG images, and a theme-palette system.",
    tags: ["Next.js", "TypeScript", "Vitest", "Tailwind CSS"],
    keywords: [
      "react",
      "nextjs",
      "typescript",
      "vitest",
      "tailwindcss",
      "starter",
      "template",
      "auth",
    ],
    href: `${appConfig.social.github}/create-next-template`,
    createdAt: "12/06/2026",
    updatedAt: "24/08/2026",
  },
  {
    key: "create-next-navigations",
    title: "Create Next Navigations",
    role: "Frontend Developer",
    client: "self",
    description:
      "A config-driven navigation system for Next.js: namespaced providers, a mega-menu desktop nav, a mobile drawer, and a collapsible dashboard sidebar from a single config.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    keywords: [
      "react",
      "nextjs",
      "typescript",
      "tailwindcss",
      "navigation",
      "sidebar",
      "navbar",
    ],
    href: `${appConfig.social.github}/create-next-navigations`,
    createdAt: "12/06/2026",
    updatedAt: "24/08/2026",
  },
  {
    key: "next-design-app",
    title: "Next Theme App",
    role: "Frontend Developer",
    client: "self",
    description:
      "A Next.js theming playground with a custom design palette, system-aware dark mode, and a polished theme toggle.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    keywords: [
      "nextjs",
      "typescript",
      "tailwindcss",
      "dark mode",
      "theme",
      "design system",
    ],
    href: "https://next-theme-app.vercel.app/",
    createdAt: "21/07/2026",
    updatedAt: "09/08/2026",
  },
  {
    key: "learn-advanced-react",
    title: "Learn Advanced React",
    role: "Frontend Developer",
    client: "self",
    description:
      "A hands-on advanced React course covering hooks, context, and concurrent features, with runnable examples built in Next.js.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    keywords: [
      "react",
      "typescript",
      "nextjs",
      "tailwindcss",
      "hooks",
      "context",
      "concurrent mode",
      "course",
    ],
    href: "https://learn-advance-react.vercel.app/",
    createdAt: "23/04/2026",
    updatedAt: "03/07/2026",
  },
  {
    key: "frnz-ui",
    title: "frnz-ui",
    role: "UI Library Author",
    client: "self",
    description:
      "A published React component library, bundled with Rollup and typed in TypeScript, built to speed up front-end development.",
    tags: ["React", "TypeScript", "Rollup", "npm"],
    keywords: [
      "react",
      "typescript",
      "react-ui",
      "component library",
      "rollup",
      "npm",
    ],
    href: "https://www.npmjs.com/package/frnz-ui",
    createdAt: "13/01/2023",
    updatedAt: "11/02/2024",
    screenshots: [
      "https://raw.githubusercontent.com/vivekcsein/githost/main/images/frnz/fav_icon.png",
    ],
  },
] satisfies Project[];

export default reactApps;
