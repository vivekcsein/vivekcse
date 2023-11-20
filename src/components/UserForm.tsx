"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "../styles/components/userForm.scss";
import { LogINFormLayout, SignUPFormLayout } from "../libs/layoutForm";
const FormInput = dynamic(() => import("./core/FormInput"), { ssr: false });
import Button from "../components/Button";

const UserForm = () => {
  const [inputValue, setInputValue] = useState(LogINFormLayout.value);
  const onChangehandler = () => {};
  let userFormType = "login"; // "signup"

  const inputListCompnent = (FormLayout: any) => {
    return FormLayout.map((item: any) => {
      return (
        <FormInput
          key={item.id}
          userFormInput={item}
          inputValue={inputValue}
          onChangehandler={onChangehandler}
        />
      );
    });
  };

  function coolForm(FormLayout: any) {
    return (
      <>
        {inputListCompnent(FormLayout.inputFields)}
        <div className="FormBtn">
          <Button btnInfo={FormLayout.button} />
        </div>
      </>
    );
  }

  return (
    <div>
      <form action="" className="userForm">
        {userFormType == "login" ? coolForm(LogINFormLayout) : null}
        {userFormType == "signup" ? coolForm(SignUPFormLayout) : null}
      </form>
    </div>
  );
};

export default UserForm;
