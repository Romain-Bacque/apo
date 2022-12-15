import styled from "@emotion/styled";
import { SportsBar } from "@mui/icons-material";
import { Box, Divider, Link, Typography } from "@mui/material";

// Style
export const FooterContainer = styled(Box)({
  height: "6rem",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  alignItems: "center",
  padding: "0.5rem 2rem",
  borderTop: "1px solid rgb(230, 230, 230)",
  backgroundColor: "white",
});
export const FooterNav = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "auto",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
export const FooterLink = styled(Link)(({ theme }) => ({
  fontSize: "1.2rem",
  display: "flex",
  gap: ".5rem",
  cursor: "pointer",
  textDecoration: "none",
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(2),
  },
}));
export const StyledDivider = styled(Divider)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
export const BrandContainer = styled(Box)({
  padding: "0.5rem",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "start",
  alignItems: "center",
});
export const BrandLink = styled(Box)({
  margin: "0.5rem 0.5rem 0.5rem 0",
  display: "flex",
  alignItems: "center",
  color: "#f2cc96",
  underline: "none",
});
export const BrandLogo = styled(SportsBar)({
  verticalAlign: "end",
  fontSize: "2.8rem",
  color: "#f2cc96",
  marginRight: "0.4rem",
});
export const BrandText = styled(Typography)({
  width: "50px",
  fontWeight: "700",
  fontSize: "1.1rem",
});
