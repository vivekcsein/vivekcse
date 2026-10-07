import { ChevronsRight } from "lucide-react";
import Link from "next/link";

type Crumb = { label: string; href?: string };

type BreadcrumbsProps = {
  items: Crumb[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className="mb-5">
    <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <li className="flex items-center gap-1.5" key={item.label}>
          {index > 0 && <ChevronsRight size={13} />}
          {item.href ? (
            <Link className="hover:text-foreground" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-foreground">
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
