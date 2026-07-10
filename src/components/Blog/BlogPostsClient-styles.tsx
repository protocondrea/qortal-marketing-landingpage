import { Box, styled } from "@mui/system";
import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  TextField,
  Theme,
  Typography
} from "@mui/material";
import { cairo, futura, oxygen, redditSans, segoeUI } from "../../app/fonts";
import Image from "next/image";
import { CloseSVG } from "../Common/Icons/CloseSVG";
import { AddPhotoSVG } from "../Common/Icons/AddPhotoSVG";
import Link from "next/link";

export const BlogContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  padding: "25px 10px",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: "25px 0"
  }
}));

export const ProductImagesRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px"
});

export const ImagePreviewRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px"
});

export const ImagePreview = styled(Image)({
  width: "100px",
  height: "100px",
  objectFit: "contain",
  userSelect: "none",
  borderRadius: "3px",
  marginBottom: "10px"
});

export const CloseIcon = styled(CloseSVG)({
  position: "absolute",
  top: "0",
  right: "8px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.1)"
  }
});

const customInputStyle = (theme: Theme) => {
  return {
    fontFamily: oxygen.style.fontFamily,
    fontSize: "18px",
    fontWeight: 300,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    borderColor: theme.palette.background.paper,
    "& label": {
      color: theme.palette.mode === "light" ? "#808183" : "#edeef0",
      fontFamily: oxygen.style.fontFamily,
      fontSize: "18px",
      letterSpacing: "0px"
    },
    "& label.Mui-focused": {
      color: theme.palette.mode === "light" ? "#A0AAB4" : "#d7d8da"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.mode === "light" ? "#B2BAC2" : "#c9cccf"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E3E7"
      },
      "&:hover fieldset": {
        borderColor: "#B2BAC2"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6F7E8C"
      }
    },
    "& .MuiInputBase-root": {
      fontFamily: oxygen.style.fontFamily,
      fontSize: "18px",
      letterSpacing: "0px"
    },
    "& .MuiFilledInput-root:after": {
      borderBottomColor: theme.palette.secondary.main
    }
  };
};

export const CustomInputField = styled(TextField)(({ theme }) =>
  customInputStyle(theme as Theme)
);

export const AddImageButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#fff",
  fontFamily: oxygen.style.fontFamily,
  fontSize: "17px",
  padding: "5px 10px",
  borderRadius: "5px",
  gap: "5px",
  border: "none",
  transition: "all 0.3s ease-in-out",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 4px 5px 0px hsla(0,0%,0%,0.14),  0px 1px 10px 0px hsla(0,0%,0%,0.12),  0px 2px 4px -1px hsla(0,0%,0%,0.2)"
      : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  marginBottom: "5px",
  "&:hover": {
    cursor: "pointer",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0px 8px 10px 1px hsla(0,0%,0%,0.14), 0px 3px 14px 2px hsla(0,0%,0%,0.12), 0px 5px 5px -3px hsla(0,0%,0%,0.2)"
        : "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;",
    backgroundColor: theme.palette.secondary.dark
  }
}));

export const AddImageIcon = styled(AddPhotoSVG)({
  color: "#fff",
  height: "25px",
  width: "auto"
});

export const ButtonRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

export const CreateButton = styled(Button)({
  fontFamily: oxygen.style.fontFamily,
  fontSize: "15px",
  backgroundColor: "#32d43a",
  color: "black",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#2bb131"
  }
});

export const FiltersContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: "#ffffff",
  borderRadius: "10px",
  padding: "0 15px 10px 15px",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 4px 5px 0px hsla(0,0%,0%,0.14),  0px 1px 10px 0px hsla(0,0%,0%,0.12),  0px 2px 4px -1px hsla(0,0%,0%,0.2)"
      : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
}));

export const FiltersSubContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "5px"
}));

export const FiltersTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  margin: "20px 0",
  fontFamily: oxygen.style.fontFamily,
  fontSize: "17px",
  color: "#ffffff",
  userSelect: "none"
}));

export const FiltersCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#c0d4ff",
  "&.Mui-checked": {
    color: "#6596ff"
  }
}));

export const FiltersOption = styled("li")(({ theme }) => ({
  fontFamily: oxygen.style.fontFamily,
  fontSize: "17px",
  color: theme.palette.text.primary,
  userSelect: "none",
  paddingTop: "2px !important",
  paddingBottom: "2px !important"
}));

export const FiltersChip = styled(Chip)(({ theme }) => ({
  fontFamily: oxygen.style.fontFamily,
  fontSize: "13px",
  color: theme.palette.text.primary,
  userSelect: "none"
}));

export const FilterSelect = styled(Autocomplete)(({ theme }) => ({
  "& #categories-select": {
    padding: "7px"
  },
  "& [class*='MuiInputBase-root-MuiOutlinedInput-root']": {
    gap: "5px"
  },
  '& [class*="MuiFormLabel-root-MuiInputLabel-root"]': {
    fontFamily: oxygen.style.fontFamily,
    fontSize: "17px",
    color: "#ffffff",
    userSelect: "none",
    height: "25px"
  }
}));

export const FilterSelectMenuItems = styled(TextField)(({ theme }) => ({
  '& [class*="MuiInputBase-input"]': {
    fontFamily: oxygen.style.fontFamily,
    fontSize: "17px",
    color: "#ffffff",
    userSelect: "none"
  }
}));

export const MainBlogWrapper = styled(Box)(({ theme }) => ({
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

export const BlogPageTitle = styled(Typography)(({ theme }) => ({
  fontFamily: futura.style.fontFamily,
  fontWeight: "400",
  fontSize: "55px",
  letterSpacing: "calc(0.09*55px)",
  color: theme.palette.text.primary,
  userSelect: "none",
  textAlign: "center"
}));

export const BlogPostsContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(368px, 1fr))",
  alignItems: "flex-start",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "15px",
  padding: "25px 10px",
  width: "100%"
});

export const BlogPostCard = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "368px",
  height: "382px",
  margin: "0 auto",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "0 0 0 1px rgba(255, 255, 255, 0)",
  transition:
    "transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease",
  "&:focus-visible": {
    outline: "1px solid rgba(0, 136, 204, 0.65)",
    outlineOffset: "6px"
  },
  "@media (hover: hover) and (pointer: fine)": {
    "&:hover": {
      transform: "translateY(-2px)",
      backgroundColor:
        theme.palette.mode === "light"
          ? "rgba(2, 7, 19, 0.025)"
          : "rgba(255, 255, 255, 0.018)",
      boxShadow:
        theme.palette.mode === "light"
          ? "0 12px 28px rgba(2, 7, 19, 0.1), 0 0 0 1px rgba(0, 136, 204, 0.16)"
          : "0 16px 38px rgba(0, 0, 0, 0.26), 0 0 0 1px rgba(77, 166, 255, 0.14)"
    },
    "&:hover img": {
      filter: "brightness(1.04)"
    }
  },
  [theme.breakpoints.down("sm")]: {
    width: "330px"
  }
}));

export const BlogSubContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "10px",
  "& p": {
    margin: 0
  }
});

export const BlogPostImage = styled(Image)({
  display: "block",
  width: "328px",
  height: "220px",
  margin: "0 auto",
  objectFit: "contain",
  userSelect: "none",
  transition: "filter 180ms ease"
});

export const BlogPostTitle = styled(Typography)({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  fontFamily: redditSans.style.fontFamily,
  color: "#0088CC",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "25.6px",
  letterSpacing: 0,
  userSelect: "none"
});

export const BlogPostBody = styled(Box)(({ theme }) => ({
  fontFamily: redditSans.style.fontFamily,
  color: theme.palette.mode === "light" ? "#333333" : "#888888",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "22.4px",
  letterSpacing: 0,
  userSelect: "none",
  display:
    "-webkit-box" /* Ensures multiline content is treated as a block container */,
  WebkitBoxOrient: "vertical" /* Required for clamping */,
  WebkitLineClamp: 4 /* Adjust this number to the desired number of lines */,
  overflow: "hidden" /* Hides the overflowing content */,
  textOverflow: "ellipsis" /* Adds the ellipsis when content overflows */,
  "& h1": {
  fontSize: "13px",
  margin: 0,
},
  "& h2": {
  fontSize: "13px",
  margin: 0,
}
}));

export const BlogDateAndCategoryCol = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "8px",
  padding: "0 10px"
});

export const Divider = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "1px",
  backgroundColor: theme.palette.secondary.main
}));

export const BlogPostDate = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: "5px",
  left: "10px",
  fontFamily: redditSans.style.fontFamily,
  color: "#888888",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "19.2px",
  letterSpacing: 0,
  userSelect: "none"
}));

export const BlogCategoriesRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "5px",
  flexWrap: "wrap"
});

export const BlogPostCategory = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  fontFamily: segoeUI.style.fontFamily,
  fontWeight: "400",
  letterSpacing: "0.24px",
  fontSize: "14px",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.dark,
  padding: "6px 20px",
  borderRadius: "8px",
  userSelect: "none"
}));
