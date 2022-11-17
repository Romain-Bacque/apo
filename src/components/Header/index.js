import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box, Toolbar, AppBar, Typography } from "@mui/material";
import { SportsBar } from "@mui/icons-material";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import AppMenu from "../UI/AppMenu";
import { apiConfig } from "../../config/config";

// Style
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
});

// Component
function Header({ setSearchValue }) {
  const navigate = useNavigate();

  // If user type 'enter' key on keyboard
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      setSearchValue(event.target.value.toLowerCase().trim());
      navigate("/");
    }
  }

  // If user select an address in the search bar
  function handlePlaceSelect(value) {
    const searchValue = value ? value.properties.address_line1 : "";

    setSearchValue(searchValue);
    navigate("/");
  }

  return (
    <GeoapifyContext apiKey={apiConfig.apiKey || ""}>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: "none",
        }}
      >
        <StyledToolbar>
          <Box display="flex" mr="4rem" alignItems="center" gap={1.5}>
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
          <div
            // tabindex is an integer indicating whether the element can capture the focus and if so,
            // in what order it captures it when navigating with the keyboard (usually using the Tab key).
            tabIndex="0"
            onKeyDown={handleKeyDown}
            style={{ width: "60%" }}
          >
            <GeoapifyGeocoderAutocomplete
              placeholder="Rechercher..."
              lang="fr"
              filterByCountryCode={["fr"]}
              placeSelect={handlePlaceSelect}
            />
          </div>
          <AppMenu />
        </StyledToolbar>
      </AppBar>
    </GeoapifyContext>
  );
}

Header.propTypes = {
  setSearchValue: PropTypes.func.isRequired,
};

export default Header;
