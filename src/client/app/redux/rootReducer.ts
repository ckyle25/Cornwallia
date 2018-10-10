import { combineReducers } from 'redux';
import { sharedReducer } from './shared/sharedReducer';

export interface IGlobalState {
    shared: any;
}

export const initialGlobalStateNew: IGlobalState = {
    shared: {}
};

export const rootReducer: (state: Object, action) => Object = combineReducers({
    shared: sharedReducer
});
