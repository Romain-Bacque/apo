// hook import
import { Link, useNavigate } from "react-router-dom";
// other import
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
// component import
import { Box, Toolbar, AppBar, Typography } from "@mui/material";
import { SportsBarRounded } from "@mui/icons-material";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import AppMenu from "../UI/AppMenu";
import { apiConfig } from "../../config/config";

// Style
const LogoBox = styled(Box)({
  display: "flex",
  marginRight: "4rem",
  alignItems: "center",
  gap: 1.5,
});
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
});
const StyledSportsBar = styled(SportsBarRounded)({
  fontSize: "4rem",
  color: "white",
});
const StyledAppBar = styled(AppBar)({
  position: "sticky",
  boxShadow: "none",
  height: "8rem",
});
const TitleTypography = styled(Typography)({
  fontFamily: "Yellowtail, sans-serif",
  textTransform: "capitalize",
  fontSize: "1.5rem",
  letterSpacing: "0.4rem",
  fontWeight: "bold",
  color: "white",
  width: "12rem",
});
const SearchBarContainer = styled("div")({
  width: "60%",
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
      <StyledAppBar>
        <StyledToolbar>
          <LogoBox>
            <Link to="/">
              <StyledSportsBar to="/" />
            </Link>
            <TitleTypography
              display={{ xs: "none", sm: "block" }}
              variant="span"
            >
              Biere de ta région.
            </TitleTypography>
          </LogoBox>
          <SearchBarContainer
            // tabindex is an integer indicating whether the element can capture the focus and if so,
            // in what order it captures it when navigating with the keyboard (usually using the Tab key).
            tabIndex="0"
            onKeyDown={handleKeyDown}
          >
            <GeoapifyGeocoderAutocomplete
              placeholder="Rechercher..."
              lang="fr"
              filterByCountryCode={["fr"]}
              placeSelect={handlePlaceSelect}
            />
          </SearchBarContainer>
          <AppMenu />
        </StyledToolbar>
      </StyledAppBar>
    </GeoapifyContext>
  );
}

Header.propTypes = {
  setSearchValue: PropTypes.func.isRequired,
};

export default Header;
