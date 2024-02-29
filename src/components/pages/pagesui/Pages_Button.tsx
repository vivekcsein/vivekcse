import Link from "next/link";
import React from "react";
import Button from "../../ui/Buttons_/Button";
type Pages_ButtonProps = {
  ButtonInfo: pagesInfoButtons;
};

const Pages_Button = ({ ButtonInfo }: Pages_ButtonProps) => {
  return (
    <Link href={ButtonInfo.href}>
      <Button label={ButtonInfo.label} variant={1} />
    </Link>
  );
};

export default Pages_Button;
