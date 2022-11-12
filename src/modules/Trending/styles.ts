import { styled } from "@stitches/react";

export const TrendingContainer = styled("div", {
  display: "flex",
  marginTop: "40px",
  maxWidth: "100%",
});

export const ABox = styled("div", {
  display: "inline-block",
  width: "100%",
  textAlign: "center",
  WebkitMaskImage: "linear-gradient(to top, transparent 10%, black 70%)",
  MaskImage: "linear-gradient(to top, transparent 10%, black 70%)",
});

export const ImgContainer = styled("div", {
  height: "230px",
  width: "200px",
  overflow: "hidden",
  borderRadius: "0px 0px 20px 20px",
  display: "inline-block",
  zIndex: 1,

  "& img": {
    transform: "skew(0deg, -10deg)",
    height: "250px",
    margin: "-35px 0px 0px -0px",
    objectFit: "cover",
    WebkitMaskImage: "linear-gradient(to top, transparent 10%, black 100%)",
    maskImage: "linear-gradient(to top, transparent 10%, black 100%)",
    zIndex: 1000,
  },
});

export const InnerSkew = styled("div", {
  display: "inline-block",
  borderRadius: "20px",
  overflow: "hidden",
  padding: "0px",
  transform: "skew(0deg, 10deg)",
  fontSize: "0px",
  margin: "30px 0px 0px 0px",
  background: "#132235",
  height: "250px",
  width: "200px",
  variants: {
    theme: {
      dark: {
        background: "#132235",
      },
      light: {
        background: "#ffffff",
      },
    },
  },
});

export const TextContainer = styled("div", {
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
  padding: "120px 20px 120px 20px",
  borderRadius: "20px",
  background: "#132235",
  margin: "-120px 0px 0px 0px",
  lineHeight: "19px",
  fontSize: "14px",

  variants: {
    theme: {
      dark: {
        background: "#132235",
      },
      light: {
        background: "#ffffff",
        boxShadow: "0px 0px 10px 0px #C5D5E2",
      },
    },
  },

  "& h3": {
    margin: "20px 0px 10px 0px",
    color: "#04bcff",
    fontSize: "18px",
  },
});

export const SelectGeneric = styled("select", {
  backgroundColor: "#132235",
  border: "1px solid #244164",
  borderRadius: "20px",
  width: "200px",
  height: "45px",
  padding: "7px",
  color: "#04bcff",
  fontWeight: "bold",
  boxShadow: "#04bcff 0px 2px 12px",
  opacity: "0.7",

  variants: {
    theme: {
      light: {
        color: "#466D8E",
        backgroundColor: "#C9D6F1",
        border: "1px solid #6691B3",
        boxShadow: "#6691B3 0px 2px 12px",
      },
    },
  },
});

export const GenreSelected = styled("div", {
  position: "fixed",
  top: "280px",
  margin: "auto",
  color: "#132235",
  fontWeight: "bold",
  fontSize: "12rem",
  variants: {
    theme: {
      dark: {
        color: "#132235",
      },
      light: {
        color: "#C9D6F1",
      },
    },
  },
});
