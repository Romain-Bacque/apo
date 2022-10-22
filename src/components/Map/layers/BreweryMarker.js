import { useSelector } from "react-redux";

import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import defaultIcon from "../icons/defaultIcon";
import { useEffect } from "react";

let content = null;

const BreweryMarker = () => {
  const breweries = useSelector((state) => state.brewery.breweries);
  const searchValue = useSelector((state) => state.search.value);

  if (breweries?.length) {
    const filteredBreweries = breweries.filter((brewery) => {
      return brewery.address?.includes(searchValue);
    });

    content = filteredBreweries.map((brewerie) => (
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
  }

  return content;
};

export default BreweryMarker;
