import {createStore, applyMiddleware, Store} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';

export const store: Store<any> = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(reduxPromiseMiddleware())
));
