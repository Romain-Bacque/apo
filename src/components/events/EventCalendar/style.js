import styled from "@emotion/styled";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { Calendar } from "react-big-calendar";

// Style
export const StyledBox = styled(Box)({
  padding: "1rem",
  borderBottom: "1px solid rgb(200, 200, 200)",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: "1rem",
});
export const Title = styled(Typography)(({ theme }) => ({
  flex: 1.5,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    flex: 1,
  },
}));
export const EventFormButton = styled(Button)({
  flex: 1,
  fontSize: "1rem",
});
export const CalendarBox = styled(Box)({
  height: "400px",
  margin: "2rem",
});
export const StyledCalendar = styled(Calendar)({
  textTransform: "capitalize",
  fontSize: "1.4rem",
  fontFamily: "arial, sans-serif",
  height: "100%",
  padding: "2rem",
  borderRadius: "10px",
  backgroundColor: "white",
  color: "gray",
  "&& .rbc-toolbar": {
    justifyContent: "start",
    gap: "1rem",
  },
});
export const StyledStack = styled(Stack)({
  marginTop: "1.5rem",
  maxWidth: "95%",
});
export const StyledChip = styled(Chip)({
  color: "white",
  fontSize: "1rem",
  fontWeight: "bold",
});
