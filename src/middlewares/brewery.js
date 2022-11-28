// other import
import axios from "axios";
// action creator import
import {
  pending,
  success,
  error,
  saveBreweries,
  saveBreweryDetails,
} from "../actions";
// config file import
import { apiConfig } from "../config/config";

const instance = axios.create({
  baseURL: `http://${apiConfig.host}:${apiConfig.port}/brewery`,
  withCredentials: true, // authorize cookie sending to server
  headers: { "Content-Type": "multipart/form-data" },
});

const brewery = (store) => (next) => (action) => {
  if (action.type === "FETCH_BREWERIES") {
    store.dispatch(pending());
    instance
      .get("/")
      .then((response) => {
        if (response.status === 200) {
          const breweries = response.data.data;

          store.dispatch(saveBreweries(breweries));
          store.dispatch(success(null));
        }
      })
      .catch(() => {
        store.dispatch(error("Une erreur est survenue."));
      });
  } else if (action.type === "FETCH_BREWERY_DETAILS") {
    store.dispatch(pending());
    instance
      .get(`/${action.breweryId}`)
      .then((response) => {
        if (response.status === 200) {
          const breweryDetails = response.data.data[0];

          store.dispatch(success(null));
          store.dispatch(saveBreweryDetails(breweryDetails));
        }
      })
      .catch(() => {
        store.dispatch(error("Une erreur est survenue."));
      });
  } else if (action.type === "ADD_BREWERY") {
    const formData = new FormData();

    formData.append("title", action.title);
    formData.append("image", action.image);
    formData.append("phone", action.phone);
    formData.append("address", action.address);
    formData.append("lat", action.lat);
    formData.append("lon", action.lon);
    for (const category of action.categories) {
      formData.append("categories[]", category.id);
    }
    formData.append("description", action.description);
    store.dispatch(pending());
    instance
      .post("/", formData)
      .then((response) => {
        if (response.status === 200) {
          const breweries = response.data.data;

          store.dispatch(saveBreweries(breweries));
          store.dispatch(success("Brasserie ajoutée."));
        }
      })
      .catch((err) => {
        const { status } = err.response;

        if (status === 400) {
          store.dispatch(error("Erreur dans un/plusieurs champs."));
        } else if (status === 401) {
          store.dispatch(error("Action non autorisée."));
        } else if (status === 404) {
          store.dispatch(error("La brasserie n'a pas été trouvée."));
        } else {
          store.dispatch(error("Une erreur est survenue."));
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
    for (const category of action.categories) {
      formData.append("categories[]", category.id);
    }
    formData.append("description", action.description);
    store.dispatch(pending());
    instance
      .put(`/${action.id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          const breweries = response.data.data;

          store.dispatch(saveBreweries(breweries));
          store.dispatch(success("Brasserie modifiée."));
        }
      })
      .catch((err) => {
        const { status } = err.response;

        if (status === 401) {
          store.dispatch(error("Action non autorisée."));
        } else if (status === 400) {
          store.dispatch(error("Erreur dans un/plusieurs champs."));
        } else {
          store.dispatch(error("Une erreur est survenue."));
        }
      });
  } else if (action.type === "DELETE_BREWERY") {
    store.dispatch(pending());

    instance
      .delete(`/${action.breweryId}`)
      .then((response) => {
        if (response.status === 200) {
          const breweries = response.data.data;

          store.dispatch(saveBreweries(breweries));
          store.dispatch(success("Brasserie supprimée."));
        }
      })
      .catch((err) => {
        const { status } = err.response;

        if (status === 401) {
          store.dispatch(error("Action non autorisée."));
        } else if (status === 404) {
          store.dispatch(error("La brasserie n'a pas été trouvée."));
        } else {
          store.dispatch(error("Une erreur est survenue."));
        }
      });
  }

  next(action);
};

export default brewery;
