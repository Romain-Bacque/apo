import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { Box, Button, CardHeader, Container, IconButton } from "@mui/material";
import { Home, Phone, Event, ArrowBackRounded, Map } from "@mui/icons-material";
import styled from "@emotion/styled";
import axios from "axios";
import TagsList from "../../UI/TagsList";
import { apiConfig } from "../../../config/config";
import EventCard from "../breweryEvents/EventCard";
import CustomModal from "../../UI/CustomModal";

// Style
const StyledTypography = styled(Box)({
  display: "flex",
  gap: 0.5,
  fontStyle: "italic",
  fontSize: "1.3rem",
  color: "gray",
});
const StyledSwiper = styled(Swiper)({
  padding: "2rem",
});
const EventDescription = styled(Typography)({
  marginTop: "2rem",
  marginBottom: "2rem",
});
const StyledMapIcon = styled(Map)({
  fontSize: "3rem",
  color: "gray",
});

// Component
function BreweryDetails() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const loading = useSelector((state) => state.loading);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredBrewery, setFilteredBrewery] = useState(null);
  const instance = axios.create({
    baseURL: `http://${apiConfig.host}:${apiConfig.port}`,
    withCredentials: true,
  });

  const handleModal = (eventId) => {
    setSelectedEvent(eventId);
    setIsOpen(true);
  };

  const handleSetParticipant = async (eventId) => {
    setIsOpen(false);
    if (!id) return;
    dispatch({
      type: "PENDING",
      message: null,
    });
    try {
      const response = await instance.post(`/event/${+eventId}/user`, {});

      if (response.status === 200) {
        const RegistrationMessage = response.data.data;

        dispatch({
          type: "SUCCESS",
          message: RegistrationMessage,
        });
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        message: "Une erreur est survenue pendant l'inscription.",
      });
    }
  };

  const fetchBreweryDetails = useCallback(async () => {
    if (!id) return;
    dispatch({
      type: "PENDING",
      message: null,
    });
    try {
      const response = await instance.get(`/brewery/${+id}`);

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
    <>
      <CustomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onValidate={handleSetParticipant}
        id={selectedEvent}
        title="Inscription à l'évènement"
        description="Etes-vous sûr de vouloir vous inscrire ?"
      />
      <Container style={{ maxWidth: "800px" }}>
        <Card elevation={0} sx={{ mb: "2rem" }}>
          <CardHeader
            action={
              <IconButton onClick={() => navigate("/")}>
                <StyledMapIcon />
              </IconButton>
            }
            title={filteredBrewery.title}
          />
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
            <EventDescription>{filteredBrewery.description}</EventDescription>
            <Typography component="h5" variant="h6">
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
            <StyledSwiper navigation modules={[Pagination, Navigation]}>
              {filteredBrewery.events.map((event) => (
                <SwiperSlide key={event.id}>
                  <EventCard
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    eventStart={event.eventStart}
                    totalParticipants={
                      event.totalParticipants ? event.totalParticipants : 0
                    }
                    onRegistration={handleModal}
                  />
                </SwiperSlide>
              ))}
            </StyledSwiper>
          ) : (
            <Typography>Aucun évènement de prévu.</Typography>
          )}
        </Box>
      </Container>
    </>
  ) : (
    loading.status !== "pending" && (
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
