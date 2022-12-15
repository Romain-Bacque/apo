import styled from "@emotion/styled";
import { Box, Button, Divider } from "@mui/material";

// Style
export const StyledTypography = styled(Box)({
  display: "flex",
  gap: 0.5,
  fontStyle: "italic",
  fontSize: "1.3rem",
  color: "gray",
});
export const MoreDetailsButton = styled(Button)({
  marginTop: "2rem",
  marginLeft: "auto",
  marginRight: "auto",
});
export const StyledDivider = styled(Divider)({
  marginTop: "1rem",
});
