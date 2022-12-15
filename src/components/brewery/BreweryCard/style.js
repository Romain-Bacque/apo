import styled from "@emotion/styled";
import {
  Button,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";

// Style
export const StyledCardMedia = styled(CardMedia)({
  height: "140px",
  width: "100%",
});
export const StyledTypography = styled(Typography)({
  display: "flex",
  gap: 0.5,
  fontStyle: "italic",
  fontSize: "1.3rem",
  color: "gray",
});
export const StyledCardContent = styled(CardContent)({
  textAlign: "start",
});
export const StyledDivider = styled(Divider)({
  margin: "2rem 0",
});
export const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));
