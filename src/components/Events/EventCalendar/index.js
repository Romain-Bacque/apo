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
import { Box, Button, Container, Typography } from "@mui/material";
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
  noEventsInRange: "Il n'y a pas d'événements dans cette gamme.",
  showMore: (total) => `+${total} de plus`,
};

// Style
const StyledCalendar = styled(Calendar)({
  fontSize: "1.5rem",
  fontFamily: "arial, sans-serif",
  height: 500,
  margin: "50px",
  maxWidth: "90%",
});

// Component
function EventCalendar() {
  const { isLogged, role } = useSelector((state) => state.user);
  const { ownerEvents } = useSelector((state) => state.event);
  const { participantEvents } = useSelector((state) => state.event);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const dispatch = useDispatch();

  const formattedOwnerEvents = ownerEvents.map((event) => ({
    id: event.id,
    title: `${event.title} - ${event.description}`,
    description: event.description,
    participants: event.participants,
    brewery: event.brewery,
    isOwner: true,
    start: new Date(event.event_start),
    end: new Date(event.event_start),
  }));

  const handleEventStyle = (event) => {
    const backgroundColor = event.isOwner ? "green" : "red";
    const style = {
      backgroundColor,
      opacity: 0.8,
    };
    return {
      style,
    };
  };

  const handleAddEvent = () => {
    setModalContent(<EventForm onCancel={() => setIsOpen(false)} />);
    setIsOpen(true);
  };

  const handleDeleteEvent = () => {
    dispatch({
      type: "DELETE_EVENT",
      eventId: selectedEventId,
    });
  };

  const handleEventDetails = (event) => {
    setModalContent(
      <EventDetails
        {...event}
        onValidate={handleDeleteEvent}
        onCancel={() => setIsOpen(false)}
      />
    );
    setIsOpen(true);
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
      <Container>
        <Box>
          <Typography>Calendrier des événement</Typography>
          {isLogged && role === "brewer" && (
            <Button onClick={handleAddEvent} startIcon={<Add />}>
              Créer un événement
            </Button>
          )}
        </Box>
        <StyledCalendar
          defaultDate={new Date()}
          localizer={localizer}
          culture="fr"
          messages={messages}
          events={formattedOwnerEvents?.length ? formattedOwnerEvents : []}
          popup
          onSelectEvent={(event) => handleEventDetails(event)}
          eventPropGetter={handleEventStyle}
        />
      </Container>
    </>
  );
}

export default EventCalendar;
