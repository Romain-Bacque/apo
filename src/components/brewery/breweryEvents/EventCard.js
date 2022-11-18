import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

function EventCard({ title, description, event_start, participants }) {
  return (
    <Card sx={{ width: "90%", m: "auto" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2">{title}</Typography>
          </Box>
          <Typography>{description}</Typography>
          <CardActions>
            <Button>S'inscrire</Button>
          </CardActions>
        </Box>
        <Box>
          <Typography variant="body2">
            Début: {dayjs(event_start).format("DD/MM/YYYY hh:mm:ss")}
          </Typography>
          <Typography variant="body2">{participants}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

EventCard.propTypes = {
  title: PropTypes.bool.isRequired,
  description: PropTypes.object.isRequired,
  event_start: PropTypes.func.isRequired,
  participants: PropTypes.func.isRequired,
};

export default EventCard;
