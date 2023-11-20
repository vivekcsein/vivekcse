type layout = {
    layoutdata: layoutdata;
};
type layoutdata = {
    HeaderData: HeaderData | undefined;
    FooterData: FooterData | undefined;
    productsData: productsData | undefined;
    gameData: gameData | undefined;
}
//header data type
type HeaderData = {
    header_Logo: header_Logo;
    navbar: navbar;

}
type header_Logo = {
    src: string;
    alt: string;
    href: string;
};
type navbar = {
    nav_Links: Array<nav_Links>
}
interface nav_Links {
    "id": number;
    "href": string;
    "label": string;
    "dropdown": boolean;
    details?: Array<links> | string | undefined;
}
//footer data type
type FooterData = {
    footer_logo: string;
    copyright_message: string;
    footer_Links: Array<footer_Links> | undefined;
}

interface footer_Links {
    "id": number;
    "title": string;
    "links": Array<links> | string | undefined;
}

interface links {
    "id": number;
    "label": string;
    "href": string;
}

type productsData = Array<links>;
type gameData = Array<links>;