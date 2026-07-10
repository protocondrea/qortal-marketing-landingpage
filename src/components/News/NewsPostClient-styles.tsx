import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { lucidaSans, redditSans, roboto } from "../../app/fonts";
import Image from "next/image";

export const NewsPostContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "25px 600px",
  "@media(max-width: 1700px)": {
    padding: "25px 500px"
  },
  "@media(max-width: 1600px)": {
    padding: "25px 400px"
  },
  "@media(max-width: 1300px)": {
    padding: "25px 150px"
  },
  [theme.breakpoints.down("md")]: {
    padding: "25px 100px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 4px"
  }
}));

export const BackToNewsButton = styled(Button)(({ theme }) => ({
  fontFamily: roboto.style.fontFamily,
  fontSize: "16px",
  display: "flex",
  gap: "18px",
  borderRadius: "8px",
  backgroundColor: theme.palette.mode === "dark" ? "#D2D2D2" : "#61757F",
  border: theme.palette.mode === "dark" ? "none" : "1px solid #000000",
  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
  transition: "all 0.3s ease-in-out",
  marginBottom: "23px",
  padding: "7px 12",
  height: "30px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.mode === "dark" ? "#D2D2D2" : "#61757F",
    filter: "brightness(0.85)"
  }
}));

export const NewsTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start"
}));

export const NewsPostMainImage = styled(Image)({
  width: "100%",
  height: "300px",
  objectFit: "contain",
  userSelect: "none"
});

export const NewsSubContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%"
}));

export const NewsPostTitle = styled("h1")(({ theme }) => ({
  fontFamily: lucidaSans.style.fontFamily,
  fontSize: "24px",
  fontWeight: 400,
  lineHeight: "33px",
  letterSpacing: 0,
  marginBottom: "20px",
  textAlign: "center",
  color: theme.palette.text.primary,
  margin: "0 0 20px 0"
}));

export const NewsPostBody = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "100%",
  wordWrap: "break-word",
  fontFamily: redditSans.style.fontFamily,
  fontSize: "18px",
  fontWeight: 300,
  letterSpacing: "0.2px",
  color: theme.palette.text.primary,
  "& p": {
    lineHeight: "1.6"
  },
  "& a": {
    color: "#39a8ff",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
    transition: "color 160ms ease"
  },
  "& a:hover, & a:focus-visible": {
    color: "#ffffff"
  },
  "& img": {
    marginTop: "10px !important",
    maxWidth: "100%"
  }
}));
