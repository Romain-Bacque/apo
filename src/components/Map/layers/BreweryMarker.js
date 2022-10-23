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
  setBreweriesByFilter,
}) => {
  const geoFilter = getGeoFilter();
  const radiusFilter = getRadiusFilter();

  filteredBreweries = data
    ?.filter((brewery) => {
      let currentPoint, centerPoint;
      let doFilter = true;

      if (radiusFilter) {
        const { coordinates } = radiusFilter;

        centerPoint = L.latLng(coordinates);
        currentPoint = L.latLng(brewery.lat, brewery.lon);
        doFilter =
          centerPoint.distanceTo(currentPoint) / 1000 <= radiusFilter.radius; // 'distanceTo' method get distance between two points // 'distanceTo' function works as meters, so we divide by 1000 to get the value in kilometers
      } else if (geoFilter) {
        // 'booleanPointInPolygon' check if current feature coordinate points are present in the selected continent (geoFilter), return 'true' or 'false'
        doFilter = booleanPointInPolygon([brewery.lon, brewery.lat], geoFilter);
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

  if (filteredBreweries) {
    // setBreweriesByFilter({filter:, filteredBreweries});
  } else setBreweriesByFilter([]);

  return filteredBreweries;
};

export default BreweryMarker;
