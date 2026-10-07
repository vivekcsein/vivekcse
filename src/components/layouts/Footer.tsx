import appConfig from "@/packages/configs/app.config";
import FooterNavbar from "../features/navigation/footer/FooterNavbar";
import NavigationLogo from "../ui/images/NavigationLogo";
import DateDisplay from "./Date";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <NavigationLogo src={appConfig.site.logo} />
            <p className="site-footer-tagline">{appConfig.site.description}</p>
            {/* <SocialLinks /> */}
          </div>
          <FooterNavbar />
        </div>

        <div className="site-footer-bottom">
          <p className="site-footer-copyright">
            &copy; <DateDisplay type="year" /> {appConfig.site.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
