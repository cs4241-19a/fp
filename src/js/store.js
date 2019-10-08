//The easy-peasy state store for all app components
import { action } from "easy-peasy";

export default {
    vis: {
        song: {title: "title", artist: "artist", file: 0},
        user: {username: "uname", name: "Bob"},
        options: {height: 0, length: 0},
        setSong: action((state, payload) => {
            console.log('@store: ', state, payload)
            state.song = payload;
            // state.user = payload.user;
            // state.options = payload.options;
        })
    }
}