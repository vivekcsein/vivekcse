import { Card, type CardVariant } from "@/components/ui";
import ComponentPreview from "../preview/ComponentPreview";

const CARD_VARIANTS: CardVariant[] = [
  "primary",
  "interactive",
  "interactive-glow",
];

const CARD_CONTENT: Record<
  CardVariant,
  {
    title: string;
    description: string;
  }
> = {
  primary: {
    title: "Primary Card",
    description:
      "A clean, elevated surface for grouping content and information.",
  },
  interactive: {
    title: "Interactive Card",
    description:
      "Adds interactive motion and hover feedback for clickable content.",
  },
  "interactive-glow": {
    title: "Interactive Glow",
    description:
      "A more expressive interactive surface with an enhanced glow effect.",
  },
};

type CardContentProps = {
  variant: CardVariant;
  content: {
    title: string;
    description: string;
  };
};

const CardPanels = () => {
  return (
    <>
      <div className="dev-page-header">
        <div className="dev-page-eyebrow">Design system</div>

        <h1 className="dev-page-title">Cards</h1>

        <p className="dev-page-lede">
          Flexible content surfaces with consistent spacing, elevation, and
          interaction states. Choose a variant based on the level of emphasis
          and interaction required.
        </p>
      </div>

      <section className="dev-section">
        <ComponentPreview name="Card variants" tag="<Card variant={...} />">
          <div className="flex w-full flex-col items-center justify-center gap-6">
            {CARD_VARIANTS.map((variant) => {
              const content = CARD_CONTENT[variant];

              return (
                <Card
                  key={variant}
                  variant={variant}
                  className="min-h-44 w-full max-w-sm"
                >
                  <CardContent variant={variant} content={content} />
                </Card>
              );
            })}
          </div>
        </ComponentPreview>
      </section>
    </>
  );
};

export default CardPanels;

const CardContent = ({ variant, content }: CardContentProps) => {
  return (
    <div className="flex h-full flex-col justify-between gap-6 p-2">
      <div className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {variant}
        </div>

        <h3 className="text-lg font-semibold">{content.title}</h3>

        <p className="text-sm leading-6 text-muted-foreground">
          {content.description}
        </p>
      </div>

      <code className="w-fit rounded-md bg-muted px-2 py-1 text-xs">
        variant="{variant}"
      </code>
    </div>
  );
};
