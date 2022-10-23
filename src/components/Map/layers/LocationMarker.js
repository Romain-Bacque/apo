import { useCallback, useEffect, useState } from "react";

import L from "leaflet";
import { Marker, Tooltip, useMap } from "react-leaflet";
import locationIcon from "../icons/locationIcon";

const DEFAULT_RADIUS = 10;
let mapButton;

const LocationMarker = ({ setRadiusFilter }) => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  // Function that add the current location and defined radius to state
  const handleLocationClick = useCallback(() => {
    if (position) {
      setRadiusFilter((prevState) => {
        if (prevState) {
          return null;
        } else {
          return { coordinates: position, radius: DEFAULT_RADIUS };
        }
      });
    }
  }, [setRadiusFilter, position]);

  useEffect(() => {
    if (mapButton) map.removeControl(mapButton); // Remove the button from the map if it exists

    mapButton = L.easyButton({
      states: [
        {
          stateName: "breweries-around-location", // name the state
          icon: "fa-crosshairs", // The icon use in the button
          title: "Brasseries autour de vous", // title that appear when mouse hover the button
          onClick: function () {
            handleLocationClick();
            map.flyTo(position, map.getZoom()); // Sets the view of the map (geographical center and zoom) performing a smooth pan-zoom animation.
          },
        },
      ],
    });

    map.addControl(mapButton); // Add the button to the map
  }, [map, handleLocationClick, position]);

  useEffect(() => {
    // Callback function is triggered when current user location change, thanks to 'locationfound' event
    map.locate().on("locationfound", function (event) {
      setPosition(event.latlng);
    });
  }, [map]);

  return !position ? null : (
    <Marker position={position} icon={locationIcon}>
      <Tooltip>Vous êtes ici.</Tooltip>
    </Marker>
  );
};
export default LocationMarker;
