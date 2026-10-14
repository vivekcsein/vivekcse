import type { Metadata } from "next";
import ProjectsMainPage from "@/components/features/projects/ProjectsMainPage";
import projectsConfig from "@/packages/configs/projects.config";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsConfig.description,
  alternates: { canonical: "/projects" },
};

const ProjectsPage = () => <ProjectsMainPage />;

export default ProjectsPage;
