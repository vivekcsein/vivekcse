import React from "react";
import "../styles/components/Button.scss";

type btnProps = {
  btnInfo: btnInfo;
  onClickFunc?: (e?: any) => void;
};

interface btnInfo {
  id: number;
  h1?: boolean;
  text: string;
  type?: number; //either "1" for rectngular or "2" for shadow based on bottom
  status?: string; //either "normal" or "active"
}

const Button = ({ btnInfo, onClickFunc }: btnProps) => {
  return (
    <>
      <button
        className={`button_component button_component_${btnInfo.type} button_component_${btnInfo.status}`}
        onClick={onClickFunc}
      >
        {btnInfo.h1 ? <h1>{btnInfo.text}</h1> : <p>{btnInfo.text}</p>}
      </button>
    </>
  );
};

export default Button;
