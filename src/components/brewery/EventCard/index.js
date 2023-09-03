// hook import
import { useSelector } from "react-redux";
// other import
import PropTypes from "prop-types";
import dayjs from "dayjs";
// component import
import { Box, Button, CardActions, Typography } from "@mui/material";
// styled component import
import {
  EventDescription,
  StyledBox,
  StyledCard,
  StyledCardContent,
  TitleTypography,
} from "./style";

// Component
function EventCard({
  id,
  title,
  description,
  event_start,
  totalParticipants,
  onRegistration,
}) {
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <StyledCard>
      <StyledBox>
        <TitleTypography variant="h6">{title}</TitleTypography>
        <Box p="1rem">
          <Box>
            <Typography fontWeight="700" component="h5" variant="h6">
              Début:
            </Typography>
            <Typography component="h5" variant="h6">
              {dayjs(event_start).format("DD/MM/YYYY HH:mm:ss")}
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight="700" component="h6" variant="h6">
              Participants:
            </Typography>
            <Typography component="h6" variant="h6">
              {totalParticipants}
            </Typography>
          </Box>
        </Box>
      </StyledBox>
      <StyledCardContent>
        <EventDescription>{description}</EventDescription>
        <CardActions>
          <Button disabled={!isLogged} onClick={() => onRegistration(id)}>
            S'inscrire *
          </Button>
        </CardActions>
        <Typography color="gray" variant="body3">
          * Vous devez être connecté
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  event_start: PropTypes.string.isRequired,
  totalParticipants: PropTypes.number.isRequired,
  onRegistration: PropTypes.func.isRequired,
};

export default EventCard;
