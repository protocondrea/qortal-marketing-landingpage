import { styled } from "@mui/system";
import { Box } from "@mui/material";
import Link from "next/link";
import { inter, oxygen } from "../../../app/fonts";

export const FooterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  flexShrink: 0,
  padding: 0,
  background: "transparent",
  "@media (min-width: 1194px)": {
    alignSelf: "stretch",
    background:
      theme.palette.mode === "dark"
        ? "#020713"
        : theme.palette.background.default
  },
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center"
  }
}));

export const FooterInner = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "25px 30px 0 30px",
  gap: "15px",
  marginTop: "auto",
  "@media (min-width: 1194px)": {
    width: "calc(100% - clamp(84px, 9.6vw, 168px))",
    maxWidth: "1760px",
    gap: "14px",
    marginTop: 0,
    padding: "12px 0 40px 0",
    "& > div:first-of-type": {
      gap: "18px"
    },
    "& > div:first-of-type svg": {
      opacity: theme.palette.mode === "dark" ? 0.54 : 0.62,
      filter: "none",
      transition: "opacity 140ms ease, transform 140ms ease"
    },
    "& > div:first-of-type svg:hover": {
      opacity: theme.palette.mode === "dark" ? 0.82 : 0.88,
      transform: "translateY(-1px)"
    }
  },
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
    padding: "15px 0"
  }
}));

export const FooterRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "42px",
  marginTop: "10px",
  "@media (min-width: 1194px)": {
    gap: "clamp(36px, 4.2vw, 64px)",
    marginTop: 0
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "20px",
    flexDirection: "column",
    gap: "24px"
  }
}));

export const FooterLink = styled(Link)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  textTransform: "uppercase",
  backgroundColor: "transparent",
  fontFamily: oxygen.style.fontFamily,
  fontSize: "18px",
  color: theme.palette.mode === "light" ? "#686355" : "#ABA28A",
  height: "48px",
  borderRadius: "2px",
  padding: "10px 15px",
  userSelect: "none",
  textDecoration: "none",
  transition: "all 0.3s ease-in-out",
  "&.active ": {
    "&::after": {
      width: "100%",
      backgroundColor: theme.palette.text.primary,
      height: "2px",
      position: "absolute",
      content: "''",
      bottom: "3px"
    }
  },
  "&::after": {
    position: "absolute",
    width: "0%",
    height: "2px",
    backgroundColor: theme.palette.text.primary,
    content: "''",
    bottom: "3px",
    transition: "all 0.3s ease-in-out"
  },
  "&:hover": {
    cursor: "pointer",
    color: theme.palette.mode === "light" ? "#000000" : "#ffffff",
    "&::after": {
      width: "100%",
      backgroundColor: theme.palette.text.primary,
      height: "2px",
      position: "absolute",
      content: "''",
      bottom: "3px"
    }
  },
  "@media (min-width: 1194px)": {
    height: "38px",
    padding: "8px 4px",
    "&&": {
      color:
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.62)"
          : "rgba(10, 18, 32, 0.62)"
    },
    fontFamily: inter.style.fontFamily,
    fontSize: "0.78rem",
    fontWeight: 520,
    textTransform: "none",
    letterSpacing: "0.045em",
    lineHeight: 1,
    transition: "color 160ms ease",
    "&::after": {
      display: "none"
    },
    "&&:hover, &&:focus, &&:focus-visible": {
      color: theme.palette.mode === "dark" ? "#ffffff" : "#050b18"
    },
    "&:hover::after, &:focus::after, &:focus-visible::after": {
      display: "none"
    }
  }
}));
