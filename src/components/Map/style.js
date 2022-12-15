import styled from "@emotion/styled";
import { Box } from "@mui/material";

// Style
export const StyledContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.5rem",
  margin: "auto",
  padding: "3rem",
  width: "90%",
  maxWidth: "1200px",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    height: "calc(100vh - 7rem)",
    padding: "0rem 0 6rem",
    alignItems: "stretch",
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    height: "calc(100vh - 13rem)",
  },
}));
export const StyledMapContainer = styled(Box)(({ theme }) => ({
  flex: 2,
  height: "100%",
  position: "relative",
  borderRadius: "10px",
  overflow: "hidden",
  "& .leaflet-container": {
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 0,
  },
  [theme.breakpoints.down("md")]: {
    borderRadius: "0",
  },
}));
export const SwitchContainer = styled(Box)(({ theme }) => ({
  margin: "0 1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid lightgray",
  textAlign: "center",
  boxSizing: "border-box",
  height: "5rem",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));
export const BreweriesContainer = styled(Box)(({ theme }) => ({
  flex: 1.5,
  backgroundColor: "white",
  transition: "0.3s ease-out",
  alignSelf: "stretch",
  borderRadius: "10px",
  border: "1px solid rgb(230, 230, 230)",
  [theme.breakpoints.down("md")]: {
    borderRadius: "0",
    boxShadow: "none",
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 3,
    bottom: "6rem",
    transform: "translateY(100%)",
    "&.active": {
      bottom: "100%",
    },
  },
}));
