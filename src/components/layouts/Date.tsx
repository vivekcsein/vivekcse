"use client";

import { useEffect, useState } from "react";

type DateDisplayProps = {
  type?: "year" | "date";
};

const DateDisplay = ({ type = "year" }: DateDisplayProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const now = new Date();

    if (type === "date") {
      setValue(now.toLocaleDateString());
      return;
    }

    setValue(String(now.getFullYear()));
  }, [type]);

  return <>{value}</>;
};

export default DateDisplay;
