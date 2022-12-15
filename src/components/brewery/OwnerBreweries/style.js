import styled from "@emotion/styled";
import { Box, Button, Container, Typography } from "@mui/material";

// Style
export const BreweriesContainer = styled(Container)({
  display: "block",
  height: "calc(100vh - 7rem)",
  width: "1000px",
  maxWidth: "90%",
  padding: "2rem",
});
export const Title = styled(Box)({
  padding: "1rem",
  borderBottom: "1px solid rgb(200, 200, 200)",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: "1rem",
});
export const TitleText = styled(Typography)(({ theme }) => ({
  flex: 1.5,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    flex: 1,
  },
}));
export const TitleButton = styled(Button)({
  flex: 1,
  fontSize: "1rem",
});
export const BreweryCardBox = styled(Box)({
  marginTop: "3rem",
  overflowY: "auto",
  height: "65vh",
});
export const NoResultTypography = styled(Typography)({
  margin: "1.5rem",
  textAlign: "center",
});
