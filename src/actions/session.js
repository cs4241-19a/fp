import { SESSION_LOGIN, SESSION_LOGOUT, SESSION_ERROR } from './index';

export function loginError(error) {
    return { error, type: SESSION_ERROR };
}

export function loginSuccess(response) {
    return dispatch => {
        dispatch({ response, type: SESSION_LOGIN});
    };
}

export function loginRequest(user, password) {
    const _user = {user: user, password: password};
    return { _user, type: "LOGIN_ATTEMPT" };
}

export function logoutRequest(cb) {
    cb();
    return dispatch => {
        dispatch({type: SESSION_LOGOUT});
    };
}