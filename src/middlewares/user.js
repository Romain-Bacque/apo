import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:4000'
});

const user = (store) => (next) => (action) => {
    const state = store.getState();

    if (action.type === 'LOGIN') {
        store.dispatch({
          type: 'PENDING',
          message: null
        });
        instance.post('/user/login', {
          email: state.user.email,
          password: state.user.password,
        })
          .then((response) => {
            console.log(`réponse back ${response.data}`)

            if(response.status === 200) {
              store.dispatch({
                type: 'SUCCESS',
                message: null
              });
            } else if(response.status === 400) {
              store.dispatch({
                type: 'ERROR',
                message: "utilisateur/mot de passe incorrect(s)"
              });
            } else {
              store.dispatch({
                type: 'ERROR',
                message: 'Erreur, connexion impossible.'
              });
            }
            const user = response.data.data;

            store.dispatch({
              type: 'SAVE_USER',
              email: user.email,
              password: user.password, 
              role: user.role,
              logged: user.data
            });
          })
          .catch((error) => {
            console.log(error);
            store.dispatch({
              type: 'ERROR',
              message: 'Erreur, connexion impossible.'
            });
          });
      }
    else if (action.type === 'LOGOUT') {
      axios.post('/user/logout')
          .then((response) => {
            console.log(`réponse back ${response.data}`)

            store.dispatch({
              type: 'RESET'
            });
          })
          .catch((error) => {
            console.log(error);
            console.log('Impossible de se deconnecter');
          }); 
        }
    else if (action.type === 'REGISTER'){
      store.dispatch({
        type: 'PENDING',
        message: null
      });
      instance.post('/user/register',{
        email: state.email,
        password: state.password,
        name: state.name,
        role: state.role,
      })
      .then((response) => {
        console.log(`réponse back ${response.data}`)

        if(response.status === 200) {
          store.dispatch({
            type: 'SUCCESS',
            message: null
          });
        } else if(response.status === 403) {
          store.dispatch({
            type: 'ERROR',
            message: "utilisateur déjà inscrit"
          });
        } else {
          store.dispatch({
            type: 'ERROR',
            message: 'Erreur, enregistrement impossible.'
          });
        }
      })
      .catch((error) => {
        console.log(error);
        store.dispatch({
          type: 'ERROR',
          message: 'Erreur, enregistrement impossible.',
          statut: 'error'
        });
      });
    }
    else if (action.type === 'DELETE_USER'){
      instance.delete('/user/delete', {
        email: state.user.email,
        password: state.user.password,
        name: state.user.name,
      })
      .then((response) => {
        console.log(`réponse back ${response.data}`)

        const user = response.data.data;

        store.dispatch({
          type: 'DELETE_USER'
        });
      })
      .catch((error) => {
        console.log(error);
        console.log('Erreur impossible de supprimer le user');
      });
    }
    // else if (action.type === 'UPDATE_USER'){
      // instance.put('/user',{
      //   email: state.user.email,
      //   password: state.user.password,
      //   name: state.user.name,
      // })
      // .then((response) => {
      //   console.log(`réponse back ${response.data}`)
      //   store.dispatch({
      //     type: 'DELETE_USER',
      //   });
      // })
      // .catch((error) => {
      //   console.log(error);
      //   console.log('Erreur impossible de supprimer le user');
      // });
    // }

    next(action);
};

export default user;

