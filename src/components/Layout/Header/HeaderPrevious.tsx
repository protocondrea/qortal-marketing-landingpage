"use client";
import { useRef, useState } from "react";
import ReactGA from "react-ga4";
import {
  HeaderNav,
  ThemeSelectRow,
  QortalLogoContainer,
  HeaderButtonsRow,
  Docs,
  HamburgerIcon,
  QORTButton,
  Divider,
  LightModeIcon,
  DarkModeIcon,
  DropdownBtn,
  DropdownItem,
  DropdownContainer,
  QortalMainLogo
} from "./Header-styles";
import {
  Box,
  Link,
  Paper,
  Popper,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { MobileDrawer } from "./MobileDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { setTheme } from "../../../state/theme/themeSlice";
import { useDispatch } from "react-redux";
import { oxygen } from "../../../app/fonts";

export const Header = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1193px)");
  const location = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const [openMobileDrawer, setOpenMobileDrawer] = useState<boolean>(false);

  const renderHeader = () => {
    if (location !== "/docs/extension" && location !== "/docs/q-apps") {
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
          {isMobile ? (
            <HamburgerIcon
              color={theme.palette.text.primary}
              height={"18"}
              width={"27"}
              onClickFunc={() => setOpenMobileDrawer(!openMobileDrawer)}
              rotated={{ isOn: openMobileDrawer ? true : false }}
            />
          ) : (
            <HeaderButtonsRow>
              <QORTButton
                className={location === "/" ? "active" : ""}
                onClick={() => {
                  ReactGA.event({
                    category: "User",
                    action: "Clicked Home Button",
                    label: "Home Button"
                  });
                }}
                href="/"
              >
                Home
              </QORTButton>
              <QORTButton
                className={location === "/downloads" ? "active" : ""}
                onClick={() => {
                  ReactGA.event({
                    category: "User",
                    action: "Clicked Downloads Button Header",
                    label: "Downloads Button"
                  });
                }}
                href={"/downloads"}
              >
                Downloads
              </QORTButton>
              <QORTButton
                className={location.includes("/onboarding") ? "active" : ""}
                onClick={() => {
                  ReactGA.event({
                    category: "User",
                    action: "Clicked Onboarding Button Header",
                    label: "Onboarding Button"
                  });
                }}
                href={"/onboarding"}
              >
                Onboarding
              </QORTButton>
              <Docs
                className={location === "/team" ? "active" : ""}
                onClick={() => {
                  ReactGA.event({
                    category: "User",
                    action: "Clicked Team Button",
                    label: "Team Button"
                  });
                }}
                href={"/team"}
              >
                Team
              </Docs>
              <Box
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                sx={{ position: "relative", display: "inline-block" }}
              >
                <DropdownBtn>More</DropdownBtn>

                {open && (
                  <DropdownContainer elevation={3}>
                    <DropdownItem
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked Wiki Qortal Header Desktop",
                          label: "Clicked Wiki Qortal Header Desktop"
                        });
                      }}
                      href="/wiki"
                    >
                      Wiki
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked Blog Qortal Header Desktop",
                          label: "Clicked Blog Qortal Header Desktop"
                        });
                      }}
                      href="/blog"
                    >
                      Blog
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked News Qortal Header Desktop",
                          label: "Clicked News Qortal Header Desktop"
                        });
                      }}
                      href="/news"
                    >
                      News
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked Documentation Page Header Desktop",
                          label: "Clicked Documentation Page Header Desktop"
                        });
                      }}
                      href="/docs/q-apps"
                    >
                      Documentation
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked QORT Page Header Desktop",
                          label: "Clicked QORT Page Header Desktop"
                        });
                      }}
                      href="/qort"
                    >
                      QORT
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked Ebook Qortal Header Desktop",
                          label: "Clicked Ebook Qortal Header Desktop"
                        });
                      }}
                      href="/ebook"
                    >
                      Ebook
                    </DropdownItem>
                  </DropdownContainer>
                )}
              </Box>
            </HeaderButtonsRow>
          )}
        </HeaderNav>
      );
    }
  };

  // Variants for the framer-motion transition

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
