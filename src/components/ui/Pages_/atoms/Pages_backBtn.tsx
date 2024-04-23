import Link from "next/link";
import React from "react";
import Button from "../../Buttons_/Button";
type Pages_backProps = {
  href: string;
};
const Pages_backBtn = ({ href }: Pages_backProps) => {
  return (
    <Link href={href}>
      <Button label={"back"} variant={2} />
    </Link>
  );
};

export default Pages_backBtn;
