// menubar types decleration
// menu product data
interface menuProductData {
  id: string;
  title: string;
  category: string;
  desc: string;
  image?: string;
  level?: string;
  author?: string;
  rating?: number;
  totalRating?: number;
  totalReviews?: number;
  color?: string;
}

interface navbarData {
  id: string;
  title: string;
  category: string;
  product: Array<menuProductData>;
}

type MenuData = {
  title: string;
  desc: string;
  navbar: Array<navbarData>;
};

//pagesRouteInfo type define

type PagesRouteElemCategory = "Info" | "Product" | "Item";
interface PagesRouteElem {
  id: number;
  title: string;
  urlLink: string;
  category: PagesRouteElemCategory;
  desc?: string;
  imgUrl?: string;
  jsonData?: string;
  filename?: ComponentType<{}>;
}

interface pagesRouteItemElem extends PagesRouteElem {}
type pagesRouteItemArr = Array<pagesRouteItemElem>;

interface pagesRouteProductsElem extends PagesRouteElem {
  itemArr?: pagesRouteItemArr;
}

type pagesRouteProductsArr = Array<pagesRouteProductsElem>;

interface PagesRouteInfoElem extends PagesRouteElem {
  productsArr?: pagesRouteProductsArr;
}

type pagesRouteInfo = Array<PagesRouteInfoElem>;

//pagesRouteJson type define
interface pagesRoutesInfoArrDetails {
  id: number | string;
  type: string;
  headline: string;
  content: string;
}
interface pagesRoutesInfoArr {
  id?: number | string;
  title: string;
  desc: string;
  category: string;
  url?: string;
  fullform?: string;
  color?: string;
  image?: string;
  code?: boolean;
  tags?: Array<string> | string;
  details?: Array<pagesRoutesInfoArrDetails>;
}

interface pagesRoutesButtons {
  id: string;
  label: string;
  href: string;
}

interface pagesRoutesDataMain {
  id?: number;
  title: string;
  desc: string;
  category: string;
  buttons?: Array<pagesRoutesButtons>;
  infoArr?: Array<pagesRoutesInfoArr>;
}

type pagesRoutesData = Array<pagesRoutesDataMain>;
type promisePagesRouteData = pagesRoutesData | [];
