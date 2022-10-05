
import axios from "axios";

const data = (store) => (next) => (action) => {


    if (action.type === 'FETCH_DATA') {
      
      console.log('je passe par le middleware');

       axios.get('http://unknown8.fr:4000/brewery')
       .then((response) => {
            console.log(response.data.data)
            store.dispatch({
                type: 'SAVE_DATA',
                breweries: response.data.data,
                loading: false,
            });
       })
       .catch((error) => {
        console.log(error);
        });
      }
   
    next(action);
};


export default data;