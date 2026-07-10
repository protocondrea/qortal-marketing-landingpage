import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  minHeight: "100vh",
  boxSizing: "border-box",
  padding: "0 16px 36px 16px",
  "@media (min-width: 1194px)": {
    alignItems: "stretch",
    padding: 0,
    overflowX: "hidden",
    background:
      theme.palette.mode === "dark"
        ? "#020713"
        : theme.palette.background.default
  },
  "&.landingPage": {
    "@media (min-width: 1194px)": {
      width: "100%",
      padding: 0,
      overflowX: "hidden",
      background:
        theme.palette.mode === "dark"
          ? "#020713"
          : theme.palette.background.default
    }
  },
  "&.BGImageMain": {
    position: "relative",
    zIndex: 1,
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${"/images/LandingPage/ExtensionBackground.png"})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "40% auto",
      backgroundPosition: "top -100px left -100px",
      filter: "grayscale(100%) opacity(26%)",
      opacity: 0.1,
      zIndex: -1,
      "@media (max-width: 600px)": {
        backgroundPosition: "top",
        backgroundSize: "auto"
      }
    }
  },
  "&.BGImagePromo": {
    backgroundImage:
      theme.palette.mode === "dark"
        ? `url(${"/images/Promo/BlurryBGDarkMode.webp"})`
        : `url(${"/images/Promo/BlurryBGLightMode.webp"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    [theme.breakpoints.down("lg")]: {
      backgroundImage:
        theme.palette.mode === "dark"
          ? `url(${"/images/Promo/BlurryBGDarkModeMobile.webp"})`
          : `url(${"/images/Promo/BlurryBGLightModeMobile.webp"})`,
      backgroundSize: "cover"
    }
  },
  "&.BGImageFeatures": {
    position: "relative",
    zIndex: 1,
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${"/images/Features/FeaturesHexagonBG.png"})`,
      backgroundRepeat: "no-repeat",
      opacity: 0.1,
      zIndex: -1
    }
  },
  "&.BGQORTPage": {
    [theme.breakpoints.down("sm")]: {
      padding: "1rem"
    }
  },
  "&.BGExtensionPage": {
    position: "relative",
    zIndex: 1,
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${"/images/LandingPage/ExtensionBackground.png"})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "40% auto",
      backgroundPosition: "top -100px left -100px",
      filter: "grayscale(100%) opacity(45%)",
      opacity: 0.1,
      zIndex: -1
    }
  }
}));
