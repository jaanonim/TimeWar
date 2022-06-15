import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContextProvider } from "./components/ToastContext";
import "./index.css";
import { fetchToServer } from "./scripts/utilities/fetchToServer";

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

//! This is used to force heroku not to shutdown server because of inactivity.
const PING_TIME = 60; //in seconds
setInterval(() => {
    fetchToServer("/ping", { method: "GET" });
}, PING_TIME * 1000);
