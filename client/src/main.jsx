import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
