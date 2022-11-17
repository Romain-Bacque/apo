import { useMap } from "react-leaflet";

import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const DEFAULT_RADIUS = 30;

// Component
function LocationButtonFilter({
  currentPosition,
  setRadiusFilter,
  isLocationAuthorization,
}) {
  const map = useMap(); // Hook providing the Leaflet Map instance in any descendant of a MapContainer.

  const handleLocationFilter = () => {
    if (isLocationAuthorization) {
      map.flyTo(currentPosition, map.getZoom()); // Sets the view of the map (geographical center and zoom) performing a smooth pan-zoom animation.
      map.once("moveend", () => {
        // When 'flyTo' method movement is finish, then we execute instructions below
        setRadiusFilter((prevState) => {
          if (prevState) {
            return null;
          }
          return {
            coordinates: currentPosition,
            radius: DEFAULT_RADIUS,
          };
        });
      });
    }
  };

  return (
    <div className="leaflet-top leaflet-left">
      <div className="leaflet-control leaflet-bar leaflet-control-layers">
        <IconButton
          aria-label="bouton pour afficher/cacher les brasseries autour de vous"
          className="leaflet-control-layer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          title="Brasseries autour de vous"
          onClick={handleLocationFilter}
        >
          <MyLocationIcon sx={{ width: "100%" }} />
        </IconButton>
      </div>
    </div>
  );
}

LocationButtonFilter.propTypes = {
  isLocationAuthorization: PropTypes.bool.isRequired,
  currentPosition: PropTypes.object,
  setRadiusFilter: PropTypes.func.isRequired,
};

LocationButtonFilter.defaultProps = {
  currentPosition: null,
};

export default LocationButtonFilter;
