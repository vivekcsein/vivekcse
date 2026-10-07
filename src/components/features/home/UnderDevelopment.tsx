import { Construction } from "lucide-react";
import { Link } from "@/components/ui";

const UnderDevelopment = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <Construction
        className="size-10 text-muted-foreground"
        strokeWidth={1.5}
      />
      <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
        This page is under construction
      </h1>
      <p className="max-w-md text-balance text-sm text-muted-foreground md:text-base">
        We&apos;re working on something great here. Check back soon.
      </p>
      <Link href="/">Back to home</Link>
    </div>
  );
};

export default UnderDevelopment;
