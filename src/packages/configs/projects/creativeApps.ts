import type { Project } from "@/types/projects";

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
    href: "https://vivekcsein.github.io/create-hero-3d/",
    createdAt: "4/10/2026",
    updatedAt: "10/10/2026",
    coverImage: "/images/cover/react-3d-cover.jpg",
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
    createdAt: "17/12/2023",
    updatedAt: "28/12/2023",
    screenshots: [
      "https://raw.githubusercontent.com/vivekcsein/githost/main/images/vivekcse/projects/swiper_anim.png",
    ],
    coverImage:
      "https://raw.githubusercontent.com/vivekcsein/githost/main/images/vivekcse/projects/swiper_anim.png",
  },
] satisfies Project[];

export default creativeApps;
