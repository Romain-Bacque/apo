const debug = (store) => (next) => (action) => {
  // console.log("store :", store.getState());
  // console.log("action :", action);
  next(action);
};

export { debug };
