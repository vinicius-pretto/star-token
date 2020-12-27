import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "figma-plugin-ds/dist/figma-plugin-ds.css";
import "./styles/main.css";
import App from "./components/App";
import configureStore from "./redux/store";

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("app")
);
