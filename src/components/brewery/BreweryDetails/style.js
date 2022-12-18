import styled from "@emotion/styled";
import { Map } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { Swiper } from "swiper/react";

// Style
export const BreweryDetailsContainer = styled(Container)({
  width: "900px",
  maxWidth: "90%",
});
export const BreweryDetailsCard = styled(Card)({
  marginBottom: "1rem",
  borderRadius: "10px",
  border: "1px solid rgb(230, 230, 230)",
});
export const BreweryDescription = styled(Typography)({
  margin: "1rem auto",
  overflowY: "auto",
  maxHeight: "2rem",
});
export const StyledMapIcon = styled(Map)({
  fontSize: "3rem",
  color: "gray",
});
export const StyledCardHeader = styled(CardHeader)({
  padding: "0.5rem 1rem",
});
export const StyledCardMedia = styled(CardMedia)({
  height: "140px",
  width: "100%",
});
export const StyledTypography = styled(Box)({
  display: "flex",
  gap: 0.5,
  fontStyle: "italic",
  fontSize: "1.3rem",
  color: "gray",
});
export const EventBox = styled(Box)({
  marginTop: "1rem",
});
export const EventHeaderBox = styled(Box)({
  marginBottom: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
export const EventTitle = styled(Typography)({
  flex: 2,
});
export const EventSchedulerLink = styled(Button)({
  flex: 1,
  width: "auto",
});
export const StyledSwiper = styled(Swiper)({
  padding: "1rem",
});
export const NoResultTypography = styled(Typography)({
  marginBottom: "0.5rem",
  textAlign: "center",
});
