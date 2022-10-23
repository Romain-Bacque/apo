import { useState } from "react";
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

// GeoJSON data
import { regions } from "./data/regions";
import BreweriesList from "../BreweriesList";

let filteredBreweries;

function Map() {
  const breweries = useSelector((state) => state.brewery.breweries);
  const searchValue = useSelector((state) => state.search.value);
  const [breweriesByFilter, setBreweriesByFilter] = useState([]);
  const [radiusFilter, setRadiusFilter] = useState(null);
  const [geoFilter, setGeoFilter] = useState(null);
  const [checked, setChecked] = useState(false);

  const getRadiusFilter = () => radiusFilter;
  const getGeoFilter = () => geoFilter;

  const handleChange = () => {
    setChecked((prevState) => !prevState);
  };

  if (breweries?.length) {
    filteredBreweries = breweries.filter((brewery) => {
      if (brewery.title && brewery.address) {
        const title = brewery.title.toLowerCase().trim();
        const address = brewery.address.toLowerCase().trim();

        return title.includes(searchValue) || address.includes(searchValue);
      } else return false;
    });
  }

  return (
    <Box display="flex" alignItems={"center"} gap={2} borderRadius="10px">
      <Box height="80vh" width="80%" position="relative">
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
            data={filteredBreweries}
            getRadiusFilter={getRadiusFilter}
            getGeoFilter={getGeoFilter}
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
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show from target"
        />
        {breweries?.length && <BreweriesList data={breweries} />}
      </Box>
    </Box>
  );
}

export default Map;
