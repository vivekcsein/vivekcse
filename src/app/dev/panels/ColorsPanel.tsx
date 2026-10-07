import TokenSwatch from "./TokenSwatch";

const COLOR_TOKENS: { name: string; cssVar: string }[] = [
  { name: "Background", cssVar: "--background" },
  { name: "Foreground", cssVar: "--foreground" },
  { name: "Card", cssVar: "--card" },
  { name: "Primary", cssVar: "--primary" },
  { name: "Secondary", cssVar: "--secondary" },
  { name: "Muted", cssVar: "--muted" },
  { name: "Accent", cssVar: "--accent" },
  { name: "Destructive", cssVar: "--destructive" },
  { name: "Success", cssVar: "--success" },
  { name: "Border", cssVar: "--border" },
];

const ColorsPanel = () => {
  return (
    <>
      <div className="dev-page-header">
        <div className="dev-page-eyebrow">Design system</div>
        <h1 className="dev-page-title">Colors &amp; tokens</h1>
        <p className="dev-page-lede">
          Every swatch below renders the actual CSS custom property — toggle the
          theme in the top right and everything on this page updates with it.
        </p>
      </div>

      <section className="dev-section">
        <p className="dev-section-description">
          Click a value to copy its <code>var(--x)</code> reference. Colors are
          OKLCH, defined in <code>globals.css</code> — never hardcode a hex
          value against these; reference the token instead, or it won't follow
          theme changes.
        </p>
        <div className="dev-token-grid">
          {COLOR_TOKENS.map((token) => (
            <TokenSwatch
              key={token.cssVar}
              name={token.name}
              cssVar={token.cssVar}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ColorsPanel;
