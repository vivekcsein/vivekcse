import heroImage01 from "@/assets/images/hero-01.png";
import heroImage02 from "@/assets/images/hero-02.png";
import heroImage03 from "@/assets/images/hero-03.png";

export const imagesConfig = {
  heroImages: {
    name: "Hero Images",
    images: [
      {
        id: "main-hero-workstation-01",
        src: heroImage01.src,
        alt: "Dark developer workspace with a laptop, books and a mug",
        priority: true,
        isActive: false,
      },
    ],
    backgroundImages: [
      {
        id: "background-hero-image-01",
        src: heroImage01.src,
        alt: "Cool background image",
        priority: true,
        isActive: false,
      },
      {
        id: "background-hero-image-02",
        src: heroImage02.src,
        alt: "Cool background image",
        priority: false,
        isActive: false,
      },
      {
        id: "background-hero-image-03",
        src: heroImage03.src,
        alt: "Cool background image",
        priority: false,
        isActive: false,
      },
    ],
    contentImages: [
      {
        id: "content-hero-image-01",
        src: "/images/hero/hero-1.jpg",
        alt: "Cool content image",
        priority: true,
        isActive: false,
      },
      {
        id: "content-hero-image-02",
        src: "/images/hero/hero-2.jpg",
        alt: "Cool content image",
        priority: false,
        isActive: false,
      },
    ],
  },
};
