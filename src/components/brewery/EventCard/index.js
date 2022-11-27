// hook import
import { useSelector } from "react-redux";
// other import
import PropTypes from "prop-types";
import dayjs from "dayjs";
import styled from "@emotion/styled";
// component import
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

// Style
const StyledCard = styled(Card)({
  minHeight: "120px",
  width: "100%",
  margin: "auto",
  display: "flex",
  justifyContent: "space-between",
  borderRadius: "10px",
  border: "1px solid rgb(230, 230, 230)",
});
const StyledBox = styled(Box)({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "1rem",
  backgroundColor: "#f2cc96",
  color: "white",
});
const TitleTypography = styled(Typography)({
  backgroundColor: "#d9b88a",
  fontWeight: 700,
  padding: "0.5rem 1rem",
  borderRadius: "5px",
});
const StyledCardContent = styled(CardContent)({
  flex: "1.5",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
const EventDescription = styled(CardContent)({
  overflowY: "auto",
  maxHeight: "2rem",
  marginBottom: "1rem",
});

// Component
function EventCard({
  id,
  title,
  description,
  eventStart,
  totalParticipants,
  onRegistration,
}) {
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <StyledCard>
      <StyledBox>
        <TitleTypography variant="h6">{title}</TitleTypography>
        <Box>
          <Box>
            <Typography fontWeight="700" component="h5" variant="h6">
              Début:
            </Typography>
            <Typography component="h5" variant="h6">
              {dayjs(eventStart).format("DD/MM/YYYY HH:mm:ss")}
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
  eventStart: PropTypes.string.isRequired,
  totalParticipants: PropTypes.number.isRequired,
  onRegistration: PropTypes.func.isRequired,
};

export default EventCard;
