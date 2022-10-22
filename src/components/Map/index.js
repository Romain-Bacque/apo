import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import "./style.scss";
import { Box } from "@mui/material";
import BreweryMarker from "./layers/BreweryMarker";
import LocationMarker from "./layers/LocationMarker";
import Regions from "./layers/Regions";

// GeoJSON data
import { regions } from "./data/regions";

let filteredBreweries;

function Map() {
  const breweries = useSelector((state) => state.brewery.breweries);
  const searchValue = useSelector((state) => state.search.value);

  const [geoFilter, setGeoFilter] = useState(null);
  const [checked, setChecked] = useState(false);
  const containerRef = useRef(null);

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
  // useEffect(() => {
  //   if (!map) return;

  //   L.easyButton("fa-solid fa-location-arrow fa-3x blue", () => {
  //     map.locate().on("locationfound", function (e) {
  //       setPosition(e.latlng);
  //       map.flyTo(e.latlng, 13, map.getZoom());
  //       L.marker(e.latlng, { icon: positionIcon }).addTo(map);
  //     });
  //   }).addTo(map);
  // }, [map]);

  return (
    <Box ref={containerRef}>
      <MapContainer
        scrollWheelZoom={true}
        zoomControl={false}
        center={[47.902964, 1.909251]}
        minZoom={5.2}
        zoom={5}
      >
        {/* Map image */}
        <TileLayer
          // Copyright
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // Link of entire map
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
        />
        <BreweryMarker data={filteredBreweries} getGeoFilter={getGeoFilter} />
        <LocationMarker />
        <Regions
          data={regions}
          setGeoFilter={setGeoFilter}
          getGeoFilter={getGeoFilter}
        />
      </MapContainer>
      {/* <Box>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show from target"
        />
        <Slide direction="up" in={checked} container={containerRef.current}>
          <BreweriesList />
        </Slide>
      </Box> */}
    </Box>
  );
}

export default Map;
