// // == Import
// // import { useState } from 'react';
// import "leaflet/dist/leaflet.css";
// import "./style.scss";
// import {
//   MapContainer, TileLayer, Marker, Popup,
// } from "react-leaflet";
// import { useGeolocated } from "react-geolocated";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
// import "leaflet-defaulticon-compatibility";
// import { Link } from "react-router-dom";
// import logo from "./logoBrasserie.png";
// // == Composant

// function Home() {
//   const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
//     positionOptions: {
//       enableHighAccuracy: false,
//     },
//     userDecisionTimeout: 5000,
//   });

//   return !isGeolocationAvailable ? (
//     <div>Your browser does not support Geolocation</div>
//   ) : !isGeolocationEnabled ? (
//     <div>Geolocation is not enabled</div>
//   ) : coords ? (
//     <div className="map">
//       <MapContainer
//         center={[coords.latitude, coords.longitude]}
//         zoom={12}
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[coords.latitude, coords.longitude]}>
//           <Popup>
//             <section className="section-img">
//               <img className="brewery-img" src={logo} alt="logo" />
//             </section>
//             <section className="section-adress">
//               <h1 className="brewery-title">La brasserie belge</h1>
//               <span className="span-info">
//                 8 rue Claude Francois, 75000 Paris
//               </span>
//               <span className="span-info">01 12 12 12 12</span>
//               <Link
//                 to="/breweriesList"
//                 className="detail-button size"
//                 type="button"
//               >
//                 Voir le détail
//               </Link>
//             </section>
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   ) : (
//     <div>Getting the location data&hellip; </div>
//   );
// }

// // == Export
// export default Home;
