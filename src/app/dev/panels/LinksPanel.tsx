import { Link, type LinkUnderline, type LinkVariants } from "@/components/ui";
import ComponentPreview from "../preview/ComponentPreview";

const LINKS_VARIANTS: LinkVariants[] = [
  "primary",
  "secondary",
  "primary-button",
  "secondary-button",
];
const LINKS_DIRECTIONS: LinkUnderline[] = ["left", "center", "right"];

const LinksPanel = () => {
  return (
    <>
      <div className="dev-page-header">
        <div className="dev-page-eyebrow">Design system</div>
        <h1 className="dev-page-title">Links</h1>
        <p className="dev-page-lede">
          Three variants, one shared <code>.Link</code> base class for
          layout/motion — see <code>components/ui/links/Link.tsx</code>.
        </p>
      </div>

      {/* Show all variants */}
      <section className="dev-section">
        <ComponentPreview name="All variants" tag="<Link variant={...} />">
          {LINKS_VARIANTS.map((variant) => (
            <Link key={variant} variant={variant} href={"#"}>
              {variant}
            </Link>
          ))}
        </ComponentPreview>
      </section>

      {/* Show primary variant in different directions */}
      <section className="dev-section">
        <ComponentPreview
          name="Primary directions"
          tag="<Link variant='primary' direction={...} />"
        >
          {LINKS_DIRECTIONS.map((direction) => (
            <Link
              key={LINKS_DIRECTIONS.indexOf(direction)}
              variant="primary"
              underline={direction}
              href={"#"}
            >
              primary-{direction}
            </Link>
          ))}
        </ComponentPreview>
      </section>
    </>
  );
};

export default LinksPanel;
