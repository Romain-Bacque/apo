import { useDispatch } from "react-redux";

import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  IconButton,
  AppBar,
  InputBase,
  Typography,
} from "@mui/material";
import { MenuRounded, SportsBar } from "@mui/icons-material";

import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import AppMenu from "../UI/AppMenu";
import { Link } from "react-router-dom";

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    border: "0px",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

function Header() {
  const dispatch = useDispatch();

  // If user type text in the search bar
  function handleUserInput(value) {
    dispatch({
      type: "SEARCH_VALUE",
      value,
    });
  }

  // If user select an address in the search bar
  function onPlaceSelect(value) {
    dispatch({
      type: "SEARCH_VALUE",
      value: value.properties.address_line1,
    });
  }

  return (
    <GeoapifyContext apiKey="99188fa618354504b3ba9155a71fb817">
      <AppBar position="sticky">
        <StyledToolbar>
          <Box display="flex" mr="4rem" alignItems={"center"} gap={1.5}>
            <Link to="/">
              <SportsBar
                sx={{
                  fontSize: "3.5rem",
                  color: "white",
                }}
                to="/"
              />
            </Link>
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                fontWeight: "bold",
                color: "white",
                fontSize: "1.6rem",
                width: "7rem",
              }}
              variant="h5"
            >
              Biere de ta région
            </Typography>
          </Box>
          <Box sx={{ width: "60%" }}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Search…"
              type="locality"
              lang="fr"
              onUserInput={handleUserInput}
              placeSelect={onPlaceSelect}
            />
          </Box>
          <AppMenu />
        </StyledToolbar>
      </AppBar>
    </GeoapifyContext>
  );
}

export default Header;
