import "./styles.css";
import io from "socket.io-client";

const socket = io();

socket.emit('getUserCount');

socket.on('sendUserCount', (count) => document.querySelector("#counter").innerHTML = count);
