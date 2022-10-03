 import axios from "axios";

const user = (store) => (next) => (action) => {

    if (action.type === 'LOGIN') {
        console.log('je passe dans le middleware user');

        const state = store.getState();
        axios.post('http://unknown8.fr:3000/user/login', {
          email: state.user.email,
          password: state.user.password,
        })
          .then((response) => {
            console.log(`réponse back ${response.data}`)
            store.dispatch({
              type: 'SAVE_USER',
              // logged: response.data,
            });
          })
          .catch((error) => {
            console.log(error);
            alert('Erreur de chargement, veuillez réessayer');
          });
      }
    else if (action.type === 'REGISTER'){
      const state = store.getState();
      axios.post('http://unknown8.fr:3000/user/register',{
        email: state.user.email,
        password: state.user.password,
        name: state.user.name,
      })
      .then((response) => {
        console.log(`réponse back ${response.data}`)
        store.dispatch({
          type: 'REGISTER_SUCCCESS',
        });
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur impossible de ce connecter');
      });
    }
    else if (action.type === 'DELETE_USER'){
      const state = store.getState();
      axios.delete('http://unknown8.fr:3000/user/delete',{
        email: state.user.email,
        password: state.user.password,
        name: state.user.name,
      })
      .then((response) => {
        console.log(`réponse back ${response.data}`)
        store.dispatch({
          type: 'DELETE_USER',
        });
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur impossible de supprimer le user');
      });
    }
    else if (action.type === 'UPDATE_USER'){
      const state = store.getState();
      axios.put('http://unknown8.fr:3000/user',{
        email: state.user.email,
        password: state.user.password,
        name: state.user.name,
      })
      .then((response) => {
        console.log(`réponse back ${response.data}`)
        store.dispatch({
          type: 'DELETE_USER',
        });
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur impossible de supprimer le user');
      });
    }
    next(action);
};


export default user;