import { loginSuccess, loginError } from '../actions/session';
import { parseJSON } from "./utils";

export function login(userData, cb) {
    console.log("login");
    console.log(userData);
    return dispatch =>
        fetch('/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userData.username,
                password: userData.password,
            }),
        }).then(response => {
            if (response.ok) {
                console.log(parseJSON(response));
                const object = Object.assign(userData, { isLoggedIn: parseJSON(response) });
                dispatch(loginSuccess(object));
                cb(object);
            } else {
                alert("Invalid username or password!");
            }
        })
            .catch(error => {
                console.log('request failed', error);
                dispatch(loginError(error));
            })
        ;
}