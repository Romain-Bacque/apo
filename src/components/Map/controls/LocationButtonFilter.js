import { useMap } from "react-leaflet";

import { IconButton } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const DEFAULT_RADIUS = 10;

const LocationButtonFilter = ({ currentPosition, setRadiusFilter }) => {
  const map = useMap(); // Hook providing the Leaflet Map instance in any descendant of a MapContainer.

  const handleLocationFilter = () => {
    map.flyTo(currentPosition, map.getZoom()); // Sets the view of the map (geographical center and zoom) performing a smooth pan-zoom animation.
    map.once("moveend", function () {
      // When 'flyTo' method movement is finish, then we execute instructions below
      setRadiusFilter((prevState) => {
        if (prevState) {
          return null;
        } else {
          return {
            coordinates: currentPosition,
            radius: DEFAULT_RADIUS,
          };
        }
      });
    });
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
};

export default LocationButtonFilter;
