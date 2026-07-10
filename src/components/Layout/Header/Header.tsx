"use client";

import { useState } from "react";
import {
  HeaderNav,
  ThemeSelectRow,
  QortalLogoContainer,
  HamburgerIcon,
  Divider,
  LightModeIcon,
  DarkModeIcon,
  QortalMainLogo
} from "./HeaderMobile-styles";
import { useMediaQuery, useTheme } from "@mui/material";
import { MobileDrawer } from "./MobileDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { setTheme } from "../../../state/theme/themeSlice";
import { useDispatch } from "react-redux";
import { DesktopHeader } from "./DesktopHeader";

export const Header = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1193px)");
  const location = usePathname();
  const [openMobileDrawer, setOpenMobileDrawer] = useState<boolean>(false);

  const renderHeader = () => {
    if (location === "/docs/extension" || location === "/docs/q-apps") {
      return null;
    }

    if (!isMobile) {
      return <DesktopHeader />;
    }

    return (
      <HeaderNav>
        <Divider />
        <ThemeSelectRow>
          {theme.palette.mode === "dark" ? (
            <LightModeIcon
              onClickFunc={() => dispatch(setTheme("light"))}
              color="white"
              height="41"
              width="40"
            />
          ) : (
            <DarkModeIcon
              onClickFunc={() => dispatch(setTheme("dark"))}
              color="black"
              height="41"
              width="40"
            />
          )}
          <QortalLogoContainer href="/">
            {theme.palette.mode === "light" ? (
              <QortalMainLogo
                src={"/images/Header/QortalLogoDark.png"}
                alt="Qortal Logo Dark"
                width={287}
                height={90}
                quality={100}
              />
            ) : (
              <QortalMainLogo
                src={"/images/Header/QortalLogoLight.png"}
                alt="Qortal Logo Light"
                width={287}
                height={90}
                quality={100}
              />
            )}
          </QortalLogoContainer>
        </ThemeSelectRow>
        <HamburgerIcon
          color={theme.palette.text.primary}
          height={"18"}
          width={"27"}
          onClickFunc={() => setOpenMobileDrawer(!openMobileDrawer)}
          rotated={{ isOn: openMobileDrawer ? true : false }}
        />
      </HeaderNav>
    );
  };

  const mobileDrawerVariants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 95
      }
    },
    closed: {
      opacity: 0.2,
      x: -100,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      {renderHeader()}
      <AnimatePresence>
        {openMobileDrawer && (
          <motion.div
            animate={"opened"}
            initial={"closed"}
            exit={{ opacity: 0 }}
            variants={mobileDrawerVariants}
            style={{
              top: "115px",
              position: "absolute",
              left: "0",
              right: "0",
              width: "100%",
              height: "auto",
              zIndex: 5,
              backgroundColor: "white"
            }}
          >
            <MobileDrawer
              setOpenMobileDrawer={() => setOpenMobileDrawer(!openMobileDrawer)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
