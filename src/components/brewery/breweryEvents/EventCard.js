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

function EventCard({ title, description, event_date, participants }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Box>
          <Typography variant="body2">{event_date}</Typography>
          <Typography variant="body2">{participants}</Typography>
        </Box>
        <CardActions>
          <Button component={Link} to="/Brewery/event">
            S'inscrire
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

EventCard.propTypes = {
  title: PropTypes.bool.isRequired,
  description: PropTypes.object.isRequired,
  event_date: PropTypes.func.isRequired,
  participants: PropTypes.func.isRequired,
};

export default EventCard;
