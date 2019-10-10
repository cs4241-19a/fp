import { createStore, compose, applyMiddleware } from 'redux';
import root from './reducers/root';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);

const store = createStore(root, enhancer);

export default store;