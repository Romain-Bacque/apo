// hook and other import
import { Marker, Tooltip, useMap } from "react-leaflet";
import { useEffect } from "react";
// other import
import PropTypes from "prop-types";
import locationIcon from "../icons/locationIcon";

// Component
function LocationMarker({ position, setPosition, isLocationAuthorized }) {
  const map = useMap();

  useEffect(() => {
    // Callback function is triggered when current user location change, thanks to 'locationfound' event
    if (isLocationAuthorized) {
      map.locate().on("locationfound", (event) => {
        setPosition(event.latlng);
      });
    }
  }, [map, setPosition, isLocationAuthorized]);

  return !position ? null : (
    <Marker position={position} icon={locationIcon}>
      <Tooltip>Vous êtes ici.</Tooltip>
    </Marker>
  );
}

LocationMarker.propTypes = {
  isLocationAuthorized: PropTypes.bool,
  position: PropTypes.object,
  setPosition: PropTypes.func.isRequired,
};

LocationMarker.defaultProps = {
  position: null,
  isLocationAuthorized: null,
};

export default LocationMarker;
