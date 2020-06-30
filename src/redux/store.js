import { compose, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import root from "./saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware),
    // https://stackoverflow.com/a/55881955 to make this work with Cypress
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

sagaMiddleware.run(root);

export default store;
