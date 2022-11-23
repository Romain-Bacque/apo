// other import
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import dayjs from "dayjs";
// component import
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// hook import
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useInput from "../../hooks/use-input";

let ownerBreweries = [];

// Style
const StyledTypography = styled(Typography)({
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

// Component
function EventForm({ onCancel }) {
  const [hasEventStartAnError, setHasEventStartAnError] = useState();
  const [eventStartValue, setEventStartValue] = useState(new Date());
  const userId = useSelector((state) => state.user.id);
  const breweries = useSelector((state) => state.brewery.breweries);
  const dispatch = useDispatch();
  const {
    value: breweryTitleValue,
    isValid: isBreweryTitleValid,
    isTouched: isBreweryTitleTouched,
    changeHandler: breweryTitleChangeHandler,
    blurHandler: breweryTitleBlurHandler,
  } = useInput();
  const {
    value: eventTitleValue,
    isValid: isEventTitleValid,
    isTouched: isEventTitleTouched,
    changeHandler: eventTitleChangeHandler,
    blurHandler: eventTitleBlurHandler,
  } = useInput();
  const {
    value: descriptionValue,
    isValid: isDescriptionValid,
    isTouched: isDescriptionTouched,
    changeHandler: descriptionChangeHandler,
    blurHandler: descriptionBlurHandler,
  } = useInput();
  ownerBreweries = breweries?.filter((brewery) => brewery.user_id === userId);

  const hasBreweryTitleAnError = isBreweryTitleTouched && !isBreweryTitleValid;
  const hasEventTitleAnError = isEventTitleTouched && !isEventTitleValid;
  const hasDescriptionAnError = isDescriptionTouched && !isDescriptionValid;

  const breweryTitleHelperTextContent =
    isBreweryTitleTouched && !isBreweryTitleValid ? "Entrée incorrecte." : "";
  const eventTitleHelperTextContent =
    isEventTitleTouched && !isEventTitleValid ? "Entrée incorrecte." : "";
  const descriptionHelperTextContent =
    isDescriptionTouched && !isDescriptionValid ? "Entrée incorrecte." : "";
  const eventStartHelperTextContent = !hasEventStartAnError
    ? "Entrée incorrecte."
    : "";

  const isFormValid =
    isBreweryTitleValid &&
    isEventTitleValid &&
    isDescriptionValid &&
    hasEventStartAnError;

  const handleEventSubmit = (event) => {
    event.preventDefault();
    console.log(
      isBreweryTitleValid,
      isEventTitleValid,
      isDescriptionValid,
      hasEventStartAnError
    );
    if (!isFormValid) return;
    dispatch({
      type: "ADD_EVENT",
      brewery: breweryTitleValue,
      event: eventTitleValue,
      description: descriptionValue,
      eventStart: dayjs(eventStartValue).format("DD/MM/YYYY hh:mm:ss"),
    });
    onCancel();
  };

  const handleDateTimePickerError = (value) => {
    console.log(value);
    if (value === "invalidDate") {
      setHasEventStartAnError(true);
    } else setHasEventStartAnError(false);
  };

  return (
    <CardContent>
      <Box sx={{ m: "1rem" }} component="form" onSubmit={handleEventSubmit}>
        <StyledTypography variant="h5" component="h2">
          Créer un évènement
        </StyledTypography>
        <FormControl error={hasBreweryTitleAnError} fullWidth>
          <InputLabel
            variant="standard"
            htmlFor="brewery"
            sx={{ fontSize: "1.5rem" }}
          >
            Pour quelle brasserie ?
          </InputLabel>
          <NativeSelect
            required
            defaultValue="Choisir une brasserie"
            id="brewery"
            onBlur={breweryTitleBlurHandler}
            onClick={breweryTitleChangeHandler}
          >
            <option key={null} id={null} disabled>
              Choisir une brasserie
            </option>
            {ownerBreweries.map((ownerBrewery) => (
              <option
                key={ownerBrewery.id}
                id={ownerBrewery.id}
                value={ownerBrewery.title}
              >
                {ownerBrewery.title}
              </option>
            ))}
          </NativeSelect>
          <FormHelperText>{breweryTitleHelperTextContent}</FormHelperText>
        </FormControl>
        <TextField
          error={hasEventTitleAnError}
          helperText={eventTitleHelperTextContent}
          required
          type="text"
          label="Titre de l'évènement :"
          value={eventTitleValue}
          onBlur={eventTitleBlurHandler}
          onChange={eventTitleChangeHandler}
        />
        <TextField
          error={hasDescriptionAnError}
          helperText={descriptionHelperTextContent}
          required
          multiline
          maxRows={4}
          label="Description de l'évènement :"
          value={descriptionValue}
          onBlur={descriptionBlurHandler}
          onChange={descriptionChangeHandler}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <DateTimePicker
            onError={handleDateTimePickerError}
            label="Début de l'évènement :"
            inputFormat="DD/MM/YYYY HH:mm:ss"
            value={eventStartValue}
            onChange={(value) => setEventStartValue(value)}
            renderInput={(params) => (
              <TextField
                error={hasEventStartAnError}
                helperText={eventStartHelperTextContent}
                required
                {...params}
              />
            )}
            minDate={new Date()}
          />
        </LocalizationProvider>
        <StyledDivider light />
        <StyledCardActions>
          <Button type="submit" size="small">
            Ajouter
          </Button>
          <CancelButton variant="outlined" onClick={onCancel} size="small">
            Annuler
          </CancelButton>
        </StyledCardActions>
      </Box>
    </CardContent>
  );
}

EventForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default EventForm;
