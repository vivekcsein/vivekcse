// all the styles related jobs written here
import { Poppins, Roboto, Nunito, Cabin, Lora } from "next/font/google";
// import localFont from 'next/font/local';
export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});
export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});
export const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-nunito",
});
export const cabin = Cabin({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-cabin",
});
export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-lora",
});

// const localfont = localFont({
//   src: [
//     {
//       path: '../../public/fonts/local-Regular.woff2',
//       weight: '500',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-local',
// })

export const fav_colors = [
  {
    id: "fav_color01",
    name: "gray",
    code: "#64748b",
  },
  {
    id: "fav_color02",
    name: "blue",
    code: "#4e4ee3",
  },
  {
    id: "fav_color03",
    name: "pink",
    code: "#ff9ff3",
  },
  {
    id: "fav_color04",
    name: "purple",
    code: "#b4238e",
  },
  {
    id: "fav_color05",
    name: "sky",
    code: "#69e9f5",
  },
  {
    id: "fav_color06",
    name: "sun",
    code: "#ff6700",
  },
  {
    id: "fav_color07",
    name: "gold",
    code: "#ffdd00",
  },
  {
    id: "fav_color08",
    name: "green",
    code: "#39aa69",
  },
];

export const colors = [
  {
    id: "color01",
    name: "bgc",
    code: "#000000",
  },
  {
    id: "color02",
    name: "primary",
    code: "#dd00ff",
  },
  {
    id: "color03",
    name: "secondary",
    code: "#6600ff",
  },
  {
    id: "color04",
    name: "success",
    code: "#10ff10",
  },
  {
    id: "color05",
    name: "danger",
    code: "#ff0000",
  },
  {
    id: "color06",
    name: "textDark",
    code: "#eeaaaa",
  },
  {
    id: "color07",
    name: "textLight",
    code: "#ffddff",
  },
  {
    id: "color08",
    name: "textMuted",
    code: "#ededed",
  },
  {
    id: "color09",
    name: "shadow",
    code: "#00000033",
  },
  {
    id: "color10",
    name: "shadowLight",
    code: "#ffccff",
  },
];
