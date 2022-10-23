import { useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
import { Box, Toolbar, AppBar, Typography } from "@mui/material";
import { SportsBar } from "@mui/icons-material";

import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import AppMenu from "../UI/AppMenu";
import { Link } from "react-router-dom";

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
  function handlePlaceSelect(value) {
    dispatch({
      type: "SEARCH_VALUE",
      value: value ? value.properties.address_line1 : "",
    });
  }

  return (
    <GeoapifyContext apiKey="99188fa618354504b3ba9155a71fb817">
      <AppBar>
        <StyledToolbar>
          <Box display="flex" mr="4rem" alignItems={"center"} gap={1.5}>
            <Link to="/">
              <SportsBar
                sx={{
                  fontSize: "3.8rem",
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
                fontSize: "1.4rem",
                width: "8rem",
              }}
              variant="span"
            >
              Biere de ta région.
            </Typography>
          </Box>
          <Box sx={{ width: "60%" }}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Rechercher..."
              type="locality"
              lang="fr"
              onUserInput={handleUserInput}
              placeSelect={handlePlaceSelect}
            />
          </Box>
          <AppMenu />
        </StyledToolbar>
      </AppBar>
    </GeoapifyContext>
  );
}

export default Header;
