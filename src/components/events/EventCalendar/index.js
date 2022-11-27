// hook import
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// other import
import styled from "@emotion/styled";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr-CA";
// component import
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import CustomModal from "../../UI/CustomModal";
import EventForm from "../EventForm";
import EventDetails from "../EventDetails";

const locales = {
  fr,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const messages = {
  date: "Date",
  time: "Heure",
  event: "Détails",
  allDay: "Toute la journée",
  week: "Semaine",
  day: "Journée",
  month: "Mois",
  previous: "Précédent",
  next: "Suivant",
  yesterday: "Hier",
  tomorrow: "Demain",
  today: "Aujourd'hui",
  agenda: "Agenda",
  noEventsInRange: "Il n'y a pas d'événement.",
  showMore: (total) => `+${total} de plus`,
};

// Style
const StyledBox = styled(Box)({
  padding: "1rem",
  borderBottom: "1px solid rgb(200, 200, 200)",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: "1rem",
});
const Title = styled(Typography)(({ theme }) => ({
  flex: 1.5,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    flex: 1,
  },
}));
const EventFormButton = styled(Button)({
  flex: 1,
  fontSize: "1rem",
});
const CalendarBox = styled(Box)({
  height: "80%",
  maxHeight: "65%",
  margin: "2rem",
});
const StyledCalendar = styled(Calendar)({
  textTransform: "capitalize",
  fontSize: "1.4rem",
  fontFamily: "arial, sans-serif",
  height: "100%",
  padding: "2rem",
  borderRadius: "10px",
  backgroundColor: "white",
  color: "gray",
});
const StyledStack = styled(Stack)({
  marginTop: "1.5rem",
  maxWidth: "95%",
});
const StyledChip = styled(Chip)({
  color: "white",
  fontSize: "1rem",
  fontWeight: "bold",
});

// Component
function EventCalendar() {
  const { isLogged, role } = useSelector((state) => state.user);
  const { ownerEvents } = useSelector((state) => state.event);
  const { participantEvents } = useSelector((state) => state.event);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const dispatch = useDispatch();

  const events = ownerEvents
    .map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      participants: event.participants,
      brewery: event.brewery,
      isOwner: true,
      start: new Date(event.event_start),
      end: new Date(event.event_start),
    }))
    .concat(
      participantEvents.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        participants: event.participants,
        brewery: event.brewery,
        isOwner: false,
        start: new Date(event.event_start),
        end: new Date(event.event_start),
      }))
    );

  const handleEventStyle = (event) => {
    const backgroundColor = event.isOwner ? "#8c6c3d" : "#f2cc96";
    const style = {
      backgroundColor,
      opacity: 0.8,
      color: "white",
      borderRadius: "20px",
      padding: "0 1rem",
    };

    return {
      style,
    };
  };

  const handleAddEvent = () => {
    setModalContent(<EventForm onCancel={() => setIsOpen(false)} />);
    setIsOpen(true);
  };

  const handleDeleteEvent = (isOwner, eventId) => {
    if (isOwner) {
      dispatch({
        type: "DELETE_EVENT",
        eventId,
      });
    } else {
      dispatch({
        type: "DELETE_PARTICIPANT",
        eventId,
      });
    }
    setIsOpen(false);
  };

  const handleEventDetails = (event) => {
    setIsOpen(true);
    setModalContent(
      <EventDetails
        {...event}
        onValidate={handleDeleteEvent}
        onCancel={() => setIsOpen(false)}
      />
    );
  };

  useEffect(() => {
    dispatch({
      type: "RESET_EVENTS",
    });
    if (isLogged) {
      dispatch({
        type: "FETCH_PARTICIPANT_EVENTS",
      });
    }
    if (isLogged && role === "brewer") {
      dispatch({
        type: "FETCH_OWNER_EVENTS",
      });
    }
  }, [isLogged, role, dispatch]);

  return (
    <>
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
        {modalContent}
      </CustomModal>
      <Container sx={{ height: "100%" }}>
        <StyledBox>
          <Title variant="h4" component="h3">
            Evénements
          </Title>
          {isLogged && role === "brewer" && (
            <EventFormButton onClick={handleAddEvent} startIcon={<Add />}>
              Créer un événement
            </EventFormButton>
          )}
        </StyledBox>
        <CalendarBox>
          <StyledCalendar
            defaultDate={new Date()}
            localizer={localizer}
            culture="fr"
            messages={messages}
            events={events?.length ? events : []}
            popup
            onSelectEvent={(event) => handleEventDetails(event)}
            eventPropGetter={handleEventStyle}
          />
          <StyledStack direction="row" spacing={1}>
            <StyledChip
              label="Propriétaire"
              sx={{ backgroundColor: "#8c6c3d" }}
            />
            <StyledChip
              label="Participant"
              sx={{ backgroundColor: "#f2cc96" }}
            />
          </StyledStack>
        </CalendarBox>
      </Container>
    </>
  );
}

export default EventCalendar;
