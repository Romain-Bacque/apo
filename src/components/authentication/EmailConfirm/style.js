import styled from "@emotion/styled";
import { Box, Container } from "@mui/material";
import { Link } from 'react-router-dom'

export const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.4rem",
  paddingTop: "10rem",
});
export const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  gap: "1.4rem",
});
export const StyledLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  color: "inherit",
  textDecoration: "none",
});
