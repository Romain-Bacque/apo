import { useState } from "react";
import { useSelector } from "react-redux";

import { LayersControl, MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import "./style.scss";
import {
  Box,
  Divider,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
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
const StyledBox = styled(Box)(({ theme }) => ({
  margin: "2rem auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
  borderRadius: "10px",
  maxWidth: "1200px",
  [theme.breakpoints.down("md")]: {
    display: "block",
    width: "100%",
  },
}));
const StyledTypography = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  textAlign: "center",
  textTransform: "capitalize",
  letterSpacing: "0.35rem",
  marginBottom: "2rem",
  borderBottom: "1px solid rgba(215, 215, 215, 0.7)",
  color: "rgb(170, 170, 170)",
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

  const handleChange = () => {
    setChecked((prevState) => !prevState);
  };

  return (
    <>
      <StyledTypography variant="h4" component="h1">
        Carte Des Brasseries
      </StyledTypography>
      <StyledBox>
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
            <Box borderRadius="5px" flex={1.5}>
              <Box
                m="1rem"
                borderBottom="1px solid lightgray"
                textAlign="center"
              >
                <FormControlLabel
                  control={<Switch checked={checked} onChange={handleChange} />}
                  label="Show from target"
                  sx={{ textAlign: "center" }}
                />
              </Box>
              <BreweriesList
                filter={
                  breweriesByFilter.filter ? breweriesByFilter.filter : null
                }
                data={
                  breweriesByFilter.filter ? breweriesByFilter.value : breweries
                }
              />
            </Box>
          </>
        )}
      </StyledBox>
    </>
  );
}

export default Map;
