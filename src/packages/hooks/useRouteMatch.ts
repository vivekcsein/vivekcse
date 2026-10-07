"use client";

import { usePathname } from "next/navigation";

type RouteMatchOptions = {
  exact?: boolean;
};

export const useRouteMatch = (
  route: string,
  options: RouteMatchOptions = {},
): boolean => {
  const pathname = usePathname();
  const { exact = false } = options;

  const normalizedRoute = route.replace(/^\/|\/$/g, "");
  const normalizedPathname = pathname.replace(/^\/|\/$/g, "");

  if (exact) {
    return normalizedPathname === normalizedRoute;
  }

  return (
    normalizedPathname === normalizedRoute ||
    normalizedPathname.startsWith(`${normalizedRoute}/`)
  );
};
