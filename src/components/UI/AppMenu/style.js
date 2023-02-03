import styled from "@emotion/styled";
import { MenuRounded } from "@mui/icons-material";
import { MenuItem } from "@mui/material";

// Style
export const StyledMenuItem = styled(MenuItem)({
  textTransform: "capitalize",
  margin: "1rem 0",
  fontSize: "1.4rem",
  fontWeight: "bold",
  color: "rgb(75, 75, 75)",
  "&.active": {
    borderLeft: "2px solid gray",
    backgroundColor: "transparent",
  },
});
export const StyledMenuRounded = styled(MenuRounded)({
  fontSize: "2.5rem",
  color: "white",
});
