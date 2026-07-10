import { styled } from "@mui/system";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { DarkModeSVG } from "../../Common/Icons/DarkModeSVG";
import { HamburgerSVG } from "../../Common/Icons/HamburgerSVG";
import { LightModeSVG } from "../../Common/Icons/LightModeSVG";

interface HamburgerIconProps {
  rotated?: { isOn: boolean };
}

export const HeaderNav = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "0 180px 0 59px",
  height: "125px",
  "&::before": {
    content: "''",
    backgroundColor: theme.palette.background.default,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    margin: "0 -16px"
  },
  [theme.breakpoints.only("xs")]: {
    height: "120px",
    padding: "0"
  }
}));

export const Divider = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: -9,
  left: 0,
  right: 0,
  marginLeft: "-41.5px",
  marginRight: "-16px",
  width: "-webkit-fill-available",
  height: "1px",
  backgroundColor: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}));

export const ThemeSelectRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "80px",
  [theme.breakpoints.down("sm")]: {
    gap: "16px"
  }
}));

export const QortalLogoContainer = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "3px",
  userSelect: "none",
  cursor: "pointer",
  textDecoration: "none",
  padding: "25px 0",
  [theme.breakpoints.down("sm")]: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)"
  }
}));

export const LightModeIcon = styled(LightModeSVG)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "20px",
    height: "20px"
  }
}));

export const DarkModeIcon = styled(DarkModeSVG)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "20px",
    height: "20px"
  }
}));

export const QortalMainLogo = styled(Image)(({ theme }) => ({
  objectFit: "contain",
  userSelect: "none",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "auto"
  }
}));

export const HamburgerIcon = styled(HamburgerSVG)<HamburgerIconProps>(
  ({ rotated }) => ({
    position: "absolute",
    right: 0,
    top: "50px",
    transition: "all 0.3s ease-in-out",
    transform: rotated?.isOn ? "rotate(90deg)" : "rotate(0deg)",
    cursor: "pointer"
  })
);
