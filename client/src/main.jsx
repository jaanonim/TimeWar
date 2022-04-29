import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContextProvider } from "./components/ToastContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ToastContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
