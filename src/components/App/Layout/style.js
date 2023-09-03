import styled from "@emotion/styled";
import { Box } from "@mui/material";
// background image import
import barrel from "./barrels.jpg";

// Style
export const Main = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 13rem)",
  background: "rgb(250, 250, 250, 0.98)",
  fontFamily: "Silkscreen",
  overflowY: "auto",
  "&::before": {
    content: '""',
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
});
