//renders the components for the main page including feed and vis

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store"
import { StoreProvider } from "easy-peasy";

ReactDOM.render(<App />, document.getElementById("root"));

window.onload = function () {
    document.getElementById("homeDiv").onclick = home
    document.getElementById("logoutBtn").onclick = logout
}

function home(e) {
    e.preventDefault();
    window.location = "/main.html"
}

function logout(e) {
    e.preventDefault();
    window.location = "/login.html"
}