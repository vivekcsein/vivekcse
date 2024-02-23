import React from "react";
import { SVG } from "frnz-ui";

const RatingStar = ({ rating, maxRating }: any) => {
  const stars = Array(maxRating)
    .fill(0)
    .map((_, i) => i + 1);

  return (
    <div className="rating">
      {stars.map((star) => (
        <span key={star}>
          <SVG
            variant={"Rating"}
            size={16}
            fxc={{
              primary: "gold",
              bgc: "transparent",
            }}
            // color="gold"
            // bgcolor="transparent"
            show={
              star <= rating
                ? 100
                : star > rating && star < rating + 1
                  ? (1 - (star - rating)) * 100
                  : 0
            }
          />
        </span>
      ))}
    </div>
  );
};

export default RatingStar;
