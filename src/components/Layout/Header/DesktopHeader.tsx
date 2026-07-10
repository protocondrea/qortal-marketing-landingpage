"use client";

import { Box, useTheme } from "@mui/material";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ReactGA from "react-ga4";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { inter } from "../../../app/fonts";
import { QortalSVG } from "../../Common/Icons/QortalSVG";
import { setTheme } from "../../../state/theme/themeSlice";

type NavLink = {
  label: string;
  href: string;
};

type NavDropdown = {
  label: string;
  items: NavLink[];
};

type NavItem = NavLink | NavDropdown;

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Downloads", href: "/downloads" },
  { label: "Get Started", href: "/onboarding" },
  { label: "QORT", href: "/qort" },
  { label: "Team", href: "/team" },
  {
    label: "Build",
    items: [{ label: "Documentation", href: "/docs/q-apps" }]
  },
  {
    label: "Learn",
    items: [
      { label: "Wiki", href: "/wiki" },
      { label: "Ebook", href: "/ebook" },
      { label: "Blog", href: "/blog" },
      { label: "News", href: "/news" }
    ]
  }
];

const isDropdown = (item: NavItem): item is NavDropdown => "items" in item;

const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

export const DesktopHeader = () => {
  const dispatch = useDispatch();
  const location = usePathname();
  const theme = useTheme();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (item: NavItem) => {
    if (isDropdown(item)) {
      return item.items.some(({ href }) =>
        href === "/" ? location === href : location.startsWith(href)
      );
    }

    if (item.href === "/") return location === "/";
    if (item.href === "/onboarding") return location.startsWith("/onboarding");
    return location === item.href || location.startsWith(`${item.href}/`);
  };

  const trackHeaderClick = (label: string) => {
    ReactGA.event({
      category: "User",
      action: `Clicked ${label} Header`,
      label
    });
  };

  const isDarkMode = theme.palette.mode === "dark";
  const headerBackground = isDarkMode ? "#020713" : theme.palette.background.default;
  const primaryNavColor = isDarkMode ? "#ffffff" : "#07111f";
  const mutedNavColor = isDarkMode
    ? "rgba(240, 247, 255, 0.88)"
    : "rgba(8, 17, 34, 0.72)";
  const navTextShadow = isDarkMode
    ? "0 1px 14px rgba(0, 0, 0, 0.35)"
    : "none";

  return (
    <Box
      component="header"
      className={`${inter.className} site-header`}
      sx={{
        position: "relative",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        width: "100%",
        height: "112px",
        background: headerBackground,
        "&::after": {
          display: "none"
        }
      }}
    >
      <Box
        className="site-header-inner"
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "calc(100% - clamp(84px, 9.6vw, 168px))",
          maxWidth: "1760px",
          height: "112px"
        }}
      >
      <Box
        component={Link}
        href="/"
        prefetch={false}
        onClick={() => trackHeaderClick("Home")}
        sx={{
          position: "relative",
          zIndex: 1,
          display: "inline-flex",
          alignItems: "center",
          gap: "9px",
          width: "166px",
          color: "#10a7ff",
          textDecoration: "none",
          transition: "opacity 150ms ease, transform 150ms ease",
          "& svg": {
            display: "block",
            color: "#10a7ff",
            fill: "#10a7ff"
          },
          "& path": {
            fill: "#10a7ff"
          },
          "&:hover": {
            opacity: 0.9,
            transform: "translateY(-1px)"
          }
        }}
      >
        <QortalSVG color="#10a7ff" width="31" height="33" />
        <Box
          component="span"
          sx={{
            color: isDarkMode ? "#f7fbff" : "#07111f",
            fontSize: "23.5px",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: 0
          }}
        >
          Qortal
        </Box>
      </Box>

      <Box
        component="nav"
        aria-label="Primary navigation"
        sx={{
          position: "absolute",
          zIndex: 2,
          top: 0,
          left: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "112px",
          gap: "clamp(30px, 2.85vw, 48px)",
          transform: "translateX(-50%)"
        }}
      >
        {navItems.map((item) => {
          const active = isActive(item);

          if (!isDropdown(item)) {
            return (
              <Box
                key={item.href}
                component={Link}
                href={item.href}
                prefetch={false}
                onClick={() => trackHeaderClick(item.label)}
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  height: "112px",
                  color: active ? primaryNavColor : mutedNavColor,
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: 0,
                  textDecoration: "none",
                  textShadow: navTextShadow,
                  transition: "color 150ms ease",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: "50%",
                    bottom: "26px",
                    width: "100%",
                    height: "2px",
                    transform: "translateX(-50%)",
                    borderRadius: "999px",
                    background: "#39a8ff",
                    opacity: active ? 1 : 0,
                    boxShadow: active
                      ? "0 0 11px rgba(57, 168, 255, 0.46)"
                      : "none",
                    transition: "none"
                  },
                  "&:hover": {
                    color: primaryNavColor,
                    "&::after": {
                      opacity: 1
                    }
                  }
                }}
              >
                {item.label}
              </Box>
            );
          }

          return (
            <Box
              key={item.label}
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
              sx={{ position: "relative", height: "112px" }}
            >
              <Box
                component="button"
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === item.label ? null : item.label)
                }
                onFocus={() => setOpenDropdown(item.label)}
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  height: "112px",
                  p: 0,
                  border: 0,
                  background: "transparent",
                  color: active ? primaryNavColor : mutedNavColor,
                  fontFamily: "inherit",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: 0,
                  cursor: "pointer",
                  textShadow: navTextShadow,
                  transition: "color 150ms ease",
                  "& svg": {
                    fontSize: "17px",
                    opacity: 0.76,
                    transform:
                      openDropdown === item.label
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 150ms ease, opacity 150ms ease"
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: "50%",
                    bottom: "26px",
                    width: "100%",
                    height: "2px",
                    transform: "translateX(-50%)",
                    borderRadius: "999px",
                    background: "#39a8ff",
                    opacity: active ? 1 : 0,
                    boxShadow: active
                      ? "0 0 11px rgba(57, 168, 255, 0.46)"
                      : "none",
                    transition: "none"
                  },
                  "&:hover": {
                    color: primaryNavColor,
                    "&::after": {
                      opacity: 1
                    },
                    "& svg": {
                      opacity: 1
                    }
                  }
                }}
              >
                {item.label}
                <KeyboardArrowDownRoundedIcon />
              </Box>

              <AnimatePresence>
                {openDropdown === item.label && (
                  <Box
                    component={motion.div}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    sx={{
                      position: "absolute",
                      top: "80px",
                      left: "50%",
                      minWidth: item.label === "Learn" ? "172px" : "190px",
                      p: "8px",
                      borderRadius: "10px",
                      background: isDarkMode
                        ? "linear-gradient(180deg, rgba(8, 18, 34, 0.98), rgba(3, 9, 18, 0.98))"
                        : "linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(244, 247, 252, 0.98))",
                      border: isDarkMode
                        ? "1px solid rgba(132, 175, 240, 0.16)"
                        : "1px solid rgba(17, 91, 197, 0.14)",
                      boxShadow:
                        isDarkMode
                          ? "0 24px 48px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                          : "0 22px 42px rgba(17, 37, 70, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.78)",
                      transformOrigin: "top center",
                      translate: "-50% 0"
                    }}
                  >
                    {item.items.map((dropdownItem) => (
                      <Box
                        key={dropdownItem.href}
                        component={Link}
                        href={dropdownItem.href}
                        prefetch={false}
                        onClick={() => trackHeaderClick(dropdownItem.label)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          minHeight: "34px",
                          px: "10px",
                          borderRadius: "7px",
                          color: isDarkMode
                            ? "rgba(235, 244, 255, 0.82)"
                            : "rgba(8, 17, 34, 0.74)",
                          fontSize: "13.5px",
                          fontWeight: 650,
                          textDecoration: "none",
                          transition:
                            "background-color 140ms ease, color 140ms ease, transform 140ms ease",
                          "&:hover": {
                            color: primaryNavColor,
                            backgroundColor: isDarkMode
                              ? "rgba(57, 168, 255, 0.12)"
                              : "rgba(17, 91, 197, 0.08)",
                            transform: "translateX(2px)"
                          }
                        }}
                      >
                        {dropdownItem.label}
                      </Box>
                    ))}
                  </Box>
                )}
              </AnimatePresence>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          ml: "auto"
        }}
      >
        <Box
          component={Link}
          href="/downloads"
          prefetch={false}
          onClick={() => trackHeaderClick("Download Hub")}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "9px",
            width: "166px",
            height: "42px",
            borderRadius: "7px",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: 0,
            textDecoration: "none",
            background: "linear-gradient(180deg, #2f9cff 0%, #167cf0 100%)",
            border: "1px solid rgba(137, 197, 255, 0.42)",
            boxShadow:
              "0 12px 26px rgba(22, 124, 240, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.28)",
            transition:
              "transform 150ms ease, box-shadow 150ms ease, filter 150ms ease",
            "& svg": {
              fontSize: "17px"
            },
            "&:hover": {
              transform: "translateY(-1px)",
              filter: "brightness(1.04)",
              boxShadow:
                "0 16px 30px rgba(22, 124, 240, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
            }
          }}
        >
          Download Hub
          <FileDownloadRoundedIcon />
        </Box>

        <Box
          component="button"
          type="button"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => dispatch(setTheme(isDarkMode ? "light" : "dark"))}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "42px",
            height: "42px",
            p: 0,
            borderRadius: "7px",
            border: isDarkMode
              ? "1px solid rgba(137, 197, 255, 0.18)"
              : "1px solid rgba(17, 91, 197, 0.16)",
            color: isDarkMode ? "rgba(246, 251, 255, 0.82)" : "#0b1a30",
            background: isDarkMode
              ? "linear-gradient(180deg, rgba(18, 32, 55, 0.82), rgba(7, 16, 31, 0.82))"
              : "linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(235, 241, 249, 0.92))",
            boxShadow: isDarkMode
              ? "inset 0 1px 0 rgba(255, 255, 255, 0.08)"
              : "inset 0 1px 0 rgba(255, 255, 255, 0.78)",
            cursor: "pointer",
            transition:
              "color 150ms ease, border-color 150ms ease, background-color 150ms ease, transform 150ms ease",
            "& svg": {
              fontSize: "20px"
            },
            "&:hover": {
              color: isDarkMode ? "#ffffff" : "#050b18",
              borderColor: isDarkMode
                ? "rgba(137, 197, 255, 0.28)"
                : "rgba(17, 91, 197, 0.28)",
              transform: "translateY(-1px)"
            },
            "&:focus-visible": {
              outline: "2px solid rgba(57, 168, 255, 0.75)",
              outlineOffset: "3px"
            }
          }}
        >
          {isDarkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
        </Box>
      </Box>
      </Box>
    </Box>
  );
};
