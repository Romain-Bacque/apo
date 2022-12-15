import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";

// Style
export const BreweriesListContainer = styled(Container)({
  minWidth: "300px",
  height: "100%",
  justifyContent: "start",
  padding: "1rem",
  overflowY: "auto",
});
export const CardBox = styled(Box)({
  padding: "1rem",
  margin: "0 1rem",
  height: "390px",
  overflow: "auto",
});
export const TitleTypography = styled(Typography)({
  textAlign: "center",
});
export const FilterTypography = styled(Typography)({
  color: "gray",
  textAlign: "center",
});
export const NoResultTypography = styled(Typography)({
  margin: "1.5rem",
  textAlign: "center",
});
