import React from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <Helmet />
    <App />
  </Provider>,
  document.getElementById("root")
);
