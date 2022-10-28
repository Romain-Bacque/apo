import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import defaultIcon from "../icons/defaultIcon";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Phone } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useEffect } from "react";

// Style
const StyledCard = styled(Card)({
  padding: 0.5,
  border: "none",
  width: "200px",
});
const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  padding: "2rem 0",
});
const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 0.6,
});
const StyledLink = styled(Link)({
  display: "inline-block",
  width: "100%",
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginTop: "2rem",
  textAlign: "center",
});

let filteredBreweries = null;

const BreweryMarker = ({
  data,
  getGeoFilter,
  getRadiusFilter,
  getSearchbarFilter,
  setBreweriesByFilter,
}) => {
  const geoFilter = getGeoFilter();
  const radiusFilter = getRadiusFilter();
  const searchbarFilter = getSearchbarFilter();
  let centerPoint;

  if (radiusFilter) {
    const { coordinates } = radiusFilter;
    centerPoint = L.latLng(coordinates);
  }

  filteredBreweries = data?.filter((brewery) => {
    let filterByRadius, filterByGeo, filterBySearchbar;
    let currentPoint;

    if (!brewery.title && !brewery.address) return false;

    if (centerPoint) {
      currentPoint = L.latLng(brewery.lat, brewery.lon);
      filterByRadius =
        centerPoint.distanceTo(currentPoint) / 1000 <= radiusFilter.radius; // 'distanceTo' method get distance between two points // 'distanceTo' function works as meters, so we divide by 1000 to get the value in kilometers
    }
    if (geoFilter) {
      // 'booleanPointInPolygon' check if current feature coordinate points are present in the selected continent (geoFilter), return 'true' or 'false'
      filterByGeo = booleanPointInPolygon(
        [brewery.lon, brewery.lat],
        geoFilter
      );
    }

    if (searchbarFilter) {
      const title = brewery.title.toLowerCase().trim();
      const address = brewery.address.toLowerCase().trim();

      filterBySearchbar =
        title.includes(searchbarFilter) || address.includes(searchbarFilter);
    }

    let doFilter = true;

    if (geoFilter && radiusFilter && searchbarFilter) {
      doFilter = filterByGeo && filterByRadius && filterBySearchbar;
    } else if (geoFilter && radiusFilter && !searchbarFilter) {
      doFilter = filterByGeo && filterByRadius;
    } else if (geoFilter && !radiusFilter && !searchbarFilter) {
      doFilter = filterByGeo;
    } else if (radiusFilter && !geoFilter && !searchbarFilter) {
      doFilter = filterByRadius;
    } else if (!radiusFilter && !geoFilter && searchbarFilter) {
      doFilter = filterBySearchbar;
    } else if (!radiusFilter && geoFilter && searchbarFilter) {
      doFilter = filterByGeo && filterBySearchbar;
    } else if (radiusFilter && !geoFilter && searchbarFilter) {
      doFilter = filterByRadius && filterBySearchbar;
    }
    return doFilter;
  });

  useEffect(() => {
    if (filteredBreweries && (radiusFilter || geoFilter || searchbarFilter)) {
      let filter;

      if (geoFilter && radiusFilter && searchbarFilter) {
        filter = ["Autour de moi", geoFilter.properties.nom, searchbarFilter];
      } else if (geoFilter && radiusFilter && !searchbarFilter) {
        filter = ["Autour de moi", geoFilter.properties.nom];
      } else if (geoFilter && !radiusFilter && !searchbarFilter) {
        filter = [geoFilter.properties.nom];
      } else if (radiusFilter && !geoFilter && !searchbarFilter) {
        filter = ["Autour de moi"];
      } else if (!radiusFilter && !geoFilter && searchbarFilter) {
        filter = [searchbarFilter];
      } else if (!radiusFilter && geoFilter && searchbarFilter) {
        filter = [geoFilter.properties.nom, searchbarFilter];
      } else if (!geoFilter && radiusFilter && searchbarFilter) {
        filter = ["Autour de moi", searchbarFilter];
      }
      setBreweriesByFilter({
        filter,
        value: filteredBreweries,
      });
    } else setBreweriesByFilter({});
  }, [radiusFilter, geoFilter, setBreweriesByFilter, searchbarFilter]);

  return filteredBreweries?.map((brewerie) => (
    <Marker
      position={[brewerie.lat, brewerie.lon]}
      icon={defaultIcon}
      key={brewerie.id}
    >
      <Popup>
        <StyledCard elevation={0}>
          <CardMedia
            component="img"
            image={brewerie.image}
            alt={`image/logo brasserie '${brewerie.title}'`}
          />
          <StyledCardContent>
            <Box>
              <Typography variant="h5" component="h5">
                {brewerie.title}
              </Typography>
              <Typography
                fontSize="1rem"
                color="gray"
                variant="p"
                component="p"
              >
                {brewerie.address}
              </Typography>
            </Box>
            <StyledBox>
              <Phone />
              <Typography fontSize="1rem" variant="p" component="p">
                {brewerie.phone}
              </Typography>
            </StyledBox>
            <Divider />
            <StyledLink to={`/breweries/${brewerie.id}`}>
              Plus de détails
            </StyledLink>
          </StyledCardContent>
        </StyledCard>
      </Popup>
    </Marker>
  ));
};

export default BreweryMarker;
