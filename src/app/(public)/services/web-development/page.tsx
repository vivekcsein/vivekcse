import type { Metadata } from "next";
import { WebDevBuilder } from "@/components/features/web-dev";
import appConfig from "@/packages/configs/app.config";
import { devServicesConfig } from "@/packages/configs/dev-services.config";

export const metadata: Metadata = {
  title: "Web Development",
  description: devServicesConfig.page.description,
  alternates: { canonical: "/services/web-development" },
};

const WebDevelopmentPage = () => (
  <WebDevBuilder contactEmail={appConfig.author.email} />
);

export default WebDevelopmentPage;
