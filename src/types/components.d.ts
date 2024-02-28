// menubar types decleration
type MenuData = {
  title: string;
  desc: string;
  navbar: Array<navbarData>;
};

interface navbarData {
  id: string;
  title: string;
  category: string;
  product: Array<menuProductData>;
}

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

interface layoutInfoElem {
  id: number;
  title: string;
  urlLink: string;
  imgUrl: string;
  description: string;
  filename: ComponentType<{}>;
}

type productsArr = Array<layoutInfoElem>;
interface pagesInfoItem extends layoutInfoElem {
  productsArr?: productsArr;
}
type pagesInfo = Array<pagesInfoItem>;

interface pagesInfoElem {
  title: string;
  category: string;
  url?: string;
  fullform?: string;
  desc?: string;
  color?: string;
  tags?: Array<string>;
  image?: string;
  code?: boolean;
  details?: Array<pagesInfoDetails>;
}

interface pagesInfoDetails {
  id: string;
  type: string;
  headline?: string;
  content: string;
}

interface pagesInfoButtons {
  id: string;
  label: string;
  href: string;
}
