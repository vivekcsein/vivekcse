"use client";

import { useDevSection } from "../DevProvider";

const STATS = [
  { value: "54", label: "design tokens" },
  { value: "7", label: "button variants" },
  { value: "6", label: "input types" },
  { value: "3", label: "typefaces" },
];

const OverviewPanel = () => {
  const { setActiveSection } = useDevSection();

  return (
    <>
      <div className="dev-page-header">
        <div className="dev-page-eyebrow">Design system reference</div>
        <h1 className="dev-page-title">
          Everything the template ships with, in one place
        </h1>
        <p className="dev-page-lede">
          A live reference for this template's actual tokens and components —
          not a mockup. Every color, type sample, and control on the following
          pages is pulled straight from the real design system this app runs on.
        </p>
      </div>

      <div className="dev-stats-grid">
        {STATS.map((stat) => (
          <div className="dev-stat" key={stat.label}>
            <div className="dev-stat-value">{stat.value}</div>
            <div className="dev-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="dev-nav-cards">
        <button
          type="button"
          className="dev-nav-card"
          onClick={() => setActiveSection("colors")}
        >
          <div className="dev-nav-card-title">
            Design System <span aria-hidden="true">→</span>
          </div>
          <p className="dev-nav-card-desc">
            Color tokens, buttons, form controls, and surfaces — every variant,
            every state.
          </p>
        </button>

        <button
          type="button"
          className="dev-nav-card"
          onClick={() => setActiveSection("typography")}
        >
          <div className="dev-nav-card-title">
            Typography <span aria-hidden="true">→</span>
          </div>
          <p className="dev-nav-card-desc">
            The three-typeface system (Oxanium, Inika, Kode Mono) and the full
            heading scale.
          </p>
        </button>
      </div>
    </>
  );
};

export default OverviewPanel;
