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
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

// Style
const StyledCard = styled(Card)({
  minHeight: "120px",
  width: "90%",
  margin: "auto",
  display: "flex",
  justifyContent: "space-between",
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
const StyledCardContent = styled(CardContent)({
  flex: "1.5",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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
        <Typography fontWeight={700} variant="h5">
          {title}
        </Typography>
        <Box>
          <Typography variant="h6">
            Début: {dayjs(eventStart).format("DD/MM/YYYY hh:mm:ss")}
          </Typography>
          <Typography variant="h6">
            Nombre de participants: {totalParticipants}
          </Typography>
        </Box>
      </StyledBox>
      <StyledCardContent>
        <Typography>{description}</Typography>
        <CardActions>
          <Button disabled={!isLogged} onClick={() => onRegistration(id)}>
            S'inscrire *
          </Button>
        </CardActions>
        <Typography color="gray" variant="body3">
          * Vous devez être connecté pour pouvoir vous inscrire
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.bool.isRequired,
  description: PropTypes.object.isRequired,
  eventStart: PropTypes.func.isRequired,
  totalParticipants: PropTypes.func.isRequired,
  onRegistration: PropTypes.func.isRequired,
};

export default EventCard;
