import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../ui/NavBar_/Navbar";
import "../../styles/layout/Header.scss";
// import SVG_FRNZ from "../ui/svgImg/SVG_FRNZ";

type HeaderProps = {
  HeaderData: HeaderData;
  productsData: productsData;
  gameData: gameData;
};

const Header = ({
  HeaderData: { header_Logo, navbar },
  productsData,
  gameData,
}: HeaderProps) => {
  return (
    <>
      <header className="Header">
        <Link className="Header_logo flexCenter" href={header_Logo.href}>
          {/* <SVG_FRNZ /> */}
          <Image
            src={"/logo.png"}
            width={250}
            height={250}
            alt={header_Logo.alt}
            className="w-[200px] h-auto md:w-[250px] Animate_logo"
          />
        </Link>
        <nav className="Navbar">
          <Navbar
            navbar={navbar}
            productsData={productsData}
            gameData={gameData}
          />
        </nav>
      </header>
    </>
  );
};

export default Header;
