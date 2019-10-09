//The easy-peasy state store for all app components
import { action, thunk } from "easy-peasy";

export default {
    vis: {

        //state variables
        song: {title: "title", artist: "artist", song_id: 0},
        songFile: {song_id: 0, song_bytes: "9208374059827345"},
        user: {username: "uname", name: "Bob"},
        options: {height: 0, length: 0},
        
        //actions
        setSong: action((state, payload) => {
            state.song = payload;
        }),
        setSongFile: thunk(async (state, payload) => {
            const data = await fetch('/song_data?id=' + payload)
            .then(response => {
                console.log(response)
                return response
            })
            state.songFile = data;
        }),
        setUser: action((state, payload) => {
            state.user = payload;
        }),
        setOptions: action((state, payload) => {
            state.options = payload;
        })
        
    }
}