import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:4000'
});

const user = (store) => (next) => (action) => {
    const state = store.getState();

    if (action.type === 'LOGIN') {
        instance.post('/user/login', {
          email: state.user.email,
          password: state.user.password,
        })
          .then((response) => {
            console.log(`réponse back ${response.data}`)

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
            alert('Erreur de chargement, veuillez réessayer');
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
            alert('Impossible de se deconnecter');
          }); 
        }
    else if (action.type === 'REGISTER'){
      instance.post('/user/register',{
        email: state.user.email,
        password: state.user.password,
        name: state.user.name,
        role: state.user.role,
      })
      .then((response) => {
        console.log(`réponse back ${response.data}`)

        const user = response.data.data;

        store.dispatch({
          type: 'REGISTER_SUCCESS'
        });
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur impossible de ce connecter');
      });
    }
    else if (action.type === 'DELETE_USER'){
      instance.delete('/user/delete',{
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
        alert('Erreur impossible de supprimer le user');
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
      //   alert('Erreur impossible de supprimer le user');
      // });
    // }

    next(action);
};

export default user;

