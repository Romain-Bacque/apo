import axios from "axios";
import { apiConfig } from "../config/config";

const instance = axios.create({
  baseURL: `http://${apiConfig.host}:${apiConfig.port}`,
  withCredentials: true, // authorize cookie sending to server
  headers: { "Content-Type": "multipart/form-data" },
});

const brewery = (store) => (next) => (action) => {
  if (action.type === "FETCH_BREWERIES") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .get("/brewery")
      .then((response) => {
        if (response.status === 200) {
          const breweries = response.data.data;

          store.dispatch({
            type: "SAVE_BREWERIES",
            breweries,
          });
          store.dispatch({
            type: "SUCCESS",
            message: null,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        store.dispatch({
          type: "ERROR",
          message: "Une erreur est survenue.",
        });
      });
  } else if (action.type === "ADD_BREWERY") {
    const formData = new FormData();

    formData.append("title", action.title);
    formData.append("image", action.image);
    formData.append("phone", action.phone);
    formData.append("address", action.address);
    formData.append("lat", action.lat);
    formData.append("lon", action.lon);
    for (let category of action.categories) {
      formData.append("categories[]", category.id);
    }
    formData.append("description", action.description);
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .post("/brewery", formData)
      .then((response) => {
        if (response.status === 200) {
          const breweries = response.data.data;

          store.dispatch({
            type: "SAVE_BREWERIES",
            breweries,
          });
          store.dispatch({
            type: "SUCCESS",
            message: "Brasserie ajoutée",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        const { status } = error.response;

        if (status === 400) {
          store.dispatch({
            type: "ERROR",
            message: "Erreur dans un/plusieurs champs",
          });
        } else if (status === 401) {
          store.dispatch({
            type: "ERROR",
            message: "Action non autorisée",
          });
        } else if (status === 404) {
          store.dispatch({
            type: "ERROR",
            message: "La brasserie n'a pas été trouvée",
          });
        } else {
          store.dispatch({
            type: "ERROR",
            message: "Une erreur est survenue",
          });
        }
      });
  } else if (action.type === "UPDATE_BREWERY") {
    const formData = new FormData();

    formData.append("title", action.title);
    formData.append("image", action.image);
    formData.append("phone", action.phone);
    formData.append("address", action.address);
    formData.append("lat", action.lat);
    formData.append("lon", action.lon);
    for (let category of action.categories) {
      formData.append("categories[]", category.id);
    }
    formData.append("description", action.description);
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .put(`/brewery/${action.id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          const breweries = response.data.data;

          store.dispatch({
            type: "SAVE_BREWERIES",
            breweries,
          });
          store.dispatch({
            type: "SUCCESS",
            message: "Brasserie modifiée",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        const { status } = error.response;

        if (status === 401) {
          store.dispatch({
            type: "ERROR",
            message: "Action non autorisée",
          });
        } else if (status === 400) {
          store.dispatch({
            type: "ERROR",
            message: "Erreur dans un/plusieurs champs",
          });
        } else {
          store.dispatch({
            type: "ERROR",
            message: "Une erreur est survenue",
          });
        }
      });
  } else if (action.type === "DELETE_BREWERY") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });

    instance
      .delete(`/brewery/${action.breweryId}`)
      .then((response) => {
        if (response.status === 200) {
          const breweries = response.data.data;

          store.dispatch({
            type: "SAVE_BREWERIES",
            breweries,
          });
          store.dispatch({
            type: "SUCCESS",
            message: "Brasserie supprimée",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        const { status } = error.response;

        if (status === 401) {
          store.dispatch({
            type: "ERROR",
            message: "Action non autorisée",
          });
        } else if (status === 404) {
          store.dispatch({
            type: "ERROR",
            message: "La brasserie n'a pas été trouvée",
          });
        } else {
          store.dispatch({
            type: "ERROR",
            message: "Une erreur est survenue",
          });
        }
      });
  }

  next(action);
};

export default brewery;
