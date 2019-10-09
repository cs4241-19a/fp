//import "../css/styles.css";
import io from "socket.io-client";

import "@babel/polyfill"

const socket = io();

document.body.onload = () => {
	document.querySelector("#deleteButton").onclick = () => socket.emit("superSecretDelete");
};
