import { Icon } from "@/components/ui";

type QuoteCardProps = { text: string; author: string };

export const QuoteCard = ({ text, author }: QuoteCardProps) => (
  <figure className="relative overflow-hidden rounded-2xl border border-primary/25 bg-linear-to-br from-primary/15 via-card to-topic-teal/10 p-5">
    <Icon
      className="absolute left-5 top-5 text-primary"
      name="quote"
      size={26}
    />
    <blockquote className="pl-11 pt-0.5 text-base italic leading-[1.35] text-foreground">
      {text}
    </blockquote>
    <figcaption className="mt-3 text-right text-xs text-muted-foreground">
      — {author}
    </figcaption>
  </figure>
);
