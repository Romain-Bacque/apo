// hook import
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// other import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Home, Phone, Event, Map } from "@mui/icons-material";
import styled from "@emotion/styled";
import axios from "axios";
// component import
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";
import TagsList from "../../UI/TagsList";
import EventCard from "../breweryEvents/EventCard";
import CustomModal from "../../UI/CustomModal";
// config file import
import { apiConfig } from "../../../config/config";
import SimpleModalContent from "../../UI/simpleModalContent";

// Style
const BreweryDetailsContainer = styled(Container)({
  width: "900px",
  maxWidth: "90%",
});
const BreweryDetailsCard = styled(Card)({
  marginBottom: "2rem",
  borderRadius: "10px",
  border: "1px solid rgb(230, 230, 230)",
});
const BreweryDescription = styled(Typography)({
  margin: "2rem auto",
  overflowY: "auto",
  maxHeight: "2rem",
});
const StyledMapIcon = styled(Map)({
  fontSize: "3rem",
  color: "gray",
});
const StyledCardHeader = styled(CardHeader)({
  padding: "0.5rem 1rem",
});
const StyledCardMedia = styled(CardMedia)({
  height: "140px",
  width: "100%",
});
const StyledTypography = styled(Box)({
  display: "flex",
  gap: 0.5,
  fontStyle: "italic",
  fontSize: "1.3rem",
  color: "gray",
});
const EventBox = styled(Box)({
  marginTop: "2rem",
});
const EventHeaderBox = styled(Box)({
  marginBottom: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const EventTitle = styled(Typography)({
  flex: 2,
});
const EventSchedulerLink = styled(Button)({
  flex: 1,
  width: "auto",
});
const StyledSwiper = styled(Swiper)({
  padding: "1rem",
});
const NoResultTypography = styled(Typography)({
  marginBottom: "0.5rem",
  textAlign: "center",
});

// Component
function BreweryDetails() {
  const [eventId, setEventId] = useState(null);
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

  const handleModal = (id) => {
    setEventId(id);
    setIsOpen(true);
  };

  const handleSetParticipant = async () => {
    setIsOpen(false);
    if (!eventId) return;
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
      <CustomModal isOpen={isOpen}>
        <SimpleModalContent
          onValidate={handleSetParticipant}
          onCancel={() => setIsOpen(false)}
          title="Inscription à l'évènement"
          description="Etes-vous sûr de vouloir vous inscrire ?"
        />
      </CustomModal>
      <BreweryDetailsContainer>
        <BreweryDetailsCard>
          <StyledCardHeader
            title={filteredBrewery.title}
            action={
              <Tooltip title={"Retour à l'accueil"}>
                <IconButton onClick={() => navigate("/")}>
                  <StyledMapIcon />
                </IconButton>
              </Tooltip>
            }
          />
          {filteredBrewery.image && (
            <StyledCardMedia
              component="img"
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
            <BreweryDescription>
              {filteredBrewery.description}
            </BreweryDescription>
            <Typography component="h5" variant="h6">
              Spécialité(s) de bière:
              <TagsList list={filteredBrewery.categories} />
            </Typography>
          </CardContent>
        </BreweryDetailsCard>
        <EventBox>
          <EventHeaderBox>
            <EventTitle variant="h5" component="h4">
              {`Evènement(s) prévu(s) (${
                filteredBrewery.events && filteredBrewery.events.length > 0
                  ? filteredBrewery.events.length
                  : 0
              })`}
            </EventTitle>
            <EventSchedulerLink
              startIcon={<Event />}
              component={Link}
              to="/eventCalendar"
            >
              Planning
            </EventSchedulerLink>
          </EventHeaderBox>
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
        </EventBox>
      </BreweryDetailsContainer>
    </>
  ) : (
    loading.status !== "pending" && (
      <Box>
        <NoResultTypography variant="h5" component="p">
          Aucun résultat.
        </NoResultTypography>
        <Button component={Link} to="/">
          Retour à l'accueil
        </Button>
      </Box>
    )
  );
}

export default BreweryDetails;
