import React from "react";
import "../../styles/layout/Footer.scss";
import Link from "next/link";
import ProductsList from "../products/ProductsList";
// import SubscribeForm from "../ui/forms/SubscribeForm";
import Animate_Header from "../ui/animation/Animate_Header";

type FooterProps = {
  FooterData: FooterData;
  productsData: productsData;
};

const Footer = ({
  FooterData: { copyright_message, footer_Links },
  productsData,
}: FooterProps) => {
  const footerItem = () => {
    return footer_Links?.map((item) => {
      return (
        <div className=" Footer_box" key={item.id}>
          <h1>{item.title}</h1>
          <ul>
            {typeof item.links == "string" ? (
              item.links == "productsData" ? (
                <ProductsList productsData={productsData} />
              ) : null
            ) : (
              item.links?.map((link) => {
                return (
                  <li key={link.id} className="Footer_link">
                    {link.label == "Subscribe Now" ? (
                      // <SubscribeForm link={link} />
                      <h1>Subscribe Now</h1>
                    ) : (
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="Footer">
      <div>{footerItem()}</div>
      <h1 className="copyright_message">{copyright_message}</h1>
      <Animate_Header />
    </div>
  );
};

export default Footer;
