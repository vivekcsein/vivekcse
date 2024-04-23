import Link from "next/link";
import React from "react";
import Button from "../../Buttons_/Button";
type Pages_ButtonProps = {
  ButtonInfo: pagesRoutesButtons;
};

const Pages_Button = ({ ButtonInfo }: Pages_ButtonProps) => {
  return (
    <Link href={ButtonInfo.href}>
      <Button label={ButtonInfo.label} variant={1} />
    </Link>
  );
};

export default Pages_Button;
