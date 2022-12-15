import styled from "@emotion/styled";
import { RadioGroup } from "@mui/material";
import { Link } from "react-router-dom";

// Style
export const AlreadyRegisteredLink = styled(Link)({
  display: "inline-block",
  marginTop: "1rem",
  fontSize: "0.8rem",
  fontWeight: 700,
  textTransform: "uppercase",
  width: "fit-content",
  color: "#c45d32",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});
export const StyledRadioGroup = styled(RadioGroup)({
  display: "inline-block",
});
