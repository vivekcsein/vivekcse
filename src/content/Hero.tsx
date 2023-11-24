import React from "react";
import "../styles/content/Hero.scss";
import LoadingScreen from "../components/LoadingScreen";
import { loadingSceneLoader } from "../libs/constants";
import Webar_clickselfie from "../page/projects/camerafilter/Webar_clickselfie";
// import UserForm from "../components/UserForm";

const Hero = () => {
  return (
    <>
      <div className="Hero_Section fullScreen">Hello Frands Chai Pilo</div>
      <div className="Loading_Screen">
        <LoadingScreen loadingSceneLoader={loadingSceneLoader} />
      </div>
      <div className="Hero_formSection">{/* <UserForm /> */}</div>
    </>
  );
};

export default Hero;
