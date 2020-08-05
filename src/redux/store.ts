import { combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  userReducer
});

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>;
