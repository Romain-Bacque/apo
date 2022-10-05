import { React, useEffect, useState } from "react";
import { LayersControl, MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { map } from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import "./style.scss";
import { style } from "@mui/system";
import visitorIcon from "./constants";
import { Link } from 'react-router-dom';
import logo from "./logoBrasserie.jpg";

const { BaseLayer } = LayersControl;

const positionBreweries = {
  latlng: [[47.237829, 6.0240539], 
  [43.2961743, 5.3699525],
  [48.8636878, 1.7948739],
  [50.6365654, 3.0635282],
  [45.7578137, 4.8320114],
  [48.8579662, 2.2945015]],
}

function Map() {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!map) return;

    L.easyButton("fa-solid fa-location-arrow fa-3x blue", () => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
      });
    }).addTo(map);
  }, [map]);

  return (
    <MapContainer
      zoomControl={false}
      center={[	48.856614, 	2.3522219]}
      zoom={13}
      whenCreated={setMap}
    >
      {positionBreweries.latlng.map ((listPosition) => (
      <Marker position={listPosition} icon={visitorIcon} >
        <Popup >
                <section className='section-img-brewery'>
                 <img className='img-brewery' src={logo} alt="logo"></img>
                </section>
                <section className='section-adress'>
                    <h1 className='brewery-title color'>La brasserie belge</h1>
                    <span className='span-info'>8 rue Claude Francois, 75000 Paris</span>
                    <a className="phone-number" href="tel:+33139380101">01 01 01 01 01</a>
                    <Link to='/breweriesList' className='detail-button color-button' type='button'>Voir le détail</Link>
                </section>
          </Popup>
      </Marker>))}
      <LayersControl>
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
          />
        </BaseLayer>
      </LayersControl>
    </MapContainer>
  );
}

export default Map;