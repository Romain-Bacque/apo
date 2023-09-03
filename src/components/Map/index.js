// hook import
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
// other import
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "font-awesome/css/font-awesome.min.css";
// component import
import { FormControlLabel, Switch } from "@mui/material";
import BreweryMarker from "./layers/BreweryMarker";
import LocationMarker from "./layers/LocationMarker";
import Regions from "./layers/Regions";
import BreweriesList from "../BreweriesList";
import LocationButtonFilter from "./controls/LocationButtonFilter";
import ShowActiveFiltersControl from "./controls/ShowActiveFiltersControl";
// GeoJSON data
import { regions } from "./data/regions";
// styled component import
import {
  BreweriesContainer,
  StyledContainer,
  StyledMapContainer,
  SwitchContainer,
} from "./style";

// Component
function Map({ isLocationAuthorized, searchValue }) {
  const breweries = useSelector((state) => state.brewery.breweries);
  const [position, setPosition] = useState(null);
  const [breweriesByFilter, setBreweriesByFilter] = useState({});
  const [radiusFilter, setRadiusFilter] = useState(null);
  const [geoFilter, setGeoFilter] = useState(null);
  const [checked, setChecked] = useState(false);

  const getRadiusFilter = useCallback(() => radiusFilter, [radiusFilter]);
  const getGeoFilter = useCallback(() => geoFilter, [geoFilter]);
  const getSearchbarFilter = useCallback(() => searchValue, [searchValue]);
  const getFilters = useCallback(
    () => ({
      searchValue,
      geoFilter,
      radiusFilter,
    }),
    [searchValue, geoFilter, radiusFilter]
  );

  return (
    <StyledContainer>
      <StyledMapContainer>
        <MapContainer
          className="leaflet"
          scrollWheelZoom
          zoomControl={false} // prevent zoom control to appear on the map
          center={[47.902964, 1.909251]}
          minZoom={4.2}
          maxZoom={18}
          zoom={5}
        >
          {/* Map image */}
          <TileLayer
            // Copyright
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // Link of entire map
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
          />
          <Regions
            data={useMemo(() => regions, [])}
            setGeoFilter={setGeoFilter}
            getGeoFilter={getGeoFilter}
          />
          <BreweryMarker
            data={useMemo(() => breweries, [breweries])}
            getRadiusFilter={getRadiusFilter}
            getGeoFilter={getGeoFilter}
            getSearchbarFilter={getSearchbarFilter}
            setBreweriesByFilter={setBreweriesByFilter}
          />
          <LocationMarker
            isLocationAuthorized={isLocationAuthorized}
            position={position}
            setPosition={setPosition}
          />
          {isLocationAuthorized && (
            <LocationButtonFilter
              isLocationAuthorized={isLocationAuthorized}
              currentPosition={position}
              setRadiusFilter={setRadiusFilter}
            />
          )}
          <ShowActiveFiltersControl getFilters={getFilters} />
        </MapContainer>
      </StyledMapContainer>
      <BreweriesContainer className={`${checked ? "active" : ""}`}>
        <SwitchContainer>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={() => setChecked((prevState) => !prevState)}
              />
            }
            label={`${checked ? "Cacher" : "Afficher"} la liste des brasseries`}
            sx={{ textAlign: "center" }}
          />
        </SwitchContainer>
        <BreweriesList
          filter={breweriesByFilter.filter ? breweriesByFilter.filter : null}
          data={breweriesByFilter.filter ? breweriesByFilter.value : breweries}
        />
      </BreweriesContainer>
    </StyledContainer>
  );
}

export default Map;
