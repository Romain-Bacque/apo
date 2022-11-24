// other import
import axios from "axios";
// config file import
import { apiConfig } from "../config/config";

const instance = axios.create({
  baseURL: `http://${apiConfig.host}:${apiConfig.port}/event`,
  withCredentials: true, // authorize cookie sending to server
});

const category = (store) => (next) => (action) => {
  if (action.type === "POST_EVENT") {
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
          const { data: event } = response.data;

          store.dispatch({
            type: "ADD_EVENT",
            event,
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
            type: "REMOVE_EVENT",
            eventId: action.eventId,
          });
          store.dispatch({
            type: "SUCCESS",
            message:
              "Evénement supprimé avec succès. Tous les participants ont été prévenus.",
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
      .post(`/${action.eventId}/user`, {})
      .then((response) => {
        if (response.status === 200) {
          const RegistrationMessage = response.data.data;

          store.dispatch({
            type: "SUCCESS",
            message: RegistrationMessage,
          });
        }
      })
      .catch(() => {
        store.dispatch({
          type: "ERROR",
          message: "Une erreur est survenue pendant l'inscription.",
        });
      });
  }

  next(action);
};

export default category;
