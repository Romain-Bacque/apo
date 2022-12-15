import styled from "@emotion/styled";
import { Box, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

// Style
export const StyledCard = styled(Card)({
  padding: 0.5,
  border: "none",
  width: "200px",
  borderRadius: "0",
});
export const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  padding: "2rem 0",
});
export const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 0.6,
});
export const StyledLink = styled(Link)({
  display: "inline-block",
  width: "100%",
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginTop: "2rem",
  textAlign: "center",
});
