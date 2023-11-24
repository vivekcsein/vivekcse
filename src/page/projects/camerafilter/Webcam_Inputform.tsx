"use client";
import Image from "next/image";
import React, { useState } from "react";

type Webcam_Inputform_props = {
  onSaveBtn: (userName: string) => void;
};

const Webcam_Inputform = ({ onSaveBtn }: Webcam_Inputform_props) => {
  const [userName, setuserName] = useState("");

  const validateInput = (e: any) => {
    let inputString = e.target.value;
    let alphaNumericRegex = /[^a-zA-Z]/g;
    if (inputString.length <= 15) {
      if (alphaNumericRegex.test(inputString)) {
        inputString = inputString.replace(alphaNumericRegex, "");
        setuserName(inputString);
      } else {
        setuserName(inputString);
      }
    } else {
      inputString = inputString.slice(0, 15);
      setuserName(inputString);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSaveBtn(userName);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="m-auto w-full webInputForm">
        <input
          type="text"
          id="inputField"
          placeholder="Enter Your First Name"
          value={userName}
          onChange={validateInput}
          //   required
          //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button id="saveBtn" type="submit">
          <Image
            src="/images/saveBtn.png"
            alt="saveBtn"
            width={512}
            height={256}
          ></Image>
        </button>
      </form>
    </>
  );
};

export default Webcam_Inputform;
