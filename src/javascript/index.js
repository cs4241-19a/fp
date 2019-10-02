import "../css/styles.css";
import io from "socket.io-client";
import "./data_collection"

const socket = io();

socket.emit('getUserCount');

socket.on('sendUserCount', (count) => document.querySelector("#counter").innerHTML = count);
