"use client";
import { createTheme } from "@mui/material/styles";

const commonThemeOptions = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          padding: "0px",
          margin: "0px",
          boxSizing: "border-box",
          minHeight: "100%"
        },
        html: {
          minHeight: "100%",
          scrollBehavior: "smooth",
          "@media (min-width: 1194px)": {
            scrollbarGutter: "stable"
          }
        },
        body: {
          minHeight: "100%"
        },
        "body > div:first-of-type": {
          minHeight: "100%"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "inherit",
          transition: "filter 0.3s ease-in-out",
          "&:hover": {
            filter: "brightness(1.1)"
          }
        }
      },
      defaultProps: {
        disableElevation: true,
        disableRipple: true
      }
    }
  },
  typography: {
    fontFamily:
      "'Museo', 'Raleway', 'Montserrat', 'Inter', 'Cairo', 'Oxygen', 'Roboto', 'Nanum Gothic', 'Lovelo', 'Helvetica', 'Arial', 'Kadwa', 'Protest Strike', 'PT Sans', 'Spartan', 'Magistral', 'Monoton', 'Futura', 'Futura Light', 'Fredoka One', 'Reddit Sans', 'Segoe UI', 'Lucida Sans Unicode'",
    button: {
      textTransform: "none"
    },
    h1: {
      fontSize: "42px"
    },
    h2: {
      fontSize: "32px"
    },
    h3: {
      fontSize: "21px"
    },
    h4: {
      fontSize: "18px"
    },
    h5: {
      fontSize: "16px"
    },
    h6: {
      fontSize: "14px"
    },
    body1: {
      fontSize: "18px"
    },
    body2: {
      fontSize: "16px"
    }
  },
  spacing: 8, // Customize the base spacing unit (default is 8)
  shape: {
    borderRadius: 4 // Customize the border radius of components
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1921
    }
  }
});

const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: "light",
    primary: {
      main: "#115bc5",
      dark: "#d6d6db",
      light: "#f4f4f8"
    },
    secondary: {
      main: "#115bc5",
      light: "#7f7cf5ff",
      dark: "#303047"
    },
    background: {
      default: "#f5f5f5"
    },
    text: {
      primary: "#000000",
      secondary: "#525252"
    },
    customBlue: {
      main: "#0085FF"
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          minHeight: "100%"
        },
        html: {
          minHeight: "100%",
          scrollBehavior: "smooth",
          "@media (min-width: 1194px)": {
            scrollbarGutter: "stable"
          }
        },
        body: {
          minHeight: "100%"
        },
        "body > div:first-of-type": {
          minHeight: "100%"
        },
        "body::-webkit-scrollbar-track": {
          backgroundColor: "transparent"
        },
        "body::-webkit-scrollbar": {
          width: "16px",
          height: "10px"
        },
        "body::-webkit-scrollbar-thumb": {
          backgroundColor: "#0085FF",
          borderRadius: "8px",
          backgroundClip: "content-box",
          border: "4px solid transparent"
        },
        "body::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#0478e4"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            cursor: "pointer",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
          }
        }
      }
    },
    MuiIcon: {
      defaultProps: {
        style: {
          color: "#000000"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            cursor: "pointer",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
          }
        }
      },
      defaultProps: {
        disableElevation: true,
        disableRipple: true
      }
    }
  }
});

const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: "dark",
    primary: {
      main: "#115bc5",
      dark: "#043596",
      light: "#a9cae9"
    },
    secondary: {
      main: "#359ff7ff",
      light: "#5657b1",
      dark: "#302F40"
    },
    background: {
      default: "#060a1e"
    },
    text: {
      primary: "#ffffff",
      secondary: "#bfb9b9"
    },
    customBlue: {
      main: "#0085FF"
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          minHeight: "100%"
        },
        html: {
          minHeight: "100%",
          scrollBehavior: "smooth",
          "@media (min-width: 1194px)": {
            scrollbarGutter: "stable"
          }
        },
        body: {
          minHeight: "100%"
        },
        "body > div:first-of-type": {
          minHeight: "100%"
        },
        "body::-webkit-scrollbar-track": {
          backgroundColor: "transparent"
        },
        "body::-webkit-scrollbar": {
          width: "16px",
          height: "10px"
        },
        "body::-webkit-scrollbar-thumb": {
          backgroundColor: "#0085FF",
          borderRadius: "8px",
          backgroundClip: "content-box",
          border: "4px solid transparent"
        },
        "body::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#0478e4"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            cursor: "pointer",
            boxShadow:
              "0px 4px 5px 0px hsla(0,0%,0%,0.14), 0px 1px 10px 0px hsla(0,0%,0%,0.12), 0px 2px 4px -1px hsla(0,0%,0%,0.2)"
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          transition: "filter 0.3s ease-in-out",
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "inherit",
            boxShadow:
              "0px 4px 5px 0px hsla(0,0%,0%,0.14), 0px 1px 10px 0px hsla(0,0%,0%,0.12), 0px 2px 4px -1px hsla(0,0%,0%,0.2)"
          }
        }
      },
      defaultProps: {
        disableElevation: true,
        disableRipple: true
      }
    }
  }
});

export { lightTheme, darkTheme };
