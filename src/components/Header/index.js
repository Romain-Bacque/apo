// hook import
import { Link, useNavigate } from "react-router-dom";
// other import
import PropTypes from "prop-types";
// component import
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import AppMenu from "../UI/AppMenu";
// styled component import
import {
  LogoBox,
  SearchBarContainer,
  StyledAppBar,
  StyledSportsBar,
  StyledToolbar,
  TitleTypography,
} from "./style";

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
    <GeoapifyContext apiKey={process.env.REACT_APP_APIKEY || ""}>
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
              Bières de ta région.
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
