import Map from "../components/Map";
import PropTypes from "prop-types";

export function HomePage({ searchValue, isLocationAuthorized }) {
  return (
    <Map
      isLocationAuthorized={isLocationAuthorized}
      searchValue={searchValue}
    />
  );
}

HomePage.propTypes = {
  searchValue: PropTypes.string,
  isLocationAuthorized: PropTypes.bool,
};

HomePage.defaultProps = {
  searchValue: "",
  isLocationAuthorized: false,
};