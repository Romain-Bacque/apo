import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

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
  gap: 2,
  margin: "auto",
  maxWidth: "1200px",
  height: "100%",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    alignItems: "stretch",
    width: "100%",
    height: "100%",
  },
}));
const SwitchContainer = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  textAlign: "center",
  height: "5rem",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));
const BreweriesContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  transition: "0.3s ease-out",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 3,
    bottom: "7rem",
    transform: "translateY(100%)",
    "&.active": {
      bottom: "100%",
    },
  },
}));

function Map({ searchValue }) {
  const loadingStatus = useSelector((state) => state.loading.status);
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
    <StyledMapContainer>
      {loadingStatus === "pending" ? (
        <Loader />
      ) : (
        <>
          <Box flex={2} height="80vh" position="relative">
            <MapContainer
              className="leaflet"
              scrollWheelZoom={true}
              zoomControl={false}
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
          </Box>
          <BreweriesContainer
            flex={1.5}
            className={`${checked ? "active" : ""}`}
          >
            <SwitchContainer
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
            </SwitchContainer>
            <BreweriesList
              filter={
                breweriesByFilter.filter ? breweriesByFilter.filter : null
              }
              data={
                breweriesByFilter.filter ? breweriesByFilter.value : breweries
              }
            />
          </BreweriesContainer>
        </>
      )}
    </StyledMapContainer>
  );
}

export default Map;
