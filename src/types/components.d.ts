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
