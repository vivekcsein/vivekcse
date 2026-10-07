import Link from "next/link";
import { footerNav } from "@/packages/configs/navigation.config";
import FooterAccordion from "./FooterAccordion";

/**
 * Server component. Renders the column layout (>= 768px) and the accordion
 * (< 768px) side by side; CSS shows exactly one, so there's no hydration
 * flash and no JS-based breakpoint check. The hidden one is display:none,
 * so it's out of the accessibility tree too.
 */
const FooterNavbar = () => {
  return (
    <nav className="site-footer-nav" aria-label="Footer">
      <div className="site-footer-columns">
        {footerNav.map((section) => (
          <div key={section.title} className="site-footer-column">
            <h4 className="site-footer-heading">{section.title}</h4>
            <ul className="site-footer-links">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="site-footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <FooterAccordion sections={footerNav} />
    </nav>
  );
};

export default FooterNavbar;
