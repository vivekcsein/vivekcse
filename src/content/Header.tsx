// "use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import "../styles/content/Header.scss";

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
        <Link className="Header_logo flex_center" href={header_Logo.href}>
          <Image
            src={`/${header_Logo.src}`}
            width={250}
            height={5}
            alt={header_Logo.alt}
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
