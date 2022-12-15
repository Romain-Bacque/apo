import styled from "@emotion/styled";
import { Box, Card, CardContent, Typography } from "@mui/material";

// Style
export const StyledCard = styled(Card)({
  minHeight: "120px",
  width: "100%",
  margin: "auto",
  display: "flex",
  justifyContent: "space-between",
  borderRadius: "10px",
  border: "1px solid rgb(230, 230, 230)",
});
export const StyledBox = styled(Box)({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "#f2cc96",
  color: "white",
});
export const TitleTypography = styled(Typography)({
  backgroundColor: "#d9b88a",
  fontWeight: 700,
  padding: "2rem 1rem",
});
export const StyledCardContent = styled(CardContent)({
  flex: "1.5",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
export const EventDescription = styled(CardContent)({
  overflowY: "auto",
  maxHeight: "2rem",
  marginBottom: "1rem",
});
