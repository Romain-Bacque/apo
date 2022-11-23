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
import CustomModal from "../../UI/CustomModal";
import EventForm from "../EventForm";

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
const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];

function EventCalendar() {
  const [isOpen, setIsOpen] = useState(false);
  const [allEvents, setAllEvents] = useState(events);

  return (
    <>
      <CustomModal isOpen={isOpen}>
        <EventForm onCancel={() => setIsOpen(false)} />
      </CustomModal>
      <Container>
        <Box>
          <Typography>Calendrier des évènement</Typography>
          <Button onClick={() => setIsOpen(true)} startIcon={<Add />}>
            Créer un évènement
          </Button>
        </Box>
        <Calendar
          defaultDate={new Date()}
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="start"
          style={{ height: 500, margin: "50px" }}
        />
      </Container>
    </>
  );
}

export default EventCalendar;
