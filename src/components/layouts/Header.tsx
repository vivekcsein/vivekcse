"use client";

import { useCallback } from "react";
import {
  useNavigationActions,
  useNavigationState,
} from "@/components/providers/NavigationProvider";
import appConfig from "@/packages/configs/app.config";
import { MOBILE_MENU_ID } from "@/packages/configs/navigation.config";
import { useNavigationAutoClose } from "@/packages/hooks/useNavigationAutoClose";
import { cn } from "@/packages/utils/cn";
import NavbarDesktop from "../features/navigation/navbar/NavbarDesktop";
import NavbarDesktopAction from "../features/navigation/navbar/NavbarDesktopAction";
import NavbarMobile from "../features/navigation/navbar/NavbarMobile";
import Drawer from "../ui/drawer/Drawer";
import NavigationLogo from "../ui/images/NavigationLogo";

type HeaderProps = {
  /** Keep the header pinned while scrolling. On by default — the drawer is offset from the header, so it needs to stay in view. */
  sticky?: boolean;
};

/**
 * Split from `Header` because `useNavigationState`/`useNavigationActions`
 * need to run *inside* the `NavigationProvider` this file also creates —
 * a component can't consume a context it renders itself.
 */
const HeaderContent = ({ sticky = true }: HeaderProps) => {
  const mobileMenuOpen = useNavigationState("mobileMenuOpen");
  const { setMobileMenuOpen, closeAll } = useNavigationActions();

  useNavigationAutoClose(closeAll);

  const closeMenu = useCallback(
    () => setMobileMenuOpen(false),
    [setMobileMenuOpen],
  );

  return (
    // `menu-open` lifts the header above the drawer layer, so the hamburger
    // (which morphs into the X) stays visible and clickable in place.
    <header
      className={cn(
        "header",
        sticky && "header-sticky",
        mobileMenuOpen && "menu-open",
      )}
    >
      <div className="header-main">
        <NavigationLogo src={appConfig.site.logo} />
        <NavbarDesktop />
        <NavbarDesktopAction />
      </div>

      <Drawer
        id={MOBILE_MENU_ID}
        ariaLabel="Navigation menu"
        rootClassName="mobile-menu-root"
        origin="right"
        isOpen={mobileMenuOpen}
        onClose={closeMenu}
        hideCloseButton
        footer={null}
      >
        <NavbarMobile />
      </Drawer>
    </header>
  );
};

const Header = (props: HeaderProps) => <HeaderContent {...props} />;

export default Header;
