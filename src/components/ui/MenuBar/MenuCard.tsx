"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import RatingStar from "./RatingStar";
// import FRNZ_svg from "../Rating/FRNZ_svg";
import { SVG } from "frnz-ui";
import { dummyBannerImage } from "../../../libs/utils/images";

type MenuCardsProps = {
  cardData: menuProductData;
  cardType?: string;
  photoFilter?: boolean;
};

const MenuCard = ({ cardData, photoFilter = false }: MenuCardsProps) => {
  const colorFunc = useCallback(() => {
    if (cardData.level) {
      switch (cardData.level) {
        case "Expert":
          return "purple";
        case "Best":
          return "red";
        case "Intermediate":
          return "green";
        case "Good":
          return "blue";
        case "Beginner":
          return "gray";
        default:
          return "blue";
      }
    }
  }, [cardData.level]);

  return (
    <div
      className={`MenuCard_Item boxShadow_${photoFilter ? (cardData.color ? cardData.color : colorFunc()) : ""} `}
    >
      <div
        className={`MenuCard__Image  imgfilter_${photoFilter ? (cardData.color ? cardData.color : colorFunc()) : ""} relative`}
      >
        <Image
          src={cardData.image ? cardData.image : dummyBannerImage}
          alt={cardData.id}
          width={1024}
          height={1024}
          priority
        />
        {!cardData.image ? (
          <div>
            <h1>{cardData.title}</h1>
          </div>
        ) : null}
      </div>
      <div className="MenuCard__content">
        <div className="MenuCard__content_badge">
          <span
            className={`badge_${cardData.color ? cardData.color : colorFunc()}`}
          >
            {cardData.level ? cardData.level : "Intermediate"}
          </span>
          {/* <FRNZ_svg show={0} size={18} variant="Popup" /> */}
          <SVG show={0} size={18} variant="Popup" />
        </div>

        <div className="MenuCard__content_heading">
          <h3>
            {cardData.desc
              ? cardData.desc
              : "This is the card main discription"}
          </h3>
          <p>By :{cardData.author ? cardData.author : "vivekcse"}</p>
        </div>
        <div className="MenuCard__content_rating">
          <RatingStar
            rating={cardData.rating ? cardData.rating : 2.5}
            maxRating={5}
          />
          <h3>{cardData.rating ? cardData.rating : 2.5}</h3>
          <h4>({cardData.totalReviews ? cardData.totalReviews : 1000})</h4>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
