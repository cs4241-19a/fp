import {
    SESSION_ERROR,
    SESSION_LOAD,
    SESSION_LOGIN,
    SESSION_LOGOUT
} from '../actions';
import { createReducer } from './utils';

const initialState = {
    user: '',
    password: '',
    isLoggingIn: false,
    isLoggedIn: false,
    error: null,
    key: null
};

const handlers = {
    [SESSION_LOAD]: (state, action) => action.payload,
    [SESSION_LOGIN]: (state, action) => {
        return Object.assign({}, state, {
            isLoggingIn: false,
            isLoggedIn: true,
            email: action.response.email,
            password: '',
            key: action.response.key
        });
    },
    [SESSION_LOGOUT]: () => ({}),
    [SESSION_ERROR]: (state, action) => {
        return Object.assign({}, state, {
            error: action.error,
            isLoggingIn: false,
            isLoggedIn: false,
            key: null
        });
    }
};

export default createReducer(initialState, handlers);