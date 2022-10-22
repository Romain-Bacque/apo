import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import defaultIcon from "../icons/defaultIcon";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Home, Phone } from "@mui/icons-material";
import TagsList from "../../UI/TagsList";
import styled from "@emotion/styled";

// Style
const StyledLink = styled(Link)({
  display: "inline-block",
  width: "100%",
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginTop: "2rem",
  textAlign: "center",
});

let filteredBreweries = null;

const BreweryMarker = ({ data, getGeoFilter, setBreweriesByRegion }) => {
  const geoFilter = getGeoFilter();

  filteredBreweries = data
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
          <Card
            elevation={0}
            sx={{ padding: 0.5, border: "none", width: "200px" }}
          >
            <CardMedia
              component="img"
              image={brewerie.image}
              alt={`image/logo brasserie '${brewerie.title}'`}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "2rem 0",
              }}
            >
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
              <Box display={"flex"} alignItems="center" gap={0.6}>
                <Phone />
                <Typography
                  fontSize="1rem"
                  gutterBottom
                  variant="p"
                  component="p"
                >
                  {brewerie.phone}
                </Typography>
              </Box>
              <Divider />
              <StyledLink to={`/breweries/${brewerie.id}`}>
                Plus de détails
              </StyledLink>
            </CardContent>
          </Card>
        </Popup>
      </Marker>
    ));

  useEffect(() => {
    if (geoFilter && filteredBreweries) {
      setBreweriesByRegion(filteredBreweries);
    } else setBreweriesByRegion([]);
  }, [geoFilter, setBreweriesByRegion]);

  return filteredBreweries;
};

export default BreweryMarker;
