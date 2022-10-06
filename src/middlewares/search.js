

// import axios from "axios";

const search = (store) => (next) => (action) => {

    if (action.key === 'search'){

        store.dispatch({
          type: 'SEARCH_VALUE',
          searchValue: action.value,
      });

    };
    next(action);

}

export default search;