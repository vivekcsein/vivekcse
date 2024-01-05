export const fav_colors = [
    {
        id: "code01",
        name: "sunrise",
        code: "#d97706",
    },
    {
        id: "code03",
        name: "skyblue",
        code: "#0284c7",
    },
    {
        id: "code06",
        name: "voilet",
        code: "#7c3aed",
    },
    {
        id: "code07",
        name: "pink",
        code: "#e11d48",
    },
]

import Info_aboutus from "../../components/pages/info/Info_aboutus";
import Info_contactus from "../../components/pages/info/Info_contactus";
import Info_faqs from "../../components/pages/info/Info_faqs";
import Info_howitworks from "../../components/pages/info/Info_howitworks";
import Info_paymentpolicy from "../../components/pages/info/Info_paymentpolicy";
import Info_privacypolicy from "../../components/pages/info/Info_privacypolicy";

import Gaming from "../../components/pages/products/Gaming";
import AugmentedReality from "../../components/pages/products/AugmentedReality";
import WebDevelopment from "../../components/pages/products/WebDevelopment";

import BGMI from "../../components/pages/products/Gaming/BGMI";
import CounterStrike from "../../components/pages/products/Gaming/CounterStrike";
import Farlight84 from "../../components/pages/products/Gaming/Farlight84";
import GTA from "../../components/pages/products/Gaming/GTA";
import Valorant from "../../components/pages/products/Gaming/Valorant";

import WD_Nextjs from "../../components/pages/products/WebDevelopment/WD_Nextjs";
import WD_Reactjs from "../../components/pages/products/WebDevelopment/WD_Reactjs";

import AR_Instagram from "../../components/pages/products/AugmentedReality/AR_Instagram";
import AR_Snapchat from "../../components/pages/products/AugmentedReality/AR_Snapchat";
import AR_webar from "../../components/pages/products/AugmentedReality/AR_webar";

export const burgerIconNum = Math.floor(Math.random() * 4);

export const burgerIDFinder = () => {
    const newburgerID = document.getElementById(`burgerIcon${burgerIconNum}`);
    // console.log(newburgerID);

    if (newburgerID?.id) {
        return newburgerID;
    } else {
        return document.getElementById(`burgerIcon${0}`);
    }
};

export const burgerClassFinder = () => {
    // const burgerClassList = document.getElementsByClassName("toggle_BurgerIcon");
    // console.log(burgerClassList);
    // const newburgerClass = document.getElementsByClassName("toggle_BurgerIcon")[0];
    // if (newburgerClass) {
    //     return newburgerClass;
    // } else {
    // }
    return document.getElementsByClassName("toggle_BurgerIcon")[0];
}

export const createBtn = {
    id: 1,
    text: "Click Me",
    type: 2,
    status: "normal",
};

export const createSearchBtn = {
    id: 1,
    text: "Search Me",
    type: 2,
    status: "normal",
};

export const createFormInput = {
    id: 1,
    inputType: 2,
    name: "fullname",
    type: "text",
    label: "Enter Your Name :",
    placeholder: "Enter Your Name :",
    required: true,
}

export const season_Theme = [
    { id: 1, label: "Spring", theme: "pink" },
    { id: 2, label: "Summer", theme: "yellow" },
    { id: 3, label: "Rainy", theme: "skyblue" },
    { id: 4, label: "Winter", theme: "skyblue" },
];

export const dataFinderByString = (str: string) => {
    let result = [];
    return str;
}
const totalLoader = ["", "gradientSpinner", "gradientCirclePlanes", "spinningSqaure", "loadingDots", "frnz", "vivekcse"];
export const loadingSceneLoader = totalLoader[6];

export const infoArr = [
    {
        id: 1,
        title: 'webdevelopment',
        urlLink: "WebDevelopment",
        filename: WebDevelopment,
        imgUrl: '',
        description: `I'm a Web Developer`,
        productsArr: [
            {
                id: 11,
                title: 'reactjs',
                urlLink: "ReactJS",
                filename: WD_Reactjs,
                imgUrl: '',
                description: `I'm a ReactJS Web Developer`,
            },
            {
                id: 12,
                title: 'nextjs',
                urlLink: "NextJS",
                filename: WD_Nextjs,
                imgUrl: '',
                description: `I'm a NextJS Web Developer`,
            },
        ]
    },
    {
        id: 2,
        title: 'augmentedreality',
        urlLink: "AugmentedReality",
        filename: AugmentedReality,
        imgUrl: '',
        description: `I'm a Augmented Reality Developer`,
        productsArr: [
            {
                id: 21,
                title: 'instagram',
                urlLink: "Instagram",
                filename: AR_Instagram,
                imgUrl: '',
                description: `I'm a Instagram Augmented Reality Developer`,
            },
            {
                id: 22,
                title: 'snapchat',
                urlLink: "Snapchat",
                filename: AR_Snapchat,
                imgUrl: '',
                description: `I'm a Snapchat Augmented Reality Developer`,
            },
            {
                id: 23,
                title: 'Webar',
                urlLink: "WebAR",
                filename: AR_webar,
                imgUrl: '',
                description: `I'm a WebAR Augmented Reality Developer`,
            },
        ]
    },
    {
        id: 3,
        title: 'gaming',
        urlLink: "Gaming",
        filename: Gaming,
        imgUrl: '',
        description: `I'm a gamer`,
        productsArr: [
            {
                id: 31,
                title: 'bgmi',
                urlLink: "BGMI",
                filename: BGMI,
                imgUrl: '',
                description: `I'm a BGMI Lover`,
            },
            {
                id: 32,
                title: 'counterstrike',
                urlLink: "CounterStrike",
                filename: CounterStrike,
                imgUrl: '',
                description: `I'm a CounterStrike Lover`,
            },
            {
                id: 33,
                title: 'gta',
                urlLink: "GTA",
                filename: GTA,
                imgUrl: '',
                description: `I'm a GTA Lover`,
            },
            {
                id: 34,
                title: 'valorant',
                urlLink: "Valorant",
                filename: Valorant,
                imgUrl: '',
                description: `I'm a Valorant Lover`,
            },
            {
                id: 35,
                title: 'farlight84',
                urlLink: "Farlight84",
                filename: Farlight84,
                imgUrl: '',
                description: `I'm a Farlight84 Lover`,
            },
        ]
    },
    {
        id: 4,
        title: 'aboutus',
        urlLink: "aboutus",
        filename: Info_aboutus,
        imgUrl: '',
        description: `This Page shows info about page About us`,
    },
    {
        id: 5,
        title: 'contactus',
        urlLink: "contactus",
        filename: Info_contactus,
        imgUrl: '',
        description: `This Page shows info about page Contact us`,
    },
    {
        id: 6,
        title: 'faqs',
        urlLink: "faqs",
        filename: Info_faqs,
        imgUrl: '',
        description: `This Page shows info about page FAQS us`,
    },
    {
        id: 7,
        title: 'howitworks',
        urlLink: "HowItWorks",
        filename: Info_howitworks,
        imgUrl: '',
        description: `This Page shows info about page HowItWorks us`,
    },
    {
        id: 8,
        title: 'paymentpolicy',
        urlLink: "paymentpolicy",
        filename: Info_paymentpolicy,
        imgUrl: '',
        description: `This Page shows info about page payment policy us`,
    },
    {
        id: 9,
        title: 'privacypolicy',
        urlLink: "privacypolicy",
        filename: Info_privacypolicy,
        imgUrl: '',
        description: `This Page shows info about page privacy policy us`,
    },
]

// background - color: #85FFBD;
// background - image: linear - gradient(45deg, #85FFBD 0 %, #FFFB7D 100 %);


export const getComputedStyleCSS = (item: HTMLDivElement, property: string) => {
    const computedStyle = getComputedStyle(item).display;
    console.log(computedStyle);

    return computedStyle;
}

export const effectHomePageV101 = Math.floor(Math.random() * 2);
