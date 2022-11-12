import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import "./style.scss";
import { Box, FormControlLabel, Switch } from "@mui/material";
import BreweryMarker from "./layers/BreweryMarker";
import LocationMarker from "./layers/LocationMarker";
import Regions from "./layers/Regions";

// GeoJSON data
import { regions } from "./data/regions";
import BreweriesList from "../BreweriesList";
import styled from "@emotion/styled";
import LocationButtonFilter from "./controls/LocationButtonFilter";
import ShowActiveFiltersControl from "./controls/ShowActiveFiltersControl";

// Style
const StyledContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
  margin: "auto",
  minWidth: "70%",
  maxWidth: "1200px",
  height: "100%",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    alignItems: "stretch",
    width: "100%",
    height: "100%",
  },
}));
const StyledMapContainer = styled(Box)({
  flex: 2,
  height: "calc(100% - 6rem)",
  position: "relative",
});
const SwitchContainer = styled(Box)(({ theme }) => ({
  margin: "1rem",
  borderBottom: "1px solid lightgray",
  textAlign: "center",
  boxSizing: "border-box",
  height: "5rem",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));
const BreweriesContainer = styled(Box)(({ theme }) => ({
  flex: "1.5",
  backgroundColor: "white",
  transition: "0.3s ease-out",
  alignSelf: "stretch",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    position: "absolute",
    zIndex: 3,
    bottom: "6rem",
    transform: "translateY(100%)",
    "&.active": {
      bottom: "100.1%",
    },
  },
}));

// Component
function Map({ searchValue }) {
  const breweries = useSelector((state) => state.brewery.breweries);
  const [position, setPosition] = useState(null);
  const [breweriesByFilter, setBreweriesByFilter] = useState({});
  const [radiusFilter, setRadiusFilter] = useState(null);
  const [geoFilter, setGeoFilter] = useState(null);
  const [checked, setChecked] = useState(false);

  const getRadiusFilter = useCallback(() => radiusFilter, [radiusFilter]);
  const getGeoFilter = useCallback(() => geoFilter, [geoFilter]);
  const getSearchbarFilter = () => searchValue;
  const getFilters = () => ({
    searchValue,
    geoFilter,
    radiusFilter,
  });

  return (
    <StyledContainer>
      <StyledMapContainer>
        <MapContainer
          className="leaflet"
          scrollWheelZoom={true}
          zoomControl={false} // prevent zoom control to appear on the map
          center={[47.902964, 1.909251]}
          minZoom={4.2}
          maxZoom={18}
          zoom={5}
        >
          {/* Map image */}
          <TileLayer
            // Copyright
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // Link of entire map
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
          />
          <Regions
            data={regions}
            setGeoFilter={setGeoFilter}
            getGeoFilter={getGeoFilter}
          />
          <BreweryMarker
            data={breweries}
            getRadiusFilter={getRadiusFilter}
            getGeoFilter={getGeoFilter}
            getSearchbarFilter={getSearchbarFilter}
            setBreweriesByFilter={setBreweriesByFilter}
          />
          <LocationMarker position={position} setPosition={setPosition} />
          <LocationButtonFilter
            currentPosition={position}
            setRadiusFilter={setRadiusFilter}
          />
          <ShowActiveFiltersControl getFilters={getFilters} />
        </MapContainer>
      </StyledMapContainer>
      <BreweriesContainer className={`${checked ? "active" : ""}`}>
        <SwitchContainer>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={() => setChecked((prevState) => !prevState)}
              />
            }
            label={`${checked ? "Cacher" : "Afficher"} la liste des brasseries`}
            sx={{ textAlign: "center" }}
          />
        </SwitchContainer>
        <BreweriesList
          filter={breweriesByFilter.filter ? breweriesByFilter.filter : null}
          data={breweriesByFilter.filter ? breweriesByFilter.value : breweries}
        />
      </BreweriesContainer>
    </StyledContainer>
  );
}

Map.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default Map;
