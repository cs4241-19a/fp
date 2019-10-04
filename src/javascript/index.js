//import "../css/styles.css";
import io from "socket.io-client";
import "./data_collection"

import "@babel/polyfill"

const socket = io();

socket.emit('getUserCount');

socket.on('sendUserCount', (count) => document.querySelector("#counter").innerText = count);

socket.on('sendConnectionInfo', (ip) => document.querySelector("#ip_address").innerText = ip);

socket.emit('getConnectionInfo');

export default socket;
