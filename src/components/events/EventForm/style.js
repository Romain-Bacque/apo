import styled from "@emotion/styled";
import { Button, CardActions, Divider, Typography } from "@mui/material";

// Style
export const StyledTypography = styled(Typography)({
  marginBottom: "2rem",
});
export const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));
export const StyledDivider = styled(Divider)({
  marginTop: "1rem",
});
export const StyledCardActions = styled(CardActions)({
  padding: 0,
  paddingTop: "2rem",
});
