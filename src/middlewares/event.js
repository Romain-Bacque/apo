// other import
import axios from "axios";
// action creator import
import { pending, success, error, saveEvents, removeEvent } from "../actions";

const instance = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/event`,
  withCredentials: true, // authorize cookie sending to server,
});

const event = (store) => (next) => (action) => {
  if (action.type === "FETCH_OWNER_EVENTS") {
    store.dispatch(pending());
    instance
      .get("/owner")
      .then((response) => {
        if (response.status === 200) {
          const { data: events } = response.data;

          store.dispatch(saveEvents("ownerEvents", events));
          store.dispatch(success(null));
        }
      })
      .catch((err) => {
        const { status } = err.response;
        const errorMessage = status !== 404 ? "Une erreur est survenue." : null;

        store.dispatch(error(errorMessage));
      });
  } else if (action.type === "FETCH_PARTICIPANT_EVENTS") {
    store.dispatch(pending());
    instance
      .get("/participant")
      .then((response) => {
        if (response.status === 200) {
          const { data: events } = response.data;

          store.dispatch(saveEvents("participantEvents", events));
          store.dispatch(success(null));
        }
      })
      .catch((err) => {
        const { status } = err.response;
        const errorMessage = status !== 404 ? "Une erreur est survenue." : null;

        store.dispatch(error(errorMessage));
      });
  } else if (action.type === "POST_EVENT") {
    store.dispatch(pending());
    instance
      .post(`/${action.breweryId}`, {
        title: action.title,
        description: action.description,
        event_start: action.event_start,
      })
      .then((response) => {
        if (response.status === 200) {
          const { data: events } = response.data;

          store.dispatch(saveEvents("ownerEvents", events));
          store.dispatch(success("Evénement ajouté avec succès."));
        }
      })
      .catch(() => {
        store.dispatch(error("Une erreur est survenue pendant l'inscription."));
      });
  } else if (action.type === "DELETE_EVENT") {
    store.dispatch(pending());
    instance
      .delete(`/${action.eventId}`, {})
      .then((response) => {
        if (response.status === 200) {
          store.dispatch(removeEvent("ownerEvents", action.eventId));
          store.dispatch(success("Evénement supprimé avec succès."));
        }
      })
      .catch(() => {
        store.dispatch(error("Erreur, suppression impossible."));
      });
  } else if (action.type === "ADD_PARTICIPANT") {
    store.dispatch(pending());
    instance
      .post(`/participant/${action.eventId}`, {})
      .then((response) => {
        if (response.status === 200) {
          const RegistrationMessage = response.data.data;

          store.dispatch(success(RegistrationMessage));
        }
      })
      .catch((err) => {
        const { status } = err.response;

        if (status === 409) {
          store.dispatch(
            error(
              "Vous ne pouvez pas vous inscrire à un événement dont vous êtes le propriétaire."
            )
          );
        } else {
          store.dispatch(
            error("Une erreur est survenue pendant l'inscription.")
          );
        }
      });
  } else if (action.type === "DELETE_PARTICIPANT") {
    store.dispatch(pending());
    instance
      .delete(`/participant/${action.eventId}`)
      .then((response) => {
        if (response.status === 200) {
          store.dispatch(removeEvent("participantEvents", action.eventId));
          store.dispatch(
            success("Votre participation à cet événement est annulé.")
          );
        }
      })
      .catch(() => {
        store.dispatch(error("Une erreur est survenue."));
      });
  }
  next(action);
};

export { event };
