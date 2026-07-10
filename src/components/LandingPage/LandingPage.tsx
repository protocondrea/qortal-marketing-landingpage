"use client";

import {
  Box,
  GlobalStyles,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import dynamic from "next/dynamic";
import Link from "next/link";
import { inter, segoeUIHubHeadline } from "../../app/fonts";
import { QortalSVG } from "../Common/Icons/QortalSVG";
import Demo from "./DemoComponent";

const LandingPagePrevious = dynamic(() => import("./LandingPagePrevious"));

const LandingPage = () => {
  const theme = useTheme();
  const isMobileViewport = useMediaQuery("(max-width: 1193px)");
  const isDarkMode = theme.palette.mode === "dark";
  const pageBackground = isDarkMode ? "#020713" : theme.palette.background.default;
  const heroTextColor = isDarkMode ? "#f7faff" : "#07111f";
  const heroMutedTextColor = isDarkMode
    ? "rgba(242, 247, 255, 0.92)"
    : "rgba(8, 17, 34, 0.78)";
  const heroHelperTextColor = isDarkMode
    ? "rgba(218, 229, 243, 0.78)"
    : "rgba(8, 17, 34, 0.62)";

  if (isMobileViewport) {
    return <LandingPagePrevious />;
  }

  return (
    <>
      <GlobalStyles
        styles={{
          "@media (min-width: 1194px)": {
            html: {
              background: pageBackground
            },
            body: {
              background: pageBackground
            },
            "body::before": {
              display: "none"
            },
            "body::-webkit-scrollbar, body::-webkit-scrollbar-track": {
              background: pageBackground
            }
          }
        }}
      />
      <Box
        className={inter.className}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          isolation: "isolate",
          overflow: "hidden",
          px: "60px",
          pt: "0",
          pb: "42px",
          background: isDarkMode
            ? "radial-gradient(circle at 50% 39%, rgba(37, 137, 247, 0.2), rgba(37, 137, 247, 0.07) 30%, transparent 58%), radial-gradient(circle at 50% -8%, rgba(18, 62, 117, 0.28), transparent 36%), linear-gradient(180deg, #020815 0%, #06101f 42%, #03070d 100%)"
            : "radial-gradient(circle at 50% 39%, rgba(17, 91, 197, 0.1), rgba(17, 91, 197, 0.036) 32%, transparent 58%), radial-gradient(circle at 50% -8%, rgba(17, 91, 197, 0.1), transparent 38%), linear-gradient(180deg, #f5f5f5 0%, #eef4fb 48%, #f5f5f5 100%)",
          "@media (min-width: 1194px)": {
            px: "72px",
            pb: "72px",
            background: isDarkMode
              ? "radial-gradient(ellipse 160% 74% at 50% 44%, rgba(12, 72, 148, 0.028) 0%, rgba(12, 72, 148, 0.012) 46%, transparent 74%), linear-gradient(180deg, #020713 0%, #020713 34%, #030812 52%, #020713 82%, #020713 100%)"
              : "radial-gradient(ellipse 160% 74% at 50% 44%, rgba(17, 91, 197, 0.052) 0%, rgba(17, 91, 197, 0.02) 46%, transparent 74%), linear-gradient(180deg, #f5f5f5 0%, #f5f5f5 34%, #edf4fc 52%, #f5f5f5 82%, #f5f5f5 100%)"
          },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage: isDarkMode
              ? "linear-gradient(rgba(132, 175, 240, 0.014) 1px, transparent 1px), linear-gradient(90deg, rgba(132, 175, 240, 0.012) 1px, transparent 1px), radial-gradient(circle at center, transparent 0%, transparent 55%, rgba(0, 0, 0, 0.46) 100%)"
              : "linear-gradient(rgba(17, 91, 197, 0.026) 1px, transparent 1px), linear-gradient(90deg, rgba(17, 91, 197, 0.022) 1px, transparent 1px), radial-gradient(circle at center, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 60%, rgba(17, 91, 197, 0.045) 100%)",
            backgroundSize: "58px 58px, 58px 58px, 100% 100%",
            opacity: isDarkMode ? 0.52 : 0.38,
            maskImage:
              "radial-gradient(circle at 50% 44%, rgba(0,0,0,0.52), rgba(0,0,0,0.18) 58%, transparent 86%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 44%, rgba(0,0,0,0.52), rgba(0,0,0,0.18) 58%, transparent 86%)",
            "@media (min-width: 1194px)": {
              opacity: 0.34,
              maskImage:
                "linear-gradient(180deg, transparent 0px, transparent 118px, rgba(0, 0, 0, 0.2) 210px, rgba(0, 0, 0, 0.48) 420px, rgba(0, 0, 0, 0.14) 64%, rgba(0, 0, 0, 0.04) 74%, transparent 84%)",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent 0px, transparent 118px, rgba(0, 0, 0, 0.2) 210px, rgba(0, 0, 0, 0.48) 420px, rgba(0, 0, 0, 0.14) 64%, rgba(0, 0, 0, 0.04) 74%, transparent 84%)"
            }
          }
        }}
      >
        <Box
          component="section"
          aria-labelledby="hub-preview-title"
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "1040px",
            mx: "auto",
            mb: "10px",
            textAlign: "center",
            "@media (min-width: 1194px)": {
              minHeight: "256px",
              justifyContent: "center",
              maxWidth: "1180px",
              mb: "18px"
            }
          }}
        >
          <Typography
            component="p"
            sx={{
              mb: "10px",
              color: "#37a8ff",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              "@media (min-width: 1194px)": {
                mb: "22px",
                fontSize: "0.86rem",
                letterSpacing: "0.32em"
              }
            }}
          >
            QORTAL HUB PREVIEW
          </Typography>
          <Typography
            id="hub-preview-title"
            component="h1"
            className={segoeUIHubHeadline.className}
            sx={{
              m: 0,
              color: heroTextColor,
              fontSize: "3.18rem",
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: 0,
              textShadow: isDarkMode
                ? "0 18px 46px rgba(0, 0, 0, 0.36)"
                : "0 14px 34px rgba(17, 91, 197, 0.08)",
              "@media (min-width: 1194px)": {
                position: "relative",
                display: "inline-block",
                fontSize: "5.05rem",
                fontWeight: 450,
                lineHeight: 0.96,
                color: "transparent",
                backgroundImage: isDarkMode
                  ? "linear-gradient(94deg, #ffffff 0%, #f9fcff 38%, #eaf5ff 56%, #bdd9ff 74%, #7f9eff 90%, #9a63ff 100%)"
                  : "linear-gradient(94deg, #07111f 0%, #102849 42%, #115bc5 78%, #167cf0 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textRendering: "geometricPrecision",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                textShadow: isDarkMode
                  ? "0 20px 52px rgba(0, 0, 0, 0.34), 0 0 24px rgba(91, 157, 255, 0.12)"
                  : "0 18px 48px rgba(17, 91, 197, 0.09)",
                "& .headline-shine-text": {
                  position: "relative",
                  display: "inline-block",
                  color: "transparent",
                  backgroundImage: isDarkMode
                    ? "linear-gradient(94deg, #ffffff 0%, #f9fcff 46%, #eaf7ff 100%)"
                    : "linear-gradient(94deg, #07111f 0%, #1c365d 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  isolation: "isolate",
                  textShadow: isDarkMode
                    ? "-0.024em -0.03em 0.154em rgba(78, 174, 255, 0.11), 0 -0.016em 0.055em rgba(213, 244, 255, 0.07)"
                    : "none",
                  "&::before": {
                    content: '"This is"',
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    color: "transparent",
                    backgroundImage:
                      "radial-gradient(ellipse 0.9em 0.26em at 10% 0%, rgba(255, 255, 255, 0.58) 0%, rgba(221, 246, 255, 0.36) 38%, rgba(139, 207, 255, 0.12) 70%, transparent 94%), radial-gradient(ellipse 1.42em 0.32em at 25% 0%, rgba(231, 249, 255, 0.36) 0%, rgba(160, 221, 255, 0.14) 48%, transparent 92%), linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(218, 242, 255, 0.11) 24%, rgba(139, 207, 255, 0.03) 44%, transparent 72%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "none",
                    opacity: isDarkMode ? 0.78 : 0,
                    maskImage:
                      "radial-gradient(ellipse 118% 76% at 14% -8%, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.72) 34%, rgba(0, 0, 0, 0.42) 58%, rgba(0, 0, 0, 0.16) 78%, rgba(0, 0, 0, 0.04) 90%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 118% 76% at 14% -8%, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.72) 34%, rgba(0, 0, 0, 0.42) 58%, rgba(0, 0, 0, 0.16) 78%, rgba(0, 0, 0, 0.04) 90%, transparent 100%)"
                  },
                  "&::after": {
                    content: '"This is"',
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    color: "rgba(69, 174, 255, 0.46)",
                    WebkitTextFillColor: "rgba(69, 174, 255, 0.46)",
                    filter: "blur(11px)",
                    opacity: isDarkMode ? 0.78 : 0,
                    transform: "translate(-0.03em, -0.028em)",
                    mixBlendMode: "screen",
                    maskImage:
                      "radial-gradient(ellipse 98% 72% at 6% -2%, rgba(0, 0, 0, 0.84) 0%, rgba(0, 0, 0, 0.68) 34%, rgba(0, 0, 0, 0.42) 56%, rgba(0, 0, 0, 0.18) 74%, rgba(0, 0, 0, 0.05) 88%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 98% 72% at 6% -2%, rgba(0, 0, 0, 0.84) 0%, rgba(0, 0, 0, 0.68) 34%, rgba(0, 0, 0, 0.42) 56%, rgba(0, 0, 0, 0.18) 74%, rgba(0, 0, 0, 0.05) 88%, transparent 100%)"
                  }
                }
              }
            }}
          >
            <Box component="span" className="headline-shine-text">
              This is
            </Box>{" "}
            Qortal Hub
          </Typography>
          <Typography
            component="p"
            sx={{
              mt: "8px",
              color: heroMutedTextColor,
              fontSize: "1.02rem",
              fontWeight: 400,
              lineHeight: 1.38,
              letterSpacing: 0,
              "@media (min-width: 1194px)": {
                mt: "22px",
                fontSize: "1.45rem",
                lineHeight: 1.36
              }
            }}
          >
            Your gateway to a decentralized internet.
          </Typography>
          <Box
            sx={{
              mt: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: heroHelperTextColor,
              "@media (min-width: 1194px)": {
                mt: "24px",
                gap: "12px"
              }
            }}
          >
            <Box
              component="span"
              sx={{
                width: "18px",
                height: "18px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
                background: isDarkMode
                  ? "rgba(245, 248, 255, 0.12)"
                  : "rgba(17, 91, 197, 0.08)",
                border: isDarkMode
                  ? "1px solid rgba(255, 255, 255, 0.12)"
                  : "1px solid rgba(17, 91, 197, 0.12)",
                color: isDarkMode ? "#9ec8ff" : "#115bc5",
                "@media (min-width: 1194px)": {
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px"
                }
              }}
            >
              <AdsClickIcon
                sx={{
                  fontSize: "12px",
                  "@media (min-width: 1194px)": {
                    fontSize: "17px"
                  }
                }}
              />
            </Box>
            <Typography
              component="span"
              sx={{
                color: heroHelperTextColor,
                fontSize: "0.88rem",
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: 0,
                "@media (min-width: 1194px)": {
                  fontSize: "1.18rem",
                  lineHeight: 1.42
                }
              }}
            >
              Hover any card to understand how Qortal works.
            </Typography>
          </Box>
        </Box>
        <Box
          component="section"
          aria-label="Interactive Qortal Hub preview"
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "1288px",
            mx: "auto",
            display: "flex",
            justifyContent: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-70px",
              left: "50%",
              width: "1060px",
              height: "386px",
              pointerEvents: "none",
              transform: "translateX(-50%)",
              borderRadius: "999px",
              background:
                "radial-gradient(circle, rgba(47, 143, 245, 0.24), rgba(47, 143, 245, 0.085) 42%, transparent 73%)",
              filter: "blur(12px)",
              zIndex: 0,
              "@media (min-width: 1194px)": {
                display: "none"
              }
            },
            "&::after": {
              content: '""',
              position: "absolute",
              left: "50%",
              bottom: "-28px",
              width: "900px",
              height: "76px",
              pointerEvents: "none",
              transform: "translateX(-50%)",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.42)",
              filter: "blur(30px)",
              zIndex: 0,
              "@media (min-width: 1194px)": {
                display: "none"
              }
            },
            "& #hub-preview-root": {
              position: "relative",
              zIndex: 1,
              isolation: "isolate"
            },
            "& #hub-preview-root::before, & #hub-preview-root::after": {
              content: '""',
              position: "absolute",
              display: "none",
              pointerEvents: "none"
            },
            "@media (min-width: 1194px)": {
              maxWidth: "1440px",
              "&::before": {
                display: "block",
                top: "-320px",
                left: "50%",
                width: "240vw",
                maxWidth: "4200px",
                height: "1480px",
                transform: "translateX(-52%)",
                borderRadius: 0,
                background:
                  "radial-gradient(ellipse 940px 1160px at calc(50% - 820px) 62%, rgba(12, 72, 148, 0.13) 0%, rgba(12, 72, 148, 0.068) 36%, rgba(12, 72, 148, 0.026) 60%, transparent 80%), radial-gradient(ellipse 800px 1040px at calc(50% + 820px) 58%, rgba(12, 72, 148, 0.105) 0%, rgba(12, 72, 148, 0.055) 40%, rgba(12, 72, 148, 0.02) 64%, transparent 82%), radial-gradient(ellipse 1480px 620px at 52% 54%, rgba(12, 72, 148, 0.04) 0%, rgba(12, 72, 148, 0.018) 48%, transparent 78%)",
                filter: "blur(132px)",
                opacity: 0.78,
                zIndex: 0,
                maskImage:
                  "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.72) 16%, rgba(0, 0, 0, 0.82) 48%, rgba(0, 0, 0, 0.28) 72%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.72) 16%, rgba(0, 0, 0, 0.82) 48%, rgba(0, 0, 0, 0.28) 72%, transparent 100%)"
              },
              "&::after": {
                display: "block",
                top: "-180px",
                left: "50%",
                bottom: "auto",
                width: "210vw",
                maxWidth: "3600px",
                height: "1080px",
                transform: "translateX(-46%)",
                borderRadius: 0,
                background:
                  "radial-gradient(ellipse 840px 820px at 15% 62%, rgba(12, 72, 148, 0.06) 0%, rgba(12, 72, 148, 0.028) 46%, transparent 80%), radial-gradient(ellipse 720px 780px at 88% 56%, rgba(12, 72, 148, 0.052) 0%, rgba(12, 72, 148, 0.024) 48%, transparent 82%)",
                filter: "blur(180px)",
                opacity: 0.54,
                zIndex: 0,
                maskImage:
                  "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.62) 18%, rgba(0, 0, 0, 0.74) 50%, rgba(0, 0, 0, 0.22) 74%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.62) 18%, rgba(0, 0, 0, 0.74) 50%, rgba(0, 0, 0, 0.22) 74%, transparent 100%)"
              },
              "&& .hub-shell": {
                boxShadow:
                  "inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(124, 195, 255, 0.12), 0 46px 160px rgba(0, 0, 0, 0.42), 0 26px 210px rgba(0, 0, 0, 0.28), -68px 0 230px rgba(12, 72, 148, 0.05), 58px 0 210px rgba(12, 72, 148, 0.042), 0 -18px 130px rgba(12, 72, 148, 0.075), 0 0 0 1px rgba(0, 0, 0, 0.24)"
              },
              "&& .hub-shell::after": {
                content: '""',
                position: "absolute",
                inset: "-18px -58px -86px",
                zIndex: -1,
                pointerEvents: "none",
                borderRadius: "34px",
                background:
                  "radial-gradient(ellipse 82% 28% at 50% 104%, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.16) 46%, transparent 78%), radial-gradient(ellipse 102% 56% at 50% 46%, rgba(12, 72, 148, 0.055) 0%, rgba(12, 72, 148, 0.022) 48%, transparent 78%)",
                filter: "blur(34px)",
                opacity: 0.82
              },
              "&& .hub-shell::before": {
                borderTop: "1px solid rgba(122, 172, 224, 0.34)",
                borderRight: "1px solid rgba(122, 172, 224, 0.085)",
                borderLeft: "1px solid rgba(122, 172, 224, 0.085)",
                boxShadow:
                  "0 -2px 42px rgba(12, 72, 148, 0.17), inset 0 1px 10px rgba(12, 72, 148, 0.045)"
              },
              "&& .hub-card--apps": {
                animation: "none",
                borderColor: "rgba(132, 175, 240, 0.17)",
                boxShadow:
                  "inset 0 1px 0 rgba(255, 255, 255, 0.055), 0 14px 36px rgba(0, 0, 0, 0.22), 0 0 28px rgba(12, 72, 148, 0.04)"
              },
              "&& .hub-card--apps::before": {
                display: "none"
              },
              "&& .hub-card--apps::after": {
                display: "none"
              },
              "&& .hub-card--apps > .edge-light": {
                display: "none"
              },
              "&& .hub-card--apps:hover .hub-card__body::before, && .hub-card--apps.is-active .hub-card__body::before": {
                opacity: 0
              },
              "& #hub-preview-root::before": {
                display: "block",
                top: "-122px",
                right: "-16%",
                left: "-16%",
                height: "238px",
                zIndex: -1,
                borderRadius: "999px",
                background:
                  "radial-gradient(ellipse at 50% 76%, rgba(12, 72, 148, 0.32) 0%, rgba(12, 72, 148, 0.18) 34%, rgba(12, 72, 148, 0.072) 62%, rgba(12, 72, 148, 0.022) 82%, transparent 96%)",
                filter: "blur(82px)",
                opacity: 0.7,
                maskImage:
                  "radial-gradient(ellipse 90% 70% at 50% 68%, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.5) 48%, rgba(0, 0, 0, 0.16) 76%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 70% at 50% 68%, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.5) 48%, rgba(0, 0, 0, 0.16) 76%, transparent 100%)"
              },
              "& #hub-preview-root::after": {
                display: "block",
                top: "-500px",
                right: "-1280px",
                bottom: "-540px",
                left: "-1380px",
                zIndex: -2,
                borderRadius: 0,
                background:
                  "radial-gradient(ellipse 1320px 1780px at 24% 58%, rgba(12, 72, 148, 0.09) 0%, rgba(12, 72, 148, 0.048) 44%, rgba(12, 72, 148, 0.016) 68%, transparent 86%), radial-gradient(ellipse 1180px 1680px at 82% 54%, rgba(12, 72, 148, 0.078) 0%, rgba(12, 72, 148, 0.04) 46%, rgba(12, 72, 148, 0.014) 70%, transparent 88%), radial-gradient(ellipse 1680px 840px at 48% 54%, rgba(12, 72, 148, 0.026) 0%, transparent 78%)",
                filter: "blur(190px)",
                opacity: 0.5,
                maskImage:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.78) 42%, rgba(0, 0, 0, 0.2) 70%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.78) 42%, rgba(0, 0, 0, 0.2) 70%, transparent 100%)"
              }
            },
            "& .hub-shell": {
              position: "relative",
              zIndex: 1,
              borderColor: "rgba(132, 175, 240, 0.14)",
              boxShadow:
                "inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 1px 0 rgba(124, 195, 255, 0.22), 0 34px 106px rgba(0, 0, 0, 0.56), -28px 0 88px rgba(47, 143, 245, 0.14), 28px 0 88px rgba(47, 143, 245, 0.14), 0 -8px 48px rgba(84, 169, 255, 0.24), 0 0 0 1px rgba(0, 0, 0, 0.24)"
            },
            "& .hub-shell::before": {
              content: '""',
              position: "absolute",
              inset: "-1px",
              zIndex: 2,
              pointerEvents: "none",
              borderRadius: "inherit",
              borderTop: "1px solid rgba(126, 193, 255, 0.42)",
              borderRight: "1px solid rgba(126, 193, 255, 0.11)",
              borderLeft: "1px solid rgba(126, 193, 255, 0.11)",
              boxShadow:
                "0 -2px 34px rgba(72, 159, 255, 0.26), inset 0 1px 14px rgba(126, 193, 255, 0.105)"
            }
          }}
        >
          <Demo />
        </Box>
        <Box
          component="section"
          aria-label="Download Qortal Hub"
          sx={{
            position: "relative",
            zIndex: 1,
            display: "none",
            width: "100%",
            maxWidth: "1344px",
            mx: "auto",
            mt: "28px",
            "@media (min-width: 1194px)": {
              display: "block"
            }
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "30px",
              minHeight: "102px",
              px: "46px",
              py: "24px",
              overflow: "hidden",
              border: isDarkMode
                ? "1px solid rgba(132, 175, 240, 0.14)"
                : "1px solid rgba(17, 91, 197, 0.12)",
              borderRadius: "8px",
              background: isDarkMode
                ? "linear-gradient(180deg, rgba(11, 19, 34, 0.88), rgba(5, 11, 22, 0.94))"
                : "linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(239, 245, 252, 0.86))",
              boxShadow: isDarkMode
                ? "inset 0 1px 0 rgba(255, 255, 255, 0.055), inset 0 -1px 0 rgba(12, 72, 148, 0.08), 0 24px 86px rgba(0, 0, 0, 0.22), 0 -14px 72px rgba(12, 72, 148, 0.035)"
                : "inset 0 1px 0 rgba(255, 255, 255, 0.72), 0 22px 64px rgba(17, 91, 197, 0.08)",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: "0",
                pointerEvents: "none",
                background: isDarkMode
                  ? "radial-gradient(ellipse 36% 130% at 2% 50%, rgba(12, 72, 148, 0.14), transparent 70%), radial-gradient(ellipse 34% 120% at 94% 48%, rgba(12, 72, 148, 0.09), transparent 72%)"
                  : "radial-gradient(ellipse 36% 130% at 2% 50%, rgba(17, 91, 197, 0.08), transparent 70%), radial-gradient(ellipse 34% 120% at 94% 48%, rgba(17, 91, 197, 0.055), transparent 72%)",
                opacity: isDarkMode ? 0.68 : 0.54
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                right: "18px",
                left: "18px",
                height: "1px",
                pointerEvents: "none",
                background: isDarkMode
                  ? "linear-gradient(90deg, transparent, rgba(132, 175, 240, 0.2) 18%, rgba(132, 175, 240, 0.14) 58%, transparent)"
                  : "linear-gradient(90deg, transparent, rgba(17, 91, 197, 0.14) 18%, rgba(17, 91, 197, 0.09) 58%, transparent)"
              }
            }}
          >
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: 0
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  width: "50px",
                  height: "50px",
                  flex: "0 0 auto",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "50%",
                  color: "#35a8ff",
                  background: isDarkMode
                    ? "radial-gradient(circle at 48% 45%, rgba(57, 168, 255, 0.16), rgba(12, 72, 148, 0.08) 64%, rgba(6, 12, 24, 0.92) 100%)"
                    : "radial-gradient(circle at 48% 45%, rgba(57, 168, 255, 0.12), rgba(17, 91, 197, 0.055) 68%, rgba(255, 255, 255, 0.82) 100%)",
                  border: isDarkMode
                    ? "1px solid rgba(95, 151, 255, 0.34)"
                    : "1px solid rgba(17, 91, 197, 0.2)",
                  boxShadow: isDarkMode
                    ? "inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 0 22px rgba(12, 72, 148, 0.18)"
                    : "inset 0 1px 0 rgba(255, 255, 255, 0.74), 0 0 18px rgba(17, 91, 197, 0.08)"
                }}
              >
                <QortalSVG color="currentColor" width="25" height="27" />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  component="h2"
                  sx={{
                    m: 0,
                    color: isDarkMode ? "#f5f9ff" : "#07111f",
                    fontSize: "1rem",
                    fontWeight: 800,
                    lineHeight: 1.24,
                    letterSpacing: 0
                  }}
                >
                  Ready to experience the full power of Qortal?
                </Typography>
                <Typography
                  sx={{
                    mt: "4px",
                    color: isDarkMode
                      ? "rgba(218, 229, 243, 0.64)"
                      : "rgba(8, 17, 34, 0.58)",
                    fontSize: "0.86rem",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    letterSpacing: 0
                  }}
                >
                  Download Qortal Hub and start your journey.
                </Typography>
              </Box>
            </Box>
            <Box
              component={Link}
              href="/downloads"
              sx={{
                position: "relative",
                zIndex: 1,
                flex: "0 0 auto",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                minWidth: "168px",
                height: "38px",
                px: "16px",
                borderRadius: "7px",
                color: "#ffffff",
                background: "linear-gradient(180deg, #2088f6 0%, #136fd8 100%)",
                border: "1px solid rgba(137, 197, 255, 0.28)",
                boxShadow:
                  "0 10px 20px rgba(19, 118, 237, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                textDecoration: "none",
                fontSize: "0.8rem",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: 0,
                transition:
                  "transform 150ms ease, box-shadow 150ms ease, filter 150ms ease, border-color 150ms ease",
                "&:focus-visible": {
                  outline: "1px solid rgba(245, 248, 255, 0.72)",
                  outlineOffset: "4px"
                },
                "@media (hover: hover) and (pointer: fine)": {
                  "&:hover": {
                    transform: "translateY(-1px)",
                    filter: "brightness(1.04)",
                    borderColor: "rgba(245, 248, 255, 0.58)",
                    boxShadow:
                      "0 16px 30px rgba(19, 118, 237, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.28)"
                  }
                }
              }}
            >
              Download Qortal Hub
              <FileDownloadRoundedIcon sx={{ fontSize: "18px" }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
