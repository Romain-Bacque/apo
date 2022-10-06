
import axios from "axios";

const data = (store) => (next) => (action) => {


    if (action.type === 'FETCH_DATA') {

       axios.get('http://unknown8.fr:4000/brewery')
       .then((response) => {
            store.dispatch({
                type: 'SAVE_DATA',
                breweries: response.data.data,
                
            });
       })
       .catch((error) => {
        console.log(error);
        });
      }
   
    next(action);
};


export default data;