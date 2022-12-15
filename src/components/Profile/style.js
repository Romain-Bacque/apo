import styled from "@emotion/styled";
import { Button, Container, Divider } from "@mui/material";

// Style
export const ProfileContainer = styled(Container)({
  width: "500px",
  maxWidth: "90%",
  padding: "3rem",
  backgroundColor: "white",
  borderRadius: "10px",
  border: "1px solid rgb(230, 230, 230)",
});
export const StyledDivider = styled(Divider)({
  margin: "1rem 0",
});
export const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));
