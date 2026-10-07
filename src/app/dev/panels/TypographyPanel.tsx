const FONT_FAMILIES = [
  {
    name: "Sans — Oxanium",
    role: "Headings, UI text, buttons",
    family: "var(--font-sans)",
    sample: "Design that scales",
  },
  {
    name: "Serif — Inika",
    role: "Long-form body copy",
    family: "var(--font-serif)",
    sample: "Design that scales",
  },
  {
    name: "Mono — Kode Mono",
    role: "Code, tokens, data",
    family: "var(--font-mono)",
    sample: "Design that scales",
  },
];

const HEADING_SCALE = [
  { tag: "h1", label: "H1", size: "clamp(1.8rem, 3.5vw + 0.5rem, 2.8rem)" },
  { tag: "h2", label: "H2", size: "clamp(1.5rem, 2.8vw + 0.4rem, 2.2rem)" },
  { tag: "h3", label: "H3", size: "clamp(1.25rem, 2vw + 0.3rem, 1.6rem)" },
  { tag: "h4", label: "H4", size: "clamp(1.05rem, 1.2vw + 0.2rem, 1.2rem)" },
  { tag: "h5", label: "H5", size: "0.95rem" },
  { tag: "h6", label: "H6", size: "0.85rem" },
];

const HeadingSpecimen = ({
  label,
  size,
}: {
  tag: string;
  label: string;
  size: string;
}) => {
  // const Tag = tag as React.ElementType;

  return (
    <div className="dev-type-specimen">
      <div className="dev-type-specimen-meta">
        <span className="dev-type-specimen-label">{label}</span>
        <span className="dev-type-specimen-size">{size}</span>
      </div>
      {/* <Tag style={{ margin: 0 }}>The quick brown fox</Tag> */}
    </div>
  );
};

const TypographyPanel = () => {
  return (
    <>
      <div className="dev-page-header">
        <div className="dev-page-eyebrow">Typography</div>
        <h1 className="dev-page-title">A three-typeface system</h1>
        <p className="dev-page-lede">
          One display/UI face used with restraint, one serif for reading, and a
          monospace face for anything that's data — never mixed outside their
          roles.
        </p>
      </div>

      <section className="dev-section">
        <h2 className="dev-section-heading">Typefaces</h2>
        <p className="dev-section-description">
          Set via <code>--font-sans</code> / <code>--font-serif</code> /{" "}
          <code>--font-mono</code> in <code>globals.css</code>, loaded in{" "}
          <code>app/layout.tsx</code>.
        </p>

        <div className="dev-nav-cards">
          {FONT_FAMILIES.map((font) => (
            <div className="dev-font-card" key={font.name}>
              <div className="dev-font-card-name">{font.role}</div>
              <div
                className="dev-font-card-sample"
                style={{ fontFamily: font.family }}
              >
                {font.sample}
              </div>
              <div className="dev-font-card-meta">{font.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="dev-section">
        <h2 className="dev-section-heading">Heading scale</h2>
        <p className="dev-section-description">
          Every size is a fluid <code>clamp()</code> — scales with viewport
          width rather than jumping at fixed breakpoints.
        </p>

        {HEADING_SCALE.map((heading) => (
          <HeadingSpecimen key={heading.tag} {...heading} />
        ))}
      </section>

      <section className="dev-section">
        <h2 className="dev-section-heading">Body &amp; inline text</h2>

        <div className="dev-type-specimen">
          <div className="dev-type-specimen-meta">
            <span className="dev-type-specimen-label">Body</span>
          </div>
          <p style={{ margin: 0 }}>
            Design is intelligence made visible — the way a system explains its
            own choices to the next person who has to work inside it.
          </p>
        </div>

        <div className="dev-type-specimen">
          <div className="dev-type-specimen-meta">
            <span className="dev-type-specimen-label">Small</span>
          </div>
          <small>Caption and helper text, set below body size.</small>
        </div>

        <div className="dev-type-specimen">
          <div className="dev-type-specimen-meta">
            <span className="dev-type-specimen-label">Code</span>
          </div>
          <code>const cn = (...classes) =&gt; twMerge(clsx(classes));</code>
        </div>

        <div className="dev-type-specimen">
          <div className="dev-type-specimen-meta">
            <span className="dev-type-specimen-label">Blockquote</span>
          </div>
          <blockquote style={{ margin: 0 }}>
            Design is intelligence made visible.
          </blockquote>
        </div>
      </section>
    </>
  );
};

export default TypographyPanel;
