"use client";

import ThemeToggle from "@/components/layouts/ThemeToggle";
import {
  useNavigationActions,
  useNavigationState,
} from "@/components/providers/NavigationProvider";
import { Hamburger } from "@/components/ui";
import { MOBILE_MENU_ID } from "@/packages/configs/navigation.config";
import { useRouteMatch } from "@/packages/hooks";
import CartButton from "../../marketplace/CartButton";

const NavbarDesktopAction = () => {
  const mobileMenuOpen = useNavigationState("mobileMenuOpen");
  const { toggleMobileMenu } = useNavigationActions();
  const isMarketplace = useRouteMatch("marketplace");

  return (
    <div className="header-actions">
      <ThemeToggle />
      <Hamburger
        isOpen={mobileMenuOpen}
        onToggle={toggleMobileMenu}
        controls={MOBILE_MENU_ID}
      />
      {isMarketplace && <CartButton />}
    </div>
  );
};

export default NavbarDesktopAction;
