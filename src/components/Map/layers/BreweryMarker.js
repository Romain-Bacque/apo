import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import defaultIcon from "../icons/defaultIcon";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

let content = null;

const BreweryMarker = ({ data, getGeoFilter }) => {
  const geoFilter = getGeoFilter();
  content = data
    ?.filter((brewery) => {
      let filterByGeo;

      if (geoFilter) {
        // 'booleanPointInPolygon' check if current feature coordinate points are present in the selected continent (geoFilter), return 'true' or 'false'
        filterByGeo = booleanPointInPolygon(
          [brewery.lon, brewery.lat],
          geoFilter
        );
      }

      let doFilter = true;

      if (geoFilter) {
        doFilter = filterByGeo;
      }
      return doFilter;
    })
    .map((brewerie) => (
      <Marker
        position={[brewerie.lat, brewerie.lon]}
        icon={defaultIcon}
        key={brewerie.id}
      >
        <Popup>
          <section className="section-img-brewery">
            <img className="img-brewery" src={brewerie.image} alt="logo"></img>
          </section>
          <section className="section-adress">
            <h1 className="brewery-title color">{brewerie.title}</h1>
            <span className="span-info">{brewerie.address}</span>
            <a className="phone-number" href={"tel:" + brewerie.phone}>
              {brewerie.phone}
            </a>
            <Link
              to={`/breweries/${brewerie.id}`}
              className="detail-button color-button"
              type="button"
            >
              Voir le détail
            </Link>
          </section>
        </Popup>
      </Marker>
    ));

  return content;
};

export default BreweryMarker;
