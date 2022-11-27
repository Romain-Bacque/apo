// other import
import PropTypes from "prop-types";
import { GeoJSON } from "react-leaflet";

// Component
function Regions({ data, setGeoFilter, getGeoFilter }) {
  const geoFilter = getGeoFilter();

  return (
    <GeoJSON
      key="geo-json-layer"
      data={data}
      eventHandlers={{
        dblclick: (event) => {
          event.originalEvent.view.L.DomEvent.stopPropagation(event); // Use it to prevent zoom when double click
        },
        click: (event) =>
          setGeoFilter((prevState) => {
            const isIdentical = prevState === event.propagatedFrom.feature; // 'e.propagatedFrom.feature' -> get the GeoJSON data of the current region I clicked on

            return isIdentical ? null : event.propagatedFrom.feature; // if I click the same region again, the filter will be removed and all breweries will be present.
          }),
      }}
      style={(feature) => ({
        color: geoFilter === feature ? "dark" : "gray",
        weight: 0.6,
        fillOpacity: 0.3,
      })}
    />
  );
}

Regions.propTypes = {
  data: PropTypes.object.isRequired,
  setGeoFilter: PropTypes.func.isRequired,
  getGeoFilter: PropTypes.func.isRequired,
};

export default Regions;
