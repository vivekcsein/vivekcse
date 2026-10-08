import type { Project } from "@/types/projects";
import appConfig from "../app.config";

const creativeApps = [
  {
    key: "create-react-3d",
    title: "Create React 3D",
    role: "Creative Developer",
    client: "self",
    description:
      "A collection of animated 3D models and effects for React, built with React Three Fiber, GLB assets, and GSAP.",
    tags: ["React Three Fiber", "Three.js", "GSAP", "Next.js", "TypeScript"],
    keywords: [
      "3d",
      "models",
      "glb",
      "three.js",
      "react-three-fiber",
      "gsap",
      "animation",
    ],
    href: `${appConfig.social.github}/create-react-3d`,
    createdAt: "24/08/2026",
    updatedAt: "24/08/2026",
  },
  {
    key: "gsap-animations",
    title: "GSAP Animations",
    role: "Creative Developer",
    client: "self",
    description:
      "A showcase of GSAP-driven UI animations and Swiper sliders, written in TypeScript.",
    tags: ["GSAP", "Swiper", "TypeScript"],
    keywords: ["gsap", "swiper", "animations", "slider", "typescript"],
    href: "https://vivekcsein.github.io/gsap-animations",
    createdAt: "28/12/2023",
    updatedAt: "28/12/2023",
    screenshots: [
      "https://raw.githubusercontent.com/vivekcsein/githost/main/images/vivekcse/projects/swiper_anim.png",
    ],
  },
] satisfies Project[];

export default creativeApps;
