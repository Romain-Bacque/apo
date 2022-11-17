import { useEffect } from "react";

import PropTypes from "prop-types";
import { Marker, Tooltip, useMap } from "react-leaflet";
import locationIcon from "../icons/locationIcon";

// Component
function LocationMarker({ position, setPosition, isLocationAuthorization }) {
  const map = useMap();

  useEffect(() => {
    // Callback function is triggered when current user location change, thanks to 'locationfound' event
    if (isLocationAuthorization) {
      map.locate().on("locationfound", (event) => {
        setPosition(event.latlng);
      });
    }
  }, [map, setPosition, isLocationAuthorization]);

  return !position ? null : (
    <Marker position={position} icon={locationIcon}>
      <Tooltip>Vous êtes ici.</Tooltip>
    </Marker>
  );
}

LocationMarker.propTypes = {
  isLocationAuthorization: PropTypes.bool.isRequired,
  position: PropTypes.object,
  setPosition: PropTypes.func.isRequired,
};

LocationMarker.defaultProps = {
  position: null,
};

export default LocationMarker;
