import Link from "next/link";
import "../styles/components/Dropdown.scss";

type props = {
  dropdownData: Array<links>;
};

const Dropdown = ({ dropdownData }: props) => {
  return (
    <ul className="dropdown_ul">
      {dropdownData?.map((item) => {
        return (
          <li key={item.id} className="dropdown_Item flex_center button_navbar">
            <Link href={item.href}>{item.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Dropdown;
