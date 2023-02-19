// hook import
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// other import
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr-CA";
// component import
import { dateFnsLocalizer } from "react-big-calendar";
import { Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import CustomModal from "../../UI/CustomModal";
import EventForm from "../EventForm";
import EventDetails from "../EventDetails";
// action creator import
import {
  deleteEvent,
  deleteParticipant,
  fetchOwnerEvents,
  fetchParticipantEvents,
  resetEvents,
} from "../../../actions";
// styled component import
import {
  CalendarBox,
  EventFormButton,
  StyledBox,
  StyledCalendar,
  StyledChip,
  StyledStack,
  Title,
} from "./style";

const locales = {
  fr,
};

// dateFnsLocalizer is a function in the react-big-calendar library that is used to customize the calendar's behavior with respect to date and time formatting, localization, and time zones.
const localizer = dateFnsLocalizer({
  format, // used to format a date object into a string.
  parse, // This function is used to parse a string into a date object.
  startOfWeek, // This function is used to determine the start of a week for a given date.
  getDay, // This function is used to get the day of the week for a given date.
  locales, // specify the locale (here 'fr').
});

const messagesFr = {
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
    let action;

    if (isOwner) {
      action = deleteEvent(eventId);
    } else {
      action = deleteParticipant(eventId);
    }
    dispatch(action);
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
    dispatch(resetEvents());
    if (isLogged) {
      dispatch(fetchParticipantEvents());
    }
    if (isLogged && role === "brewer") {
      dispatch(fetchOwnerEvents());
    }
  }, [isLogged, role, dispatch]);

  return (
    <>
      {/* If user is not connected, then it redirect to home page */}
      {!isLogged && <Navigate to="/" replace />}
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
        {modalContent}
      </CustomModal>
      <Container>
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
            messages={messagesFr}
            events={events?.length ? events : []}
            popup
            onSelectEvent={(event) => handleEventDetails(event)}
            eventPropGetter={handleEventStyle}
          />
        </CalendarBox>
        {/* Legends */}
        <StyledStack direction="row" spacing={1}>
          <StyledChip
            label="Propriétaire"
            sx={{ backgroundColor: "#8c6c3d" }}
          />
          <StyledChip label="Participant" sx={{ backgroundColor: "#f2cc96" }} />
        </StyledStack>
      </Container>
    </>
  );
}

export default EventCalendar;
