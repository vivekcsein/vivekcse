import { Children } from "react";
import "../../../styles/ui/navbar/Dropdown.scss";
import NavbarItem from "./NavbarItem";

type Dropdown = {
  dropdownData: Array<links>;
  effect: string;
};

const Dropdown = ({ dropdownData, effect }: Dropdown) => {
  return (
    <ul className="dropdown_ul">
      {dropdownData?.map((item) => {
        return (
          <li key={item.id}>
            <NavbarItem item={item} effect={effect} />
          </li>
        );
      })}
    </ul>
  );
};

export default Dropdown;
