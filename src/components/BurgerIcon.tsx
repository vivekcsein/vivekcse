// "use client";
import "../styles/components/BurgerIcon.scss";
import { burgerIconNum } from "../libs/constants";
type prop = {
  onClick: () => void;
};
const BurgerIcon = ({ onClick }: prop) => {
  const burgerIconClicked = () => {
    onClick();
  };
  switch (burgerIconNum) {
    case 1:
      return (
        <div
          id="burgerIcon1"
          className="toggle_BurgerIcon"
          onClick={burgerIconClicked}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
      break;

    case 2:
      return (
        <div
          id="burgerIcon2"
          className="toggle_BurgerIcon"
          onClick={burgerIconClicked}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
      break;

    case 3:
      return (
        <div
          id="burgerIcon3"
          className="toggle_BurgerIcon"
          onClick={burgerIconClicked}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
      break;

    default:
      return (
        <div
          id="burgerIcon0"
          className="toggle_BurgerIcon"
          onClick={burgerIconClicked}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
      break;
  }
};

export default BurgerIcon;
