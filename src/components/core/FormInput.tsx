// "use client";
import React from "react";
import "../../styles/components/core/FormInput.scss";

interface userFormInput {
  id: number;
  inputType?: number;
  name: string;
  type?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
}

interface props {
  key: number;
  userFormInput: userFormInput;
  inputValue: any;
  onChangehandler: (e: any) => void;
}

const FormInput = (prop: props) => {
  let {
    // key: key,
    userFormInput: { name, type, inputType, label, placeholder, required },
    inputValue,
    onChangehandler,
  } = prop;

  let inputBox: HTMLElement;
  const passwordVisibleToggle = (e: any) => {
    inputBox = e.target.parentNode.getElementsByTagName("input")[0];
    const type =
      inputBox.getAttribute("type") === "password" ? "text" : "password";
    inputBox.setAttribute("type", type);
    const iconText =
      e.target.innerHTML === "visibility" ? "visibility_off" : "visibility";
    e.target.innerHTML = iconText;
  };
  const requiredInput = () => {
    return (
      <input
        type={type}
        name={name}
        value={inputValue.name}
        onChange={onChangehandler}
        placeholder={inputType !== 1 ? (placeholder ? placeholder : "") : ""}
        required
      />
    );
  };

  const UnrequiredInput = () => {
    return (
      <input
        type={type}
        name={name}
        value={inputValue.name}
        onChange={onChangehandler}
        placeholder={inputType !== 1 ? (placeholder ? placeholder : "") : ""}
      />
    );
  };

  return (
    <div
      className={
        inputType == 1
          ? ` formInput formInput_1  `
          : ` formInput formInput_default`
      }
    >
      <div className="inputDiv">
        {inputType == 1 ? <label>{label}</label> : null}
        {required ? requiredInput() : UnrequiredInput()}
        {type === "password" ? (
          <span
            className="material-symbols-outlined passwordVisibleIcon"
            onClick={passwordVisibleToggle}
          >
            visibility
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default FormInput;
