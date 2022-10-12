

import axios from "axios";

// const config = {
//   method: 'get',
//   url: 'https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=99188fa618354504b3ba9155a71fb817',
//   headers: { }
// };

const search = (store) => (next) => (action) => {

  // if (action.type === 'SEARCH_VALUE') {
  //     axios(config)
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   }

    next(action);

}

export default search;