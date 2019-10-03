import "../css/styles.css";
import io from "socket.io-client";
import "./data_collection"

import "@babel/polyfill"

const socket = io();

socket.emit('getUserCount');

socket.on('sendUserCount', (count) => document.querySelector("#counter").innerHTML = count);

socket.on('sendConnectionInfo', console.log);

socket.emit('getConnectionInfo');

export default socket;
