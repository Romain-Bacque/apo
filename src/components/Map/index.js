import { React, useEffect, useState } from "react";
import { LayersControl, MapContainer, Popup, TileLayer, ZoomControl, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import "./style.scss";
import { style } from "@mui/system";
import visitorIcon from "./constants";
import { Link } from 'react-router-dom';
import logo from "./logoBrasserie.png";

const { BaseLayer } = LayersControl;

export default function Map() {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!map) return;

    L.easyButton("fa-solid fa-location-arrow fa-4x blue", () => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
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
      <Marker position={[48.856614, 2.3522219 ]} icon={visitorIcon}>
        <Popup >
                <section className='section-img'>
                 <img className='brewery-img' src={logo} alt="logo"></img>
                </section>
                <section className='section-adress'>
                    <h1 className='brewery-title'>La brasserie belge</h1>
                    <span className='span-info'>8 rue Claude Francois, 75000 Paris</span>
                    <span className='span-info'>01 12 12 12 12</span>
                    <Link to='/breweriesList' className='detail-button size' type='button'>Voir le détail</Link>
                </section>
          </Popup>
      </Marker>
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