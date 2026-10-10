import type { Project } from "@/types/projects";
import appConfig from "../app.config";

const backendApps = [
  {
    key: "create-hono-app",
    title: "Create Hono App",
    role: "Backend Developer",
    client: "open-source",
    description:
      "A production-ready Hono + Bun backend template with a complete authentication service, Razorpay payments, a custom Axios client, and consistent error-handling conventions.",
    tags: ["Hono", "Bun", "TypeScript", "Razorpay"],
    keywords: [
      "backend",
      "hono",
      "bun",
      "typescript",
      "razorpay",
      "auth",
      "template",
    ],
    href: `${appConfig.social.github.handle}/create-hono-app`,
    createdAt: "30/07/2026",
    updatedAt: "05/08/2026",
    coverImage: "/images/cover/backend-cover.jpg",
  },
  {
    key: "create-fastify-app",
    title: "Create Fastify App",
    role: "Backend Developer",
    client: "open-source",
    description:
      "A production-ready Fastify backend template with a complete authentication service, Razorpay payments, a custom Axios client, and consistent error-handling conventions.",
    tags: ["Fastify", "TypeScript", "Razorpay", "Axios"],
    keywords: [
      "backend",
      "fastify",
      "typescript",
      "razorpay",
      "auth",
      "template",
    ],
    href: "https://fastify-auth.vercel.app/",
    createdAt: "02/09/2025",
    updatedAt: "08/09/2025",
    coverImage: "/images/cover/backend-cover.jpg",
  },
] satisfies Project[];

export default backendApps;
