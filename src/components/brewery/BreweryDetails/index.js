/* eslint-disable import/no-unresolved */

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
import EventCard from "../EventCard";
import CustomModal from "../../UI/CustomModal";
import SimpleModalContent from "../../UI/SimpleModalContent";
// action creator import
import { addParticipant, fetchBreweryDetails } from "../../../actions";

// Style
const BreweryDetailsContainer = styled(Container)({
  width: "900px",
  maxWidth: "90%",
});
const BreweryDetailsCard = styled(Card)({
  marginBottom: "1rem",
  borderRadius: "10px",
  border: "1px solid rgb(230, 230, 230)",
});
const BreweryDescription = styled(Typography)({
  margin: "1rem auto",
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
  marginTop: "1rem",
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
  const isLogged = useSelector((state) => state.user.isLogged);
  const [eventId, setEventId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const loading = useSelector((state) => state.loading);
  const breweryDetails = useSelector((state) => state.brewery.breweryDetails);
  const { id: breweryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModal = (id) => {
    setEventId(id);
    setIsOpen(true);
  };

  const handleSetParticipant = async (eventId) => {
    setIsOpen(false);
    if (!eventId) return;

    const action = addParticipant(eventId);

    dispatch(action);
  };

  const getBreweryDetails = useCallback(async () => {
    if (!breweryId) return;

    const action = fetchBreweryDetails(breweryId);

    dispatch(action);
  }, [dispatch, breweryId]);

  // Get brewery details
  useEffect(() => {
    getBreweryDetails();
  }, [getBreweryDetails]);

  return breweryDetails ? (
    <>
      {isOpen && (
        <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
          <SimpleModalContent
            id={eventId}
            onValidate={handleSetParticipant}
            onCancel={() => setIsOpen(false)}
            title="Inscription à l'évènement"
            description="Etes-vous sûr de vouloir vous inscrire ?"
          />
        </CustomModal>
      )}
      <BreweryDetailsContainer>
        <BreweryDetailsCard>
          <StyledCardHeader
            title={breweryDetails.title}
            action={
              <Tooltip title={"Retour à l'accueil"}>
                <IconButton onClick={() => navigate("/")}>
                  <StyledMapIcon />
                </IconButton>
              </Tooltip>
            }
          />
          {breweryDetails.image && (
            <StyledCardMedia
              component="img"
              image={breweryDetails.image.path}
              alt={`Photo de la brasserie '${breweryDetails.title}'`}
            />
          )}
          <CardContent>
            <StyledTypography variant="p" component="p">
              <Home />
              {breweryDetails.address}
            </StyledTypography>
            <StyledTypography variant="p" component="p">
              <Phone />
              {breweryDetails.phone}
            </StyledTypography>
            <BreweryDescription>
              {breweryDetails.description}
            </BreweryDescription>
            <Typography component="h5" variant="h6">
              Spécialité(s) de bière:
              <TagsList list={breweryDetails.categories} />
            </Typography>
          </CardContent>
        </BreweryDetailsCard>
        <EventBox>
          <EventHeaderBox>
            <EventTitle variant="h5" component="h4">
              {`Evènement(s) prévu(s) (${
                breweryDetails.events && breweryDetails.events.length > 0
                  ? breweryDetails.events.length
                  : 0
              })`}
            </EventTitle>
            {isLogged && (
              <EventSchedulerLink
                startIcon={<Event />}
                component={Link}
                to="/eventCalendar"
              >
                Planning
              </EventSchedulerLink>
            )}
          </EventHeaderBox>
          {breweryDetails.events && breweryDetails.events.length > 0 ? (
            <StyledSwiper
              centeredSlides
              spaceBetween={10}
              navigation
              modules={[Pagination, Navigation]}
            >
              {breweryDetails.events.map((event) => (
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
