import React from "react";
import Link from "next/link";

type props = {
  fxclass?: string;
  productsData: Array<links>;
};
type links = {
  id: number;
  href: string;
  label: string;
};
const ProductsList = ({ productsData, fxclass }: props) => {
  return (
    <>
      {productsData.map((link) => {
        return (
          <li key={link.id} className={`${fxclass ? fxclass : "Footer_link"}`}>
            <Link href={link.href} target="_blank" rel="noreferrer noopener">
              {link.label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default ProductsList;
// Footer_link;
