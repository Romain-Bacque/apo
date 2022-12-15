import styled from "@emotion/styled";
import { SportsBarRounded } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

// Style
export const LogoBox = styled(Box)({
  display: "flex",
  marginRight: "4rem",
  alignItems: "center",
  gap: 1.5,
});
export const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
});
export const StyledSportsBar = styled(SportsBarRounded)({
  fontSize: "4rem",
  color: "white",
});
export const StyledAppBar = styled(AppBar)({
  position: "sticky",
  boxShadow: "none",
  height: "7rem",
});
export const TitleTypography = styled(Typography)({
  fontFamily: "Yellowtail, sans-serif",
  textTransform: "capitalize",
  fontSize: "1.5rem",
  letterSpacing: "0.4rem",
  fontWeight: "bold",
  color: "white",
  width: "12rem",
});
export const SearchBarContainer = styled("div")({
  width: "60%",
});
