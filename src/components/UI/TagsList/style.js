import styled from "@emotion/styled";
import { Paper } from "@mui/material";

// Style
export const StyledPaper = styled(Paper)({
  display: "flex",
  justifyContent: "start",
  flexWrap: "wrap",
  listStyle: "none",
});
export const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
