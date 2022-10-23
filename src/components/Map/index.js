import { useState } from "react";
import { useSelector } from "react-redux";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import "./style.scss";
import { Box, Divider, FormControlLabel, Switch } from "@mui/material";
import BreweryMarker from "./layers/BreweryMarker";
import LocationMarker from "./layers/LocationMarker";
import Regions from "./layers/Regions";

// GeoJSON data
import { regions } from "./data/regions";
import BreweriesList from "../BreweriesList";
import styled from "@emotion/styled";

// Style
const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
  borderRadius: "10px",
  minWidth: "300px",
});

function Map() {
  const breweries = useSelector((state) => state.brewery.breweries);
  const searchValue = useSelector((state) => state.search.value);
  const [breweriesByFilter, setBreweriesByFilter] = useState({});
  const [radiusFilter, setRadiusFilter] = useState(null);
  const [geoFilter, setGeoFilter] = useState(null);
  const [checked, setChecked] = useState(false);

  const getRadiusFilter = () => radiusFilter;
  const getGeoFilter = () => geoFilter;
  const getSearchbarFilter = () => searchValue;

  const handleChange = () => {
    setChecked((prevState) => !prevState);
  };

  return (
    <StyledBox>
      <Box height="80vh" width="70%" position="relative">
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
          <BreweryMarker
            data={breweries}
            getRadiusFilter={getRadiusFilter}
            getGeoFilter={getGeoFilter}
            getSearchbarFilter={getSearchbarFilter}
            setBreweriesByFilter={setBreweriesByFilter}
          />
          <LocationMarker setRadiusFilter={setRadiusFilter} />
          <Regions
            data={regions}
            setGeoFilter={setGeoFilter}
            getGeoFilter={getGeoFilter}
          />
        </MapContainer>
      </Box>
      <Box>
        <Box
          borderRadius="5px"
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
        {breweries?.length && (
          <BreweriesList
            filter={breweriesByFilter.filter ? breweriesByFilter.filter : null}
            data={
              breweriesByFilter.filter ? breweriesByFilter.value : breweries
            }
          />
        )}
      </Box>
    </StyledBox>
  );
}

export default Map;
