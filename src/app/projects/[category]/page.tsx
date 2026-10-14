import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCategoryPage } from "@/components/features/projects/ProjectCategoryPage";
import {
  getAllProjectCategories,
  getProjectCategory,
} from "@/packages/utils/projects";

type CategoryRouteProps = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () =>
  getAllProjectCategories().map(({ key }) => ({ category: key }));

export const generateMetadata = async ({
  params,
}: CategoryRouteProps): Promise<Metadata> => {
  const { category: key } = await params;
  const category = getProjectCategory(key);
  if (!category) return {};

  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: `/projects/${category.key}` },
  };
};

const CategoryRoute = async ({ params }: CategoryRouteProps) => {
  const { category: key } = await params;
  const category = getProjectCategory(key);
  if (!category) notFound();

  return <ProjectCategoryPage category={category} />;
};

export default CategoryRoute;
