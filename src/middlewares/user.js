// other import
import axios from "axios";
// action creator import
import { pending, success, error, resetUser, saveUser } from "../actions";

const instance = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/user`,
  withCredentials: true, // authorize cookie sending to server
});

const user = (store) => (next) => (action) => {
  const setUserStore = (userData) => {
    store.dispatch(
      saveUser(
        userData.id,
        userData.name,
        userData.email,
        userData.password,
        userData.role
      )
    );
  };

  if (action.type === "USER_VERIFICATION") {
    instance
      .get("/")
      .then((response) => {
        if (response.status === 200) {
          const { data } = response.data;

          setUserStore(data);
        }
      })
      .catch(() => {});
  } else if (action.type === "LOGIN") {
    store.dispatch(pending());
    instance
      .post("/login", {
        email: action.email,
        password: action.password,
      })
      .then((response) => {
        if (response.status === 200) {
          const { data } = response.data;

          store.dispatch(success(`Bienvenue ${data.name} !`));
          setUserStore(data);
        }
      })
      .catch((err) => {
        const { status } = err.response;

        if (status === 400) {
          store.dispatch(error("Erreur dans un/plusieurs champs."));
        } else if (status === 401) {
          store.dispatch(error("Mot de passe/utilisateur incorrect(s)."));
        } else if (status === 409) {
          store.dispatch(error("Utilisateur déjà connecté."));
        } else {
          store.dispatch(error("Erreur, connexion impossible."));
        }
      });
  } else if (action.type === "REGISTER") {
    store.dispatch(pending());
    instance
      .post("/register", {
        name: action.name,
        email: action.email,
        password: action.password,
        role: action.role,
      })
      .then((response) => {
        if (response.status === 200) {
          store.dispatch(success("Enregistrement réussi."));
        }
      })
      .catch((err) => {
        const { status } = err.response;

        if (status === 400) {
          store.dispatch(error("Erreur dans un/plusieurs champs."));
        } else if (status === 403) {
          store.dispatch(error("Utilisateur déjà inscrit."));
        } else {
          store.dispatch(error("Erreur, enregistrement impossible."));
        }
      });
  } else if (action.type === "LOGOUT") {
    store.dispatch(pending());
    instance
      .post("/logout")
      .then((response) => {
        if (response.status === 200) {
          store.dispatch(success(null));
          store.dispatch(resetUser());
        }
      })
      .catch(() => {
        store.dispatch(error("Erreur, déconnexion impossible."));
      });
  } else if (action.type === "FORGOT_PASSWORD") {
    store.dispatch(pending());
    instance
      .post("/forgot-password", {
        email: action.email,
      })
      .then((response) => {
        if (response.status === 200) {
          store.dispatch(
            success("Un mail de réinitialisation vous a été envoyé.")
          );
        }
      })
      .catch((err) => {
        const { status } = err.response;

        if (status === 400 || status === 401) {
          store.dispatch(error("Adresse mail incorrecte."));
        } else {
          store.dispatch(error("Erreur, réinitialisation impossible."));
        }
      });
  } else if (action.type === "RESET_PASSWORD") {
    store.dispatch(pending());
    instance
      .patch(`/reset-password/${action.id}/${action.token}`, {
        password: action.password,
      })
      .then((response) => {
        if (response.status === 200) {
          store.dispatch(
            success("mot de passe réinitialisé, veuillez vous connecter.")
          );
        }
      })
      .catch((err) => {
        const { status } = err.response;

        if (status === 400 || status === 401) {
          store.dispatch(error("Mot de passe incorrect."));
        } else {
          store.dispatch(error("Erreur, réinitialisation impossible."));
        }
      });
  } else if (action.type === "UPDATE_USER") {
    store.dispatch(pending());
    instance
      .patch(`/profile`, {
        name: action.name,
        email: action.email,
        actualPassword: action.actualPassword,
        newPassword: action.newPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          const { data } = response.data;

          store.dispatch(success("Votre compte a été modifié avec succès."));
          setUserStore(data);
        }
      })
      .catch((err) => {
        const { status } = err.response;

        if (status === 400) {
          store.dispatch(error("Donnée(s) entrée(s) incorrecte(s)."));
        } else if (status === 401) {
          store.dispatch(error("Mot de passe/utilisateur incorrect(s)."));
        } else {
          store.dispatch(error("Erreur, réinitialisation impossible."));
        }
      });
  } else if (action.type === "DELETE_USER") {
    store.dispatch(pending());
    instance
      .delete(`/profile`)
      .then((response) => {
        if (response.status === 200) {
          store.dispatch(
            success("Votre compte a été supprimé définitivement.")
          );
          store.dispatch(resetUser());
        }
      })
      .catch((err) => {
        const { status } = err.response;

        if (status === 401) {
          store.dispatch(error("Action non autorisée."));
        } else {
          store.dispatch(error("Erreur, suppression du compte impossible."));
        }
      });
  }

  next(action);
};

export default user;
