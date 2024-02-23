"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SVG_icon from "../svg_/SVG_icon";
import { arrowDown, arrowUp } from "../../../libs/utils/images";

type NavbarItemProps = {
  item: {
    id: number;
    href: string;
    label: string;
    special?: boolean;
    details?: string;
  };
  effect?: string;
  font?: string;
  icon?: {
    show?: boolean;
    onPath?: string;
    offPath?: string;
  };
  children?: React.ReactNode;
};

const NavbarItem: React.FunctionComponent<NavbarItemProps> = ({
  item,
  effect,
  font,
  icon,
  children,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showIcon, setShowIcon] = useState(false);
  const [showIconChange, setShowIconChange] = useState(false);

  useEffect(() => {
    if (innerWidth <= 960) {
      setShowIconChange(true);
    } else {
      setShowIconChange(false);
    }

    return () => {
      setShowIconChange(false);
    };
  }, []);

  return (
    <>
      <Link
        className={` flexCenter gap-1 navMenu  ${effect ? effect : ""} ${font}`}
        href={item.href}
        onClick={(e) => {
          const dropdownItem = dropdownRef.current as HTMLDivElement;
          dropdownItem.classList.toggle("showflex");
          setShowIcon(!showIcon);
        }}
        onMouseEnter={(e) => {
          if (icon && !showIconChange) {
            setShowIcon(!showIcon);
          }
        }}
        onMouseLeave={(e) => {
          if (icon && !showIconChange) {
            setShowIcon(!showIcon);
          }
        }}
      >
        {item.label}
        <span>
          {icon && icon.show ? (
            showIcon ? (
              <SVG_icon
                size={5}
                viewbox={300}
                path={icon && icon.offPath ? icon.offPath : arrowDown}
              />
            ) : (
              <SVG_icon
                size={5}
                viewbox={300}
                path={icon && icon.onPath ? icon.onPath : arrowUp}
              />
            )
          ) : null}
        </span>
      </Link>
      <div className="nav_dropdown" ref={dropdownRef}>
        {children
          ? React.Children.map(children, (child) => {
              return child;
            })
          : null}
      </div>
    </>
  );
};

export default NavbarItem;
