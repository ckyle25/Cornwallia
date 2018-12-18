import { combineReducers } from 'redux';
import { sharedReducer } from './shared/sharedReducer';
import { wishesReducer } from './wishes/wishesRootReducer';
import { foodReducer } from './food/foodReducer';

export interface IGlobalState {
    shared: any;
    wishes: any;
    food: any;
}

export const initialGlobalStateNew: IGlobalState = {
    shared: {},
    wishes: {},
    food: {}
};

export const rootReducer: (state: Object, action) => Object = combineReducers({
    shared: sharedReducer,
    wishes: wishesReducer,
    food: foodReducer
});
