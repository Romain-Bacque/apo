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
  const [eventStartValue, setEventStartValue] = useState(new Date());
  const [hasEventStartAnError, setHasEventStartAnError] = useState(false);
  const userId = useSelector((state) => state.user.id);
  const breweries = useSelector((state) => state.brewery.breweries);
  const dispatch = useDispatch();
  const {
    value: breweryIdValue,
    isValid: isBreweryIdValid,
    isInput: isBreweryIdInputTouched,
    changeHandler: breweryIdChangeHandler,
    blurHandler: breweryIdBlurHandler,
  } = useInput();
  const {
    value: eventTitleValue,
    isValid: isEventTitleValid,
    isInput: isEventTitleInputTouched,
    changeHandler: eventTitleChangeHandler,
    blurHandler: eventTitleBlurHandler,
  } = useInput();
  const {
    value: descriptionValue,
    isValid: isDescriptionValid,
    isInput: isDescriptionInputTouched,
    changeHandler: descriptionChangeHandler,
    blurHandler: descriptionBlurHandler,
  } = useInput();

  ownerBreweries = breweries?.filter((brewery) => brewery.user_id === userId);

  const hasBreweryIdAnError = isBreweryIdInputTouched && !isBreweryIdValid;
  const hasEventTitleAnError = isEventTitleInputTouched && !isEventTitleValid;
  const hasDescriptionAnError =
    isDescriptionInputTouched && !isDescriptionValid;

  const breweryIdHelperTextContent =
    isBreweryIdInputTouched && !isBreweryIdValid ? "Entrée incorrecte." : "";
  const eventTitleHelperTextContent =
    isEventTitleInputTouched && !isEventTitleValid ? "Entrée incorrecte." : "";
  const descriptionHelperTextContent =
    isDescriptionInputTouched && !isDescriptionValid
      ? "Entrée incorrecte."
      : "";
  const eventStartHelperTextContent = hasEventStartAnError
    ? "Entrée incorrecte."
    : "";

  const isFormValid =
    isBreweryIdValid &&
    isEventTitleValid &&
    isDescriptionValid &&
    !hasEventStartAnError;

  const handleEventSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    dispatch({
      type: "POST_EVENT",
      breweryId: breweryIdValue,
      title: eventTitleValue,
      description: descriptionValue,
      eventStart: eventStartValue,
    });
    onCancel();
  };

  const handleDateChange = (value) => {
    const formatedDate = dayjs(value).format("DD/MM/YYYY HH:mm:ss");

    if (formatedDate === "Invalid Date") {
      setHasEventStartAnError(true);
      setEventStartValue("");
    } else {
      setHasEventStartAnError(false);
      setEventStartValue(value);
    }
  };

  return (
    <CardContent>
      <Box sx={{ m: "1rem" }} component="form" onSubmit={handleEventSubmit}>
        <StyledTypography variant="h5" component="h2">
          Créer un évènement
        </StyledTypography>
        <FormControl error={hasBreweryIdAnError} fullWidth>
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
            onBlur={breweryIdBlurHandler}
            onClick={breweryIdChangeHandler}
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
          <FormHelperText>{breweryIdHelperTextContent}</FormHelperText>
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
            label="Début de l'évènement :"
            inputFormat="DD/MM/YYYY HH:mm:ss"
            value={eventStartValue}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
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
