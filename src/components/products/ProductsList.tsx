import React from "react";
import Link from "next/link";

type props = {
  productsData: Array<links>;
};
type links = {
  id: number;
  href: string;
  label: string;
};

const ProductsData = ({ productsData }: props) => {
  return (
    <>
      {productsData.map((link) => {
        return (
          <li key={link.id} className="Footer_link">
            <Link href={link.href} target="_blank" rel="noreferrer noopener">
              {link.label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default ProductsData;
