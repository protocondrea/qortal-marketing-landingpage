import { styled } from "@mui/system";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { futura, inter, oxygen, redditSans } from "../../app/fonts";
import { ChromeStoreSVG } from "../Common/Icons/ChromeStoreSVG";
import { AppleSVG } from "../Common/Icons/AppleSVG";
import { AndroidSVG } from "../Common/Icons/AndroidSVG";

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "106px 90px 106px 90px",
  width: "100%",
  "@media(max-width: 1444px)": {
    padding: "50px 20px 34px 20px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 20px 25px 20px",
    width: "100%"
  }
}));

export const MainRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "0.3fr 1fr",
  alignItems: "flex-start",
  width: "100%",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr"
  }
}));

export const MainCol = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "22px",
  width: "100%"
}));

export const DownloadsTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontFamily: futura.style.fontFamily,
  color: theme.palette.text.primary,
  fontWeight: 400,
  fontSize: "55px",
  lineHeight: "73px",
  letterSpacing: "calc(0.09 * 55px)",
  userSelect: "none",
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
    lineHeight: "35px"
  }
}));

export const DownloadContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "72px"
}));

export const DownloadUIRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
});

export const DownloadCoreRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}));

export const DownloadsUIGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "12px",
  "@media(max-width: 751px)": {
    gridTemplateColumns: "repeat(3, 1fr)"
  }
});

export const DownloadsCoreGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px"
});

export const DownloadCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  textAlign: "center",
  flexGrow: 1,
  backgroundColor: theme.palette.mode === "light" ? "#2F2F2F" : "#ffffff",
  padding: "12px",
  borderRadius: "5px",
  width: "125px",
  height: "auto",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    cursor: "pointer",
    boxShadow:
      theme.palette.mode === "light"
        ? "none"
        : "0px 12px 17px 2px hsla(0, 0%, 100%, 0.08), 0px 5px 22px 4px hsla(0, 0%, 100%, 0.09), 0px 7px 8px -4px hsla(0, 0%, 100%, 0.2),  0px 0px 10px rgba(255, 255, 255, 0.1)",
    backgroundColor: theme.palette.mode === "dark" ? "#56AEFF" : "#003E78"
  }
}));

export const DownloadCol = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "40px"
}));

export const DownloadSubCol = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "22px",
  width: "100%",
  [theme.breakpoints.down("lg")]: {
    alignItems: "center"
  }
}));

export const DownloadTextCol = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "8px"
}));

export const DownloadText = styled(Typography)(({ theme }) => ({
  fontFamily: redditSans.style.fontFamily,
  color: theme.palette.text.primary,
  fontWeight: 300,
  fontSize: "30px",
  marginTop: "98px",
  lineHeight: "43px",
  alignSelf: "flex-start",
  userSelect: "none",
  [theme.breakpoints.down("lg")]: {
    alignSelf: "center"
  }
}));

export const DownloadSubText = styled(Typography)(({ theme }) => ({
  fontFamily: redditSans.style.fontFamily,
  color: theme.palette.text.primary,
  fontWeight: 300,
  fontSize: "20px",
  lineHeight: "28px",
  alignSelf: "flex-start",
  userSelect: "none",
  [theme.breakpoints.down("lg")]: {
    alignSelf: "center"
  },
  [theme.breakpoints.down("sm")]: {
    textAlign: "center"
  }
}));

export const DownloadText1 = styled(Typography)(({ theme }) => ({
  fontFamily: oxygen.style.fontFamily,
  color: theme.palette.mode === "light" ? "#ffffff" : "#000000",
  fontWeight: 400,
  fontSize: "20px",
  lineHeight: "22px",
  userSelect: "none"
}));

export const DownloadText2 = styled(Typography)(({ theme }) => ({
  fontFamily: redditSans.style.fontFamily,
  color: theme.palette.mode === "light" ? "#ffffff" : "#000000",
  fontWeight: 400,
  fontSize: "24px",
  lineHeight: "24px",
  userSelect: "none",
  "@media(max-width: 1243px)": {
    fontSize: "20px"
  },
  "@media(max-width: 1127px)": {
    fontSize: "28px"
  },
  [theme.breakpoints.down("md")]: {
    lineHeight: "25px"
  },
  "@media(max-width: 743px)": {
    fontSize: "24px"
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "28px",
    lineHeight: "28px"
  }
}));

export const DownloadText3 = styled(Typography)(({ theme }) => ({
  fontFamily: oxygen.style.fontFamily,
  color: theme.palette.mode === "light" ? "#ffffff" : "#000000",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "22px",
  userSelect: "none"
}));

export const OtherVersionsCol = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  gap: "20px",
  marginTop: "50px"
}));

export const OtherVersionsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
}));

export const OtherVersionsText = styled(Typography)(({ theme }) => ({
  fontFamily: oxygen.style.fontFamily,
  color: theme.palette.text.primary,
  fontWeight: 300,
  fontSize: "18px",
  lineHeight: "22px",
  userSelect: "none",
  "& a": {
    textDecoration: "none",
    color: theme.palette.customBlue.main,
    marginLeft: "5px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      filter: "brightness(0.9)"
    }
  },
  [theme.breakpoints.down("md")]: {
    lineHeight: "40px",
    textAlign: "center"
  }
}));

export const ScreenshotContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "127px",
  zIndex: 0,
  [theme.breakpoints.down("lg")]: {
    display: "none"
  }
}));

export const ScreenshotCol = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

export const Screenshot1 = styled(Image)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%",
  height: "auto",
  objectFit: "contain"
}));

export const Screenshot2 = styled(Image)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%",
  height: "auto",
  objectFit: "contain",
  position: "relative",
  top: "-70px",
  left: "700px",
  zIndex: 5,

  [theme.breakpoints.down("xl")]: {
    top: "-70px",
    left: "500px"
  },
  "@media(max-width: 1387px)": {
    left: "400px"
  },
  [theme.breakpoints.down("lg")]: {
    display: "none"
  }
}));

export const Screenshot3 = styled(Image)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%",
  height: "auto",
  objectFit: "contain"
}));

export const DownloadNowText = styled(Typography)(({ theme }) => ({
  fontFamily: oxygen.style.fontFamily,
  color: theme.palette.text.primary,
  fontWeight: 400,
  fontSize: "50px",
  letterSpacing: 0,
  lineHeight: "65px",
  marginTop: "200px",
  textAlign: "center",
  userSelect: "none",
  [theme.breakpoints.down("lg")]: {
    marginTop: "70px"
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
    lineHeight: "35px"
  }
}));

export const ChromeStoreLogo = styled(ChromeStoreSVG)({});

export const AppleLogo = styled(AppleSVG)({});

export const AndroidIcon = styled(AndroidSVG)({});

export const IPhoneRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "98px",
  "@media(max-width: 731px)": {
    marginTop: "50px",
    marginBottom: "40px",
    gap: "60px",
    gridTemplateColumns: "auto",
    gridTemplateRows: "repeat(5, 1fr)"
  }
}));

export const CommandLineModalContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: "50px",
  left: "20px",
  width: "450px",
  height: "auto",
  backgroundColor: theme.palette.mode === "light" ? "#D9D9D9" : "#111112",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  gap: "20px",
  zIndex: 6
}));

export const CommandLineModalContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

export const CommandLineModalText = styled(Typography)(({ theme }) => ({
  fontFamily: inter.style.fontFamily,
  fontSize: "15px",
  letterSpacing: 0,
  color: theme.palette.text.primary,
  textAlign: "center",
  userSelect: "none"
}));
