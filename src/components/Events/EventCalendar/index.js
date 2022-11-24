import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr-CA";
import { Box, Button, Container, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../UI/CustomModal";
import EventForm from "../EventForm";
import SimpleModalContent from "../../UI/SimpleModalContent";

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
  time: "Début",
  event: "Evènement",
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
  showMore: (total) => `+${total} plus`,
};

function EventCalendar() {
  const { isLogged, role } = useSelector((state) => state.user);
  const { events: allEvents } = useSelector((state) => state.event);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const dispatch = useDispatch();

  const formattedEvents = allEvents.map((event) => ({
    id: event.id,
    title: `${event.title} - ${event.description}`,
    allDay: false,
    start: new Date(event.event_start),
    end: new Date(event.event_start),
  }));

  const handleAddEvent = () => {
    setModalContent(<EventForm onCancel={() => setIsOpen(false)} />);
    setIsOpen(true);
  };

  const handleDeleteEvent = () => {
    dispatch({
      type: "DELETE_EVENT",
      id: selectedEventId,
    });
  };

  const handleSelectEvent = (event) => {
    const { id, title } = event;

    setSelectedEventId(id);
    setModalContent(
      <SimpleModalContent
        onValidate={handleDeleteEvent}
        title={`Suppréssion événement "${title}"`}
        description="Êtes-vous sûr de vouloir supprimer cet événement ?"
        onCancel={() => setIsOpen(false)}
      />
    );
    setIsOpen(true);
  };

  return (
    <>
      <CustomModal isOpen={isOpen}>{modalContent}</CustomModal>
      <Container>
        <Box>
          <Typography>Calendrier des événement</Typography>
          {isLogged && role === "brewer" && (
            <Button onClick={handleAddEvent} startIcon={<Add />}>
              Créer un événement
            </Button>
          )}
        </Box>
        <Calendar
          defaultDate={new Date()}
          localizer={localizer}
          culture="fr"
          messages={messages}
          events={formattedEvents?.length ? formattedEvents : []}
          popup
          onSelectEvent={(event) => handleSelectEvent(event)}
          style={{ height: 500, margin: "50px" }}
        />
      </Container>
    </>
  );
}

export default EventCalendar;
