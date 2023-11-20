import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import { loadingSceneLoader } from "../libs/constants";

const loading = () => {
  return (
    <div className="Loading_Screen">
      <LoadingScreen loadingSceneLoader={loadingSceneLoader} />
    </div>
  );
};

export default loading;
