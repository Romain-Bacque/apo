import { GeoJSON } from "react-leaflet";

const Regions = ({ data, setGeoFilter, getGeoFilter }) => {
  const geoFilter = getGeoFilter();

  return (
    <GeoJSON
      key="geo-json-layer"
      data={data}
      eventHandlers={{
        dblclick: (e) => {
          e.originalEvent.view.L.DomEvent.stopPropagation(e); // Use it to prevent zoom when double click
        },
        click: (e) =>
          setGeoFilter((prevState) => {
            const same = prevState === e.propagatedFrom.feature; // 'e.propagatedFrom.feature' -> get the GeoJSON data of the current region I clicked on
            return same ? null : e.propagatedFrom.feature; // if I click the same region again, the filter will be removed and all breweries will be present.
          }),
      }}
      style={(feature) => {
        return {
          color: geoFilter === feature ? "dark" : "gray",
          weight: 0.6,
          fillOpacity: 0.3,
        };
      }}
    ></GeoJSON>
  );
};

export default Regions;
