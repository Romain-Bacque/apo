import { React, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import "./style.scss";
import { Box } from "@mui/material";
import BreweryMarker from "./layers/BreweryMarker";
import LocationMarker from "./layers/LocationMarker";

function Map() {
  const [checked, setChecked] = useState(false);
  const containerRef = useRef(null);

  const handleChange = () => {
    setChecked((prevState) => !prevState);
  };

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
        minZoom={6}
        zoom={5}
      >
        {/* Map image */}
        <TileLayer
          // Copyright
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // Link of entire map
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
        />
        <BreweryMarker />
        <LocationMarker />
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
