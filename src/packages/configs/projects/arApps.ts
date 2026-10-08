import type { Project } from "@/types/projects";

const arApps = [
  {
    key: "metaverse-walkthrough",
    title: "Metaverse Walkthrough",
    role: "Cocos Creator Developer",
    client: "open-source",
    description:
      "An interactive metaverse space built in Cocos Creator that showcases a video and image gallery through a navigable 3D walkthrough.",
    tags: ["Cocos Creator", "TypeScript", "3D", "Metaverse"],
    keywords: ["ar", "cocos", "metaverse", "3d", "gallery", "walkthrough"],
    href: "https://youtu.be/i2lSu9ZnRtc",
    createdAt: "24/08/2022",
    updatedAt: "28/12/2022",
    screenshots: [
      "https://raw.githubusercontent.com/vivekcsein/githost/main/images/projectsImages/techkilla/metawalk_tk.png",
    ],
  },
  {
    key: "retro-run",
    title: "Retro Run",
    role: "AR Developer",
    client: "open-source",
    description:
      "A retro-style endless runner built as a Snapchat Lens, turning the AR camera into a quick, playable arcade game.",
    tags: ["AR", "Snapchat Lens", "JavaScript", "Gaming"],
    keywords: ["ar", "snapchat", "lens", "javascript", "gaming", "retro"],
    href: "https://www.snapchat.com/lens/80f946497b0741d4af49647eed220931",
    createdAt: "11/07/2021",
    updatedAt: "21/07/2021",
  },
  {
    key: "flipkart-football-game",
    title: "Flipkart Football Game",
    role: "AR Developer",
    client: "client",
    description:
      "A football AR game for Flipkart, shipped inside the camera filters section of the Flipkart app to drive engagement through play.",
    tags: ["AR", "JavaScript", "Gaming", "Branded Experience"],
    keywords: ["ar", "flipkart", "football", "javascript", "gaming", "branded"],
    href: "https://www.flipkart.com/camera-filters?lensId=7314b6a2-8e42-4399-9d9c-c0ed236ded99",
    createdAt: "09/10/2021",
    updatedAt: "31/10/2021",
  },
  {
    key: "pineapple-run",
    title: "Pineapple Run",
    role: "AR Developer",
    client: "open-source",
    description:
      "A Mario-inspired AR platformer for Snapchat with a bottle-flip twist, played directly through the phone camera.",
    tags: ["AR", "Snapchat Lens", "JavaScript", "Gaming"],
    keywords: ["ar", "snapchat", "lens", "javascript", "gaming", "platformer"],
    href: "https://www.snapchat.com/lens/a21eb1ab36df4a74bf31c522be8b031f",
    createdAt: "12/08/2021",
    updatedAt: "24/08/2021",
  },
  {
    key: "cadbury-hand-tracking-game",
    title: "Cadbury Catch Game",
    role: "AR Developer",
    client: "client",
    description:
      "A catch-the-falling-items AR game for Cadbury that only starts when the player shows a Dairy Milk product to the camera, using image tracking to tie play to the real product.",
    tags: ["AR", "Image Tracking", "JavaScript", "Branded Experience"],
    keywords: [
      "ar",
      "cadbury",
      "image tracking",
      "javascript",
      "gaming",
      "branded",
    ],
    href: "https://raw.githubusercontent.com/vivekcsein/githost/main/images/projectsImages/alivenow/cadbury_game.png",
    createdAt: "02/03/2022",
    updatedAt: "04/03/2022",
    screenshots: [
      "https://raw.githubusercontent.com/vivekcsein/githost/main/images/projectsImages/alivenow/cadbury_game.png",
    ],
  },
  {
    key: "lets-learn-asl",
    title: "Let's Learn ASL",
    role: "AR Developer",
    client: "open-source",
    description:
      "An educational Snapchat Lens that teaches American Sign Language through interactive AR, making sign language more accessible and approachable.",
    tags: ["AR", "Snapchat Lens", "JavaScript", "Education"],
    keywords: [
      "ar",
      "snapchat",
      "lens",
      "asl",
      "sign language",
      "accessibility",
      "education",
    ],
    href: "https://www.snapchat.com/lens/b10d8a39964d40a8b2218da3b3007933",
    createdAt: "11/06/2022",
    updatedAt: "15/06/2022",
    screenshots: [
      "https://raw.githubusercontent.com/vivekcsein/githost/main/images/projectsImages/spotar/sign_lang.png",
    ],
  },
] satisfies Project[];

export default arApps;
