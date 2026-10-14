import type { Project } from "@/types/projects";
import appConfig from "../app.config";

const mobileApps = [
  {
    key: "create-expo-app",
    title: "Create Expo App",
    role: "Mobile Developer",
    client: "open-source",
    description:
      "A React Native + Expo starter with NativeWind v4, Zustand, Zod, Biome, and Husky preconfigured, so mobile apps ship without the boilerplate setup.",
    tags: ["React Native", "Expo", "NativeWind", "Zustand", "TypeScript"],
    keywords: [
      "mobile",
      "react-native",
      "expo",
      "nativewind",
      "zustand",
      "zod",
      "template",
    ],
    href: `${appConfig.social.github.handle}/create-expo-app`,
    createdAt: "07/06/2026",
    updatedAt: "ongoing",
  },
] satisfies Project[];

export default mobileApps;
