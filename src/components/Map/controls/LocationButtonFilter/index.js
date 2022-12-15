// hook import
import { useMap } from "react-leaflet";
// other import
import PropTypes from "prop-types";
// styled component import
import { StyledIconButton, StyledMyLocationIcon } from "./style";

const DEFAULT_RADIUS = 30;

// Component
function LocationButtonFilter({
  currentPosition,
  setRadiusFilter,
  isLocationAuthorized,
}) {
  const map = useMap(); // Hook providing the Leaflet Map instance in any descendant of a MapContainer.

  const handleLocationFilter = () => {
    if (isLocationAuthorized) {
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
        <StyledIconButton
          aria-label="bouton pour afficher/cacher les brasseries autour de vous"
          className="leaflet-control-layer"
          title="Brasseries autour de vous"
          onClick={handleLocationFilter}
        >
          <StyledMyLocationIcon />
        </StyledIconButton>
      </div>
    </div>
  );
}

LocationButtonFilter.propTypes = {
  isLocationAuthorized: PropTypes.bool.isRequired,
  currentPosition: PropTypes.object,
  setRadiusFilter: PropTypes.func.isRequired,
};

LocationButtonFilter.defaultProps = {
  currentPosition: null,
};

export default LocationButtonFilter;
