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
    next(action);
};


export default user;