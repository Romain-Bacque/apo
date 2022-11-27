// other import
import axios from "axios";
// config file import
import { apiConfig } from "../config/config";

const instance = axios.create({
  baseURL: `http://${apiConfig.host}:${apiConfig.port}/event`,
  withCredentials: true, // authorize cookie sending to server
});

const category = (store) => (next) => (action) => {
  if (action.type === "FETCH_OWNER_EVENTS") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .get("/owner")
      .then((response) => {
        if (response.status === 200) {
          const { data: events } = response.data;

          store.dispatch({
            type: "SAVE_OWNER_EVENTS",
            events,
          });
          store.dispatch({
            type: "SUCCESS",
            message: null,
          });
        }
      })
      .catch((error) => {
        const { status } = error.response;

        store.dispatch({
          type: "ERROR",
          message: status !== 404 ? "Une erreur est survenue." : null,
        });
      });
  } else if (action.type === "FETCH_PARTICIPANT_EVENTS") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .get("/participant")
      .then((response) => {
        if (response.status === 200) {
          const { data: events } = response.data;

          store.dispatch({
            type: "SAVE_PARTICIPANT_EVENTS",
            events,
          });
          store.dispatch({
            type: "SUCCESS",
            message: null,
          });
        }
      })
      .catch((error) => {
        const { status } = error.response;

        store.dispatch({
          type: "ERROR",
          message: status !== 404 ? "Une erreur est survenue." : null,
        });
      });
  } else if (action.type === "POST_EVENT") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .post(`/${action.breweryId}`, {
        title: action.title,
        description: action.description,
        eventStart: action.eventStart,
      })
      .then((response) => {
        if (response.status === 200) {
          const { data: events } = response.data;

          store.dispatch({
            type: "SAVE_OWNER_EVENTS",
            events,
          });
          store.dispatch({
            type: "SUCCESS",
            message: "Evénement ajouté avec succès.",
          });
        }
      })
      .catch(() => {
        store.dispatch({
          type: "ERROR",
          message: "Une erreur est survenue pendant l'inscription.",
        });
      });
  } else if (action.type === "DELETE_EVENT") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .delete(`/${action.eventId}`, {})
      .then((response) => {
        if (response.status === 200) {
          store.dispatch({
            type: "REMOVE_OWNER_EVENT",
            eventId: action.eventId,
          });
          store.dispatch({
            type: "SUCCESS",
            message: "Evénement supprimé avec succès.",
          });
        }
      })
      .catch(() => {
        store.dispatch({
          type: "ERROR",
          message: "Erreur, suppression impossible.",
        });
      });
  } else if (action.type === "ADD_PARTICIPANT") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .post(`/participant/${action.eventId}`, {})
      .then((response) => {
        if (response.status === 200) {
          const RegistrationMessage = response.data.data;

          store.dispatch({
            type: "SUCCESS",
            message: RegistrationMessage,
          });
        }
      })
      .catch((error) => {
        const { status } = error.response;

        if (status === 409) {
          store.dispatch({
            type: "ERROR",
            message:
              "Vous ne pouvez pas vous inscrire à un événement dont vous êtes le propriétaire.",
          });
        } else {
          store.dispatch({
            type: "ERROR",
            message: "Une erreur est survenue pendant l'inscription.",
          });
        }
      });
  } else if (action.type === "DELETE_PARTICIPANT") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .delete(`/participant/${action.eventId}`)
      .then((response) => {
        if (response.status === 200) {
          store.dispatch({
            type: "REMOVE_PARTICIPANT_EVENT",
            eventId: action.eventId,
          });
          store.dispatch({
            type: "SUCCESS",
            message: "Votre participation à cet événement est annulé.",
          });
        }
      })
      .catch(() => {
        store.dispatch({
          type: "ERROR",
          message: "Une erreur est survenue.",
        });
      });
  }
  next(action);
};

export default category;
