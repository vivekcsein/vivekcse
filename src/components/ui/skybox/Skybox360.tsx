"use client";
import React, { useState } from "react";
import SkyboxImg_01 from "https://images.blockadelabs.com/images/imagine/Art_Mix_equirectangular-jpg_skybox_with_clouds_and_15246920_9830600.jpg";
import SkyboxImg_02 from "https://images.blockadelabs.com/images/imagine/Art_Mix_equirectangular-jpg_create_a_beautiful_skybox_1938753566_9830512.jpg";
const Skybox360 = () => {
  const [currentImage, setCurrentImage] = useState(SkyboxImg_01);
  return <div className="h-screen flex"></div>;
};

export default Skybox360;
