import Link from "next/link";
import type { ReactNode } from "react";
import appConfig from "@/packages/configs/app.config";

interface PageHeroProps {
  badge: string;
  title: string;
  description?: string;
  /** Defaults to a link back Home. Pass `false` to hide entirely. */
  backHref?: string | false;
  backLabel?: string;
  children?: ReactNode;
}

const PageHero = ({
  badge,
  title,
  description,
  backHref = appConfig.routes.home,
  backLabel = "Back to Home",
  children,
}: PageHeroProps) => {
  return (
    <main className="content-page">
      <div className="content-background" aria-hidden="true">
        <div className="content-glow content-glow-primary" />
        <div className="content-glow content-glow-secondary" />
        <div className="content-grid-pattern" />
        <div className="content-noise" />
      </div>

      <div className="content-container">
        {backHref !== false && (
          <nav className="content-navigation" aria-label="Breadcrumb">
            <Link href={backHref} className="content-back-link">
              <span className="content-back-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="hidden"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </span>

              <span>{backLabel}</span>
            </Link>
          </nav>
        )}

        <header className="content-hero">
          <div className="content-hero-orbit" aria-hidden="true">
            <span className="content-orbit content-orbit-one" />
            <span className="content-orbit content-orbit-two" />
          </div>

          <div className="content-badge">
            <span className="content-badge-dot" />
            <span>{badge}</span>
          </div>

          <h1 className="content-title">{title}</h1>

          {description && <p className="content-description">{description}</p>}

          <div className="content-hero-divider" aria-hidden="true">
            <span />
          </div>
        </header>

        {children && <div className="content-body">{children}</div>}
      </div>
    </main>
  );
};

export default PageHero;
