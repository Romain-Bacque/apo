import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardHeader, Container } from "@mui/material";
import { Home, Phone, Event } from "@mui/icons-material";
import styled from "@emotion/styled";
import axios from "axios";
import TagsList from "../../UI/TagsList";
import { apiConfig } from "../../../config/config";
import EventCard from "../breweryEvents/EventCard";

// Style
const StyledTypography = styled(Box)({
  display: "flex",
  gap: 0.5,
  fontStyle: "italic",
  fontSize: "1.3rem",
  color: "gray",
});

// Component
function BreweryDetails() {
  const loading = useSelector((state) => state.loading);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [filteredBrewery, setFilteredBrewery] = useState(null);

  const fetchBreweryDetails = useCallback(async () => {
    if (!id) return;
    dispatch({
      type: "PENDING",
      message: null,
    });
    try {
      const response = await axios.get(
        `http://${apiConfig.host}:${apiConfig.port}/brewery/${Number(id)}`
      );

      if (response.status === 200) {
        const breweryDetails = response.data.data[0];

        dispatch({
          type: "SUCCESS",
          message: null,
        });
        setFilteredBrewery(breweryDetails);
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        message: "Une erreur est survenue.",
      });
    }
  }, [dispatch, id]);

  // Get brewery details
  useEffect(() => {
    fetchBreweryDetails();
  }, [fetchBreweryDetails, dispatch, id]);

  return filteredBrewery ? (
    <Container sx={{ width: "800px" }}>
      <Card elevation={0} sx={{ mb: "2rem" }}>
        <CardHeader title={filteredBrewery.title} />
        {filteredBrewery.image && (
          <CardMedia
            component="img"
            height="140px"
            width="100%"
            image={filteredBrewery.image.path}
            alt={`Photo de la brasserie '${filteredBrewery.title}'`}
          />
        )}
        <CardContent>
          <StyledTypography variant="p" component="p">
            <Home />
            {filteredBrewery.address}
          </StyledTypography>
          <StyledTypography variant="p" component="p">
            <Phone />
            {filteredBrewery.phone}
          </StyledTypography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: "2rem" }}
          />
          <Typography sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
            {filteredBrewery.description}
          </Typography>
          <Typography component="h5" variant="h6" color="text.secondary">
            Spécialité(s) de bière:
            <TagsList list={filteredBrewery.categories} />
          </Typography>
        </CardContent>
      </Card>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="1.5rem"
        >
          <Typography variant="h5" component="h4">
            {`Evènement(s) prévu(s) (${
              filteredBrewery.events && filteredBrewery.events.length > 0
                ? filteredBrewery.events.length
                : 0
            })`}
          </Typography>
          <Button
            sx={{
              width: "fit-content",
              m: 0,
              borderColor: "#f2cc96",
              color: "#f2cc96",
            }}
            variant="outlined"
            component={Link}
            to="/Brewery/event"
          >
            <Event />
            Planning des évènements
          </Button>
        </Box>

        {filteredBrewery.events && filteredBrewery.events.length > 0 ? (
          <Swiper
            pagination={{
              type: "progressbar",
            }}
            navigation
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {filteredBrewery.events.map((event, index) => (
              <SwiperSlide key={index}>
                <EventCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Typography>Aucun évènement de prévu.</Typography>
        )}
      </Box>
    </Container>
  ) : (
    !loading.status && (
      <Box>
        <Typography variant="h5" mb="0.5rem" textAlign="center" component="p">
          Aucun résultat.
        </Typography>
        <Button component={Link} to="/">
          Retour à l'accueil
        </Button>
      </Box>
    )
  );
}

export default BreweryDetails;
