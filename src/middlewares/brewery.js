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

const instance = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/brewery`,
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
  } else if (action.type === "FETCH_USER_FAVORITES") {
    store.dispatch(pending());
    instance
      .get(`/favorites`)
      .then((response) => {
        if (response.status === 200) {
          const breweries = response.data.data;

          store.dispatch(saveFavorites(breweries));
          store.dispatch(success(null));
        }
      })
      .catch(() => {
        store.dispatch(error("Une erreur est survenue."));
      });
  } else if (action.type === "FETCH_USER_FAVORITE_IDS") {
    store.dispatch(pending());
    instance
      .get(`/favorites`)
      .then((response) => {
        if (response.status === 200) {
          const favorites = response.data.data;

          store.dispatch(saveFavoriteIds(favorites));
          store.dispatch(success(null));
        }
      })
      .catch(() => {
        store.dispatch(error("Une erreur est survenue."));
      });
  } else if (action.type === "ADD_USER_FAVORITE") {
    store.dispatch(pending());

    const { favorites: prevFavorites } = store.favorite;

    store.dispatch(saveFavorites([...prevFavorites, action.breweryId]));
    instance
      .post(`/favorites/${action.breweryId}`)
      .then((response) => {
        if (response.status === 200) {
          store.dispatch(success(null));
        }
      })
      .catch(() => {
        store.dispatch(saveFavorites(prevFavorites));
        store.dispatch(error("Une erreur est survenue."));
      });
  } else if (action.type === "DELETE_USER_FAVORITE") {
    store.dispatch(pending());

    const { favorites: prevFavorites } = store.favorite;
    const filteredFavorites = prevFavorites.map(
      (prevFavorite) => prevFavorite.id !== action.breweryId
    );

    store.dispatch(saveFavorites(filteredFavorites));
    instance
      .delete(`/favorites/${action.breweryId}`)
      .then((response) => {
        if (response.status === 200) {
          const breweries = response.data.data;

          store.dispatch(saveFavorites(breweries));
          store.dispatch(success(null));
        }
      })
      .catch(() => {
        store.dispatch(saveFavorites(prevFavorites));
        store.dispatch(error("Une erreur est survenue."));
      });
  } else if (action.type === "FETCH_BREWERY_DETAILS") {
    store.dispatch(pending());
    instance
      .get(`/${action.breweryId}`)
      .then((response) => {
        if (response.status === 200) {
          const breweryDetails = response.data.data;

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
