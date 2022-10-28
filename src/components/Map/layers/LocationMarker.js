import { useEffect } from "react";

import { Marker, Tooltip, useMap } from "react-leaflet";
import locationIcon from "../icons/locationIcon";

const LocationMarker = ({ position, setPosition }) => {
  const map = useMap();

  useEffect(() => {
    // Callback function is triggered when current user location change, thanks to 'locationfound' event
    map.locate().on("locationfound", function (event) {
      setPosition(event.latlng);
    });
  }, [map, setPosition]);

  return !position ? null : (
    <Marker position={position} icon={locationIcon}>
      <Tooltip>Vous êtes ici.</Tooltip>
    </Marker>
  );
};
export default LocationMarker;
