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

let buttonTextContent = null;

// Style
const StyledBox = styled(Box)({
  marginBottom: "2rem",
});
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
const ParticipantTypography = styled(Typography)({
  overflowY: "auto",
  maxHeight: "5rem",
  marginTop: "1rem",
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
  isOwner,
}) {
  const [isCancelClicked, setIsCancelClicked] = useState(false);

  const handleClick = () => {
    if (!isCancelClicked) {
      setIsCancelClicked(true);
    } else {
      onValidate(isOwner, id);
    }
  };

  if (isOwner) {
    buttonTextContent = "Supprimer/Annuler l'événement";
  } else {
    buttonTextContent = "Se désinscrire";
  }

  return (
    <CardContent>
      <StyledBox>
        <Box marginBottom="1rem">
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography component="p" variant="h6" color="gray">
            {description}
          </Typography>
        </Box>
        <Typography>Lieu : {brewery.address}</Typography>
        <Typography>
          Début : {dayjs(eventStart).format("DD/MM/YYYY HH:mm:ss")}
        </Typography>
        <Box>
          {participants.length && participants[0].name && (
            <>
              <ParticipantTypography component="p" variant="h6">
                Participants :
              </ParticipantTypography>
              {participants.map((participant) => (
                <Typography color="gray">
                  {`${participant.name} - ${participant.email}`}
                </Typography>
              ))}
            </>
          )}
        </Box>
      </StyledBox>
      {isCancelClicked && (
        <Typography>Etes-vous sûr de votre choix ?</Typography>
      )}
      <StyledDivider light />
      <StyledCardActions>
        <Button onClick={handleClick} type="submit" size="small">
          {!isCancelClicked ? buttonTextContent : "Confirmer"}
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
  isOwner: PropTypes.bool.isRequired,
};

export default EventDetails;
