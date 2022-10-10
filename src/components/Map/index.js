import { React, useEffect, useState } from "react";
import { LayersControl, MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { map } from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import "./style.scss";
import { style } from "@mui/system";
import positionIcon from "./MypositionIcon"
import { Link } from 'react-router-dom';
import logo from "./logoBrasserie.jpg";
import { useSelector } from 'react-redux';
import visitorIcon from './constants'

const { BaseLayer } = LayersControl;



function Map() {
  const breweries = useSelector ((state) => state.data.breweries)
  console.log(breweries)
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  
  useEffect(() => {
    if (!map) return;

    L.easyButton("fa-solid fa-location-arrow fa-3x blue", () => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng,13, map.getZoom());
        L.marker(e.latlng, {icon: positionIcon}).addTo(map).bindPopup("Vous êtes ici").openPopup();
      });
    }).addTo(map);
  }, [map]);

  return (
    <MapContainer
      zoomControl={false}
      center={[	47.902964, 	1.909251]}
      zoom={6.2}
      whenCreated={setMap}
    >
      {breweries.map ((brewerie) => (
      <Marker position={[brewerie.lat, brewerie.lon]} icon={visitorIcon} key={brewerie.id}>
        <Popup >
                <section className='section-img-brewery'>
                 <img className='img-brewery' src={brewerie.image} alt="logo"></img>
                </section>
                <section className='section-adress'>
                    <h1 className='brewery-title color'>{brewerie.title}</h1>
                    <span className='span-info'>{brewerie.address}</span>
                    <a className="phone-number" href={'tel:' + brewerie.phone}>{brewerie.phone}</a>
                    <Link to={`/breweries/${brewerie.id}`} className='detail-button color-button' type='button'>Voir le détail</Link>
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