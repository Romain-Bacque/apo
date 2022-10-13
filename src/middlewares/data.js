
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://unknown8.fr:4000',
  credential: true
});

const data = (store) => (next) => (action) => {


    if (action.type === 'FETCH_DATA') {

      instance.get('/brewery')
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

      else if (action.type === 'ADD_BREWERY_GEOLOC'){
       Storage = {
          lat: action.lat,
          lon: action.lon,
          address: action.address
       }
       console.log(Storage)
      }
      else if(action.type === 'ADD_BREWERY'){

          instance.post('/brewery', {
            user_id: action.user_id,
            title: action.title,
            image: action.image,
            phone: action.phone,
            address: Storage.address,
            description: action.description,
            lat: Storage.lat,
            lon: Storage.lon,
            tag: []
          })
          .then((response) => {
            console.log(response.status)
          })
          .catch((error) => {
            console.log(error)
          })
      }
   
    next(action);
};


export default data;