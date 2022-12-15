import configureStore from "redux-mock-store";
import user from "../src/middlewares/user";
import brewery from "../src/middlewares/brewery";
import category from "../src/middlewares/category";
import event from "../src/middlewares/event";

const middlewares = [user, brewery, category, event];
const mockStore = configureStore(middlewares);

export default mockStore;
