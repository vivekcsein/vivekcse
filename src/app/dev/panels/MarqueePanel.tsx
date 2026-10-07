import { Marquee } from "@/components/ui";
import { keywords } from "@/packages/configs/seo.config";

const MarqueePanel = () => {
  return (
    <>
      <Marquee
        keywords={keywords}
        speed={50}
        direction="left"
        pauseOnHover={true}
        className="w-full"
      />
      <Marquee
        keywords={keywords}
        speed={50}
        direction="right"
        pauseOnHover={true}
        className="w-full"
      />
    </>
  );
};

export default MarqueePanel;
