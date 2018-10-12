import { combineReducers } from 'redux';
import { sharedReducer } from './shared/sharedReducer';
import { wishesReducer } from './wishes/wishesRootReducer';

export interface IGlobalState {
    shared: any;
    wishes: any;
}

export const initialGlobalStateNew: IGlobalState = {
    shared: {},
    wishes: {}
};

export const rootReducer: (state: Object, action) => Object = combineReducers({
    shared: sharedReducer,
    wishes: wishesReducer
});
