type rootLayout = {
  rootLayoutData: rootLayoutData;
};
type rootLayoutData = {
  HeaderData: HeaderData;
  FooterData: FooterData;
  productsData: productsData;
  gameData: gameData;
};
//header data type
type HeaderData = {
  header_Logo: header_Logo;
  navbar: navbar;
};
type header_Logo = {
  src: string;
  alt: string;
  href: string;
};
type navbar = {
  nav_Links: Array<nav_Links>;
};
interface nav_Links {
  id: number;
  href: string;
  label: string;
  special: boolean;
  details?: string;
}
//footer data type
type FooterData = {
  footer_logo: string;
  copyright_message: string;
  footer_Links: Array<footer_Links>;
};

interface footer_Links {
  id: number;
  title: string;
  links: Array<links> | string;
}

interface links {
  id: number;
  label: string;
  href: string;
}

type productsData = Array<links>;
type gameData = Array<links>;
