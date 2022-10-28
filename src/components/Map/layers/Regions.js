import { useEffect } from "react";
import { GeoJSON } from "react-leaflet";

const Regions = ({ data, setGeoFilter, getGeoFilter }) => {
  const geoFilter = getGeoFilter();

  useEffect(() => {
    console.log("df");
  }, [getGeoFilter]);

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
            const same = prevState === event.propagatedFrom.feature; // 'e.propagatedFrom.feature' -> get the GeoJSON data of the current region I clicked on
            return same ? null : event.propagatedFrom.feature; // if I click the same region again, the filter will be removed and all breweries will be present.
          }),
      }}
      style={(feature) => {
        return {
          color: geoFilter === feature ? "dark" : "gray",
          weight: 0.6,
          fillOpacity: 0.3,
        };
      }}
    />
  );
};

export default Regions;
