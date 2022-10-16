import axios from "axios";
import { apiConfig } from "../config/config";

const instance = axios.create({
  baseURL: `http://${apiConfig.host}:${apiConfig.port}`,
  withCredentials: true,
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
            type: "SUCCESS",
            message: null,
          });
          store.dispatch({
            type: "SAVE_BREWERIES",
            breweries,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        const { status } = error;

        if (status === 404) {
          store.dispatch({
            type: "ERROR",
            message: "Il n'y a aucune brasserie d'enregistrée.",
          });
        } else {
          store.dispatch({
            type: "ERROR",
            message: "Une erreur est survenue.",
          });
        }
      });
  } else if (action.type === "ADD_BREWERY") {
    const formData = new FormData();

    formData
      .append("title", action.title)
      .append("image", action.image)
      .append("phone", action.phone)
      .append("address", action.address)
      .append("description", action.description)
      .append("lat", action.lat)
      .append("lon", action.lon)
      .append("categories", action.categories);

    instance
      .post("/brewery", formData)
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  next(action);
};

export default brewery;
