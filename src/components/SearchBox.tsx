import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import "../styles/components/SearchBox.scss";
import Button from "./Button";
import { createSearchBtn } from "@/libs/constants";

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const first = useRef("");
  const serachNow = (e: any) => {
    e.preventDefault();
  };

  const serachBoxInput = () => {
    return (
      <form action={serachNow} className="SearchBox">
        <input type="text" placeholder="search now" />
        <div className="flex_center searchBoxBtn">
          <Button btnInfo={createSearchBtn} />
        </div>
      </form>
    );
  };
  return <>{serachBoxInput()}</>;
};

export default SearchBox;
