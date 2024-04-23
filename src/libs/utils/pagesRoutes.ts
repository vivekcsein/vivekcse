import dynamic from "next/dynamic";
// import { ComponentType } from "react";

export const Info_aboutus = dynamic(
  () => import("../../components/pages/info/Info_aboutus"),
  {
    ssr: true,
  }
);
export const Info_contactus = dynamic(
  () => import("../../components/pages/info/Info_contactus"),
  {
    ssr: true,
  }
);
export const Info_faqs = dynamic(
  () => import("../../components/pages/info/Info_faqs"),
  {
    ssr: true,
  }
);
export const Info_howitworks = dynamic(
  () => import("../../components/pages/info/Info_howitworks"),
  {
    ssr: true,
  }
);
export const Info_paymentpolicy = dynamic(
  () => import("../../components/pages/info/Info_paymentpolicy"),
  {
    ssr: true,
  }
);

export const Info_privacypolicy = dynamic(
  () => import("../../components/pages/info/Info_privacypolicy"),
  {
    ssr: true,
  }
);

export const pagesRouteInfo: pagesRouteInfo = [
  {
    id: 1,
    title: "webdevelopment",
    urlLink: "WebDevelopment",
    category: "Info",
    desc: `I'm a Web Developer`,
    productsArr: [
      {
        id: 11,
        title: "javascript",
        urlLink: "Javascript",
        category: "Product",
        desc: `I'm a javascript Developer`,
        itemArr: [
          {
            id: 111,
            title: "Javacript interview Questions",
            urlLink: "InterviewQuestions",
            category: "Item",
            desc: "Top 40 most asked Javascript interview questions",
            jsonData: "javascript.json",
          },
        ],
      },
      {
        id: 12,
        title: "reactjs",
        urlLink: "Reactjs",
        category: "Product",
        desc: `I'm a ReactJS Web Developer`,
        itemArr: [
          {
            id: 121,
            title: "ReactJS Interview Questions",
            urlLink: "InterviewQuestions",
            category: "Item",
            desc: "Top 40 most asked ReactJS interview questions",
            jsonData: "react.json",
          },
        ],
      },
      {
        id: 13,
        title: "nextjs",
        urlLink: "Nextjs",
        category: "Product",
        imgUrl: "",
        desc: `I'm a NextJS Web Developer`,
        itemArr: [
          {
            id: 131,
            title: "NextJS Interview Questions",
            urlLink: "InterviewQuestions",
            category: "Item",
            desc: "Top 40 most asked NextJS interview questions",
            jsonData: "react.json",
          },
        ],
      },
      {
        id: 14,
        title: "nestjs",
        urlLink: "Nestjs",
        category: "Product",
        imgUrl: "",
        desc: `I'm a NestJS Developer`,
        // itemArr: [
        //   {
        //     id: 141,
        //     title: "interviewquestions",
        //     urlLink: "InterviewQuestions",
        //     desc: `NextJS Interview Questions`,
        //   }
        // ]
      },
    ],
  },
  {
    id: 2,
    title: "augmentedreality",
    urlLink: "AugmentedReality",
    category: "Info",
    desc: `I'm a Augmented Reality Developer`,
    productsArr: [
      {
        id: 21,
        title: "instagram",
        urlLink: "Instagram",
        category: "Product",
        desc: `I'm a Instagram Augmented Reality Developer`,
      },
      {
        id: 22,
        title: "snapchat",
        urlLink: "Snapchat",
        category: "Product",
        desc: `I'm a Snapchat Augmented Reality Developer`,
      },
      {
        id: 23,
        title: "Webar",
        urlLink: "WebAR",
        category: "Product",
        desc: `I'm a WebAR Augmented Reality Developer`,
      },
    ],
  },
  {
    id: 3,
    title: "gaming",
    urlLink: "Gaming",
    category: "Info",
    desc: `I'm a gamer`,
    productsArr: [
      {
        id: 31,
        title: "bgmi",
        urlLink: "BGMI",
        category: "Product",
        desc: `I'm a BGMI Lover`,
      },
      {
        id: 32,
        title: "counterstrike",
        urlLink: "CounterStrike",
        category: "Product",
        desc: `I'm a CounterStrike Lover`,
      },
      {
        id: 33,
        title: "gta",
        urlLink: "GTA",
        category: "Product",
        desc: `I'm a GTA Lover`,
      },
      {
        id: 34,
        title: "valorant",
        urlLink: "Valorant",
        category: "Product",
        desc: `I'm a Valorant Lover`,
      },
      {
        id: 35,
        title: "farlight84",
        urlLink: "Farlight84",
        category: "Product",
        desc: `I'm a Farlight84 Lover`,
      },
    ],
  },
  {
    id: 4,
    title: "aboutus",
    urlLink: "aboutus",
    category: "Info",
    desc: `This Page shows info about page About us`,
    filename: Info_aboutus,
  },
  {
    id: 5,
    title: "contactus",
    urlLink: "contactus",
    category: "Info",
    desc: `This Page shows info about page Contact us`,
    filename: Info_contactus,
  },
  {
    id: 6,
    title: "faqs",
    urlLink: "faqs",
    category: "Info",
    desc: `This Page shows info about page FAQS us`,
    filename: Info_faqs,
  },
  {
    id: 7,
    title: "howitworks",
    urlLink: "HowItWorks",
    category: "Info",
    desc: `This Page shows info about page HowItWorks us`,
    filename: Info_howitworks,
  },
  {
    id: 8,
    title: "paymentpolicy",
    urlLink: "paymentpolicy",
    category: "Info",
    desc: `This Page shows info about page payment policy us`,
    filename: Info_paymentpolicy,
  },
  {
    id: 9,
    title: "privacypolicy",
    urlLink: "privacypolicy",
    category: "Info",
    desc: `This Page shows info about page privacy policy us`,
    filename: Info_privacypolicy,
  },
];
