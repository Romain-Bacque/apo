import { useState } from "react";
import { useSelector } from "react-redux";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import "./style.scss";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import BreweryMarker from "./layers/BreweryMarker";
import LocationMarker from "./layers/LocationMarker";
import Regions from "./layers/Regions";
import Loader from "../UI/loader";

// GeoJSON data
import { regions } from "./data/regions";
import BreweriesList from "../BreweriesList";
import styled from "@emotion/styled";
import LocationButtonFilter from "./controls/LocationButtonFilter";
import ShowActiveFiltersControl from "./controls/ShowActiveFiltersControl";

// Style
const StyledMapContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "stretch",
  gap: 2,
  margin: "auto",
  maxWidth: "1200px",
  height: "calc(100vh - 80px)",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "100%",
  },
}));
const StyledSwitchContainer = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  textAlign: "center",
  height: "5rem",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));
const StyledBreweriesListContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  transition: "0.3s ease-out;",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: 3,
    bottom: "7rem",
    transform: "translateY(100%)",
    "&.active": {
      bottom: "calc(100% - 5.5rem)",
    },
  },
}));

function Map() {
  const loadingStatut = useSelector((state) => state.loading.statut);
  const breweries = useSelector((state) => state.brewery.breweries);
  const searchValue = useSelector((state) => state.search.value);
  const [position, setPosition] = useState(null);
  const [breweriesByFilter, setBreweriesByFilter] = useState({});
  const [radiusFilter, setRadiusFilter] = useState(null);
  const [geoFilter, setGeoFilter] = useState(null);
  const [checked, setChecked] = useState(false);

  const getRadiusFilter = () => radiusFilter;
  const getGeoFilter = () => geoFilter;
  const getSearchbarFilter = () => searchValue;
  const getFilters = () => ({
    searchValue,
    geoFilter,
    radiusFilter,
  });

  return (
    <>
      <StyledMapContainer>
        {loadingStatut === "pending" ? (
          <Loader />
        ) : (
          <>
            <Box flex={2} height="80vh" position="relative">
              <MapContainer
                className="leaflet"
                scrollWheelZoom={true}
                zoomControl={false}
                center={[47.902964, 1.909251]}
                minZoom={5.2}
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
            </Box>
            <StyledBreweriesListContainer
              flex={1.5}
              className={`${checked ? "active" : ""}`}
            >
              <StyledSwitchContainer
                m="1rem"
                borderBottom="1px solid lightgray"
                textAlign="center"
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={() => setChecked((prevState) => !prevState)}
                    />
                  }
                  label={`${
                    checked ? "Cacher" : "Afficher"
                  } la liste des brasseries`}
                  sx={{ textAlign: "center" }}
                />
              </StyledSwitchContainer>
              <BreweriesList
                filter={
                  breweriesByFilter.filter ? breweriesByFilter.filter : null
                }
                data={
                  breweriesByFilter.filter ? breweriesByFilter.value : breweries
                }
              />
            </StyledBreweriesListContainer>
          </>
        )}
      </StyledMapContainer>
    </>
  );
}

export default Map;
