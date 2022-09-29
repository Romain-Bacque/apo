 import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

const ajax = (store) => (next) => (action) => {
        if(action.type === 'LOGIN'){
            const state = store.getState();
            
            instance.post('/login', {
                email: state.user.email,
                password: state.user.password,
            })
            .then((response) => {
                // on altère notre config par défaut pour ajouter le token en entete
                // ainsi toutes les requetes qui partiront après le login auront cette entete ...
                instance.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
                store.dispatch({
                type: 'SAVE_USER',
                pseudo: response.data.pseudo,
                 });
            })
            .catch((error) => {
                console.log(error);
                alert('Erreur');
                // todo
                // il faudrait déclencher un state d'erreur
                // pour adapter l'ui dans les composant en cas d'erreur
                // il faudrait afficher un message d'erreur et passer loading à false
            });
        }
        else if (action.type === 'LOGOUT') {
            // j'oublie mon token au logout
            instance.defaults.headers.common.Authorization = undefined;
        }
    next(action);
};


export default ajax;