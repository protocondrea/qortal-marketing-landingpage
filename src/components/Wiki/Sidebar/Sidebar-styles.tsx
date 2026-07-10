import { styled, textTransform } from "@mui/system";
import { Box, Button, Typography } from "@mui/material";
import { oxygen } from "../../../app/fonts";
import { ChevronRightSVG } from "../../Common/Icons/ChevronRightSVG";

type SidebarContainerProps = {
  showInFullScreenMobile: boolean;
  isMobile: boolean;
};

type SidebarProps = {
  isActive: boolean;
  id: string;
};

type SidebarDropdownProps = {
  isExpanded: boolean;
  isToggled: boolean;
  showInFullScreenMobile: boolean;
};

export const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "showInFullScreenMobile" && prop !== "isMobile"
})<SidebarContainerProps>(({ isMobile, showInFullScreenMobile, theme }) => ({
  position: showInFullScreenMobile ? "fixed" : "sticky",
  top: showInFullScreenMobile ? "unset" : "20px",
  display: !showInFullScreenMobile && isMobile ? "none" : "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: showInFullScreenMobile ? "center" : "unset",
  gap: "20px",
  height: showInFullScreenMobile ? "100vh" : "70vh",
  width: showInFullScreenMobile ? "100%" : "auto",
  overflowY: "auto",
  padding: "0 44px 20px 0",
  backgroundColor: theme.palette.background.default,
  transition: "all 0.3s ease-in-out",
  "@media (min-width: 1194px)": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "#020713"
        : theme.palette.background.default
  },
  "&::-webkit-scrollbar": {
    width: "2px"
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.mode === "light" ? "#C0C0C0" : "#595656"
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.mode === "light" ? "#141414" : "#D9D9D9",
    borderRadius: 0,
    minHeight: "170px"
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.mode === "light" ? "#000000" : "#bbbbbb"
  },
  "@media(max-width: 1086px)": {
    gap: "38px"
  }
}));

export const SectionTitleRow = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "isExpanded" &&
    prop !== "showInFullScreenMobile" &&
    prop !== "isToggled"
})<SidebarDropdownProps>(
  ({ theme, isExpanded, showInFullScreenMobile, isToggled }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "51px",
    padding: "0 18px",
    borderRadius: "4px",
    transition: "all 0.3s ease-in-out",
    backgroundColor:
      theme.palette.mode === "dark" && isToggled && !showInFullScreenMobile
        ? "#D9D9D9"
        : theme.palette.mode === "light" && isToggled && !showInFullScreenMobile
          ? "#000000"
          : "transparent",
    "& p": {
      color:
        theme.palette.mode === "dark" && isToggled && !showInFullScreenMobile
          ? "#000000"
          : theme.palette.mode === "light" &&
              isToggled &&
              !showInFullScreenMobile
            ? "#ffffff"
            : "inherit"
    },
    "@media(max-width: 1086px)": {
      height: "auto"
    },
    "&:hover": {
      cursor: "pointer",
      ...(isToggled || showInFullScreenMobile
        ? {} // Don’t override if it’s already active
        : {
            backgroundColor:
              theme.palette.mode === "dark" ? "#D9D9D9" : "#000000",
            "& p": {
              color: theme.palette.mode === "dark" ? "#000000" : "#ffffff"
            },
            "& svg": {
              fill: theme.palette.mode === "dark" ? "#000000" : "#ffffff"
            }
          })
    }
  })
);

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: oxygen.style.fontFamily,
  fontSize: "20px",
  fontWeight: "500",
  lineHeight: "27px",
  color: theme.palette.text.primary,
  userSelect: "none",
  transition: "all 0.3s ease-in-out",
  [theme.breakpoints.down("lg")]: {
    fontSize: "18px"
  },
  "@media(max-width: 1086px)": {
    textTransform: "uppercase",
    fontWeight: "bold",
    height: "auto"
  }
}));

export const ChevronIcon = styled(ChevronRightSVG, {
  shouldForwardProp: (prop) => prop !== "isExpanded" && prop !== "isToggled"
})<SidebarDropdownProps>(({ isExpanded, isToggled, theme }) => ({
  transform: isExpanded ? "rotate(-90deg)" : "rotate(90deg)",
  transition: "all 0.3s ease-in-out",
  "& svg": {
    fill:
      (isExpanded || isToggled) && theme.palette.mode === "dark"
        ? "#000000"
        : (isExpanded || isToggled) && theme.palette.mode === "light"
          ? "#ffffff"
          : theme.palette.text.primary
  }
}));

export const SectionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px"
}));

export const SectionList = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  margin: "0 0 0 46px",
  listStyleType: "none",
  padding: 0
}));

export const SectionListItem = styled("li", {
  shouldForwardProp: (prop) => prop !== "isActive" && prop !== "id"
})<SidebarProps>(({ theme, isActive, id }) => {
  return {
    position: "relative" as const,
    fontFamily: oxygen.style.fontFamily,
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "27px",
    color: theme.palette.text.primary,
    userSelect: "none",
    cursor: "pointer",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px"
    },
    "&::before": {
      content: "''",
      backgroundColor: theme.palette.text.primary,
      position: "absolute" as const,
      left: "-24px",
      width: "6px",
      height: "15px",
      top: "6.5px",
      opacity: isActive ? 1 : 0,
      transition: "opacity 0.3s ease-in-out"
    }
  };
});

export const ContributeButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignSelf: "center",
  marginTop: "20px",
  fontFamily: oxygen.style.fontFamily,
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "27px",
  letterSpacing: 0,
  width: "181px",
  height: "43px",
  padding: "10px 30px 10px 30px",
  gap: "7px",
  borderRadius: "30px",
  border: `1px solid ${theme.palette.text.primary}`,
  color: theme.palette.text.primary,
  backgroundColor: "transparent",
  boxShadow: "none",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "@media(max-width: 1086px)": {
    marginTop: "2px"
  },
  "&:hover": {
    boxShadow: "1px 4px 10.5px 0px #0000004D",
    backgroundColor: "#F3F3F3",
    border:
      theme.palette.mode === "dark"
        ? `1px solid ${theme.palette.text.primary}`
        : "1px solid #F3F3F3",
    color: "#000000"
  }
}));
