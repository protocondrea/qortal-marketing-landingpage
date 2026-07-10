"use client";
import ReactGA from "react-ga4";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Wrapper } from "../components/Layout/Main/MainLayout-styles";
import { store } from "../state/store";
import { usePathname } from "next/navigation";
import { Header } from "../components/Layout/Header/Header";
import { Footer } from "../components/Layout/Footer/Footer";
import ThemeProviderWrapper from "./theme-provider";

// Initialize Google Analytics
ReactGA.initialize("G-E1BB62FVTN");

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const location = usePathname();
  const [desktopViewportHeight, setDesktopViewportHeight] = useState<
    number | null
  >(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const setViewportHeight = () => {
      const isDesktop = window.matchMedia("(min-width: 1194px)").matches;

      setDesktopViewportHeight(isDesktop ? window.innerHeight : null);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  // For editor routes (including /editor/view), don't wrap with header/footer
  const isEditorRoute = location.startsWith("/editor");

  if (isEditorRoute) {
    return (
      <Provider store={store}>
        <ThemeProviderWrapper>
          <CssBaseline />
          {children}
        </ThemeProviderWrapper>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <ThemeProviderWrapper>
        <CssBaseline />
        <Wrapper
          className={
            !location.includes("/docs") && !location.includes("/")
              ? "BGImageMain"
              : location === "/"
                ? "landingPage"
                : ""
          }
          style={
            desktopViewportHeight
              ? { minHeight: `${desktopViewportHeight}px` }
              : undefined
          }
        >
          <Header />
          <Box
            component="main"
            className="site-main"
            sx={{
              width: "100%",
              display: "flex",
              flex: "1 0 auto",
              flexDirection: "column",
              "@media (min-width: 1194px)": {
                alignItems: "stretch"
              }
            }}
          >
            {children}
          </Box>
          <Footer />
        </Wrapper>
      </ThemeProviderWrapper>
    </Provider>
  );
}

export default LayoutProvider;
