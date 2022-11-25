import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import styled from "@emotion/styled";

// Style
const StyledBox = styled(Box)({
  marginBottom: "2rem",
});
const TitleTypography = styled(Typography)({});
const DescriptionTypography = styled(Typography)({});
const EventStartTypography = styled(Typography)({});
const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));
const StyledDivider = styled(Divider)({
  marginTop: "1rem",
});
const StyledCardActions = styled(CardActions)({
  padding: 0,
  paddingTop: "2rem",
});

// Component
function EventDetails({
  id,
  title,
  description,
  brewery,
  participants,
  start: eventStart,
  onValidate,
  onCancel,
}) {
  const [isCancelEventClicked, setIsCancelEventClicked] = useState(false);
  console.log(
    id,
    title,
    description,
    brewery,
    participants,
    eventStart,
    onValidate,
    onCancel
  );
  const handleClick = () => {
    if (!isCancelEventClicked) {
      setIsCancelEventClicked(true);
    } else {
      onValidate(id);
    }
  };

  return (
    <CardContent>
      <StyledBox>
        <TitleTypography component="h5" variant="h5">
          {title}
        </TitleTypography>
        <DescriptionTypography component="p" variant="h6" color="gray">
          {description}
        </DescriptionTypography>
        <DescriptionTypography component="p" variant="h6" color="gray">
          Brasserie : {brewery.title}
        </DescriptionTypography>
        <Box>
          {participants?.name &&
            participants.map((participant) => (
              <DescriptionTypography component="p" variant="h6" color="gray">
                {`${participant.name} - ${participant.email}}`}
              </DescriptionTypography>
            ))}
        </Box>
        <EventStartTypography>
          Début : {dayjs(eventStart).format("DD/MM/YYYY HH:mm:ss")}
        </EventStartTypography>
      </StyledBox>
      {isCancelEventClicked && (
        <Typography>
          Etes-vous sûr d'annuler/supprimer cet événement ?
        </Typography>
      )}
      <StyledDivider light />
      <StyledCardActions>
        <Button onClick={handleClick} type="submit" size="small">
          {!isCancelEventClicked ? "Supprimer l'événement" : "Confirmer"}
        </Button>
        <CancelButton variant="outlined" onClick={onCancel} size="small">
          Annuler
        </CancelButton>
      </StyledCardActions>
    </CardContent>
  );
}

EventDetails.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  brewery: PropTypes.object.isRequired,
  participants: PropTypes.array.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  onValidate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EventDetails;
