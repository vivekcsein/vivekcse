
type sliderData = Array<sliderElement>

interface sliderElement {
    id: String;
    styleClass: string;
    imgSrc: string;
    alt: string;
    color: string;
    imgWidth: number;
    imgHeight: number;
};

type gsapData = Array<GsapElement>
interface GsapElement {
    id: String;
    styleClass?: string;
    imgSrc?: string;
    alt?: string;
    color?: string;
    variant?: string;
    imgWidth?: number;
    imgHeight?: number;
};
