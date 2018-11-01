import { Injectable } from '@angular/core';
import { SharedService } from '../../services/shared/sharedServices';

// Action Constants
const GET_USER = 'GET_USER';
const GET_USER_PENDING = 'GET_USER_PENDING';
const GET_USER_FULFILLED = 'GET_USER_FULFILLED';
const SET_SELECTED_APP = 'SET_SELECTED_APP';
const CLEAR_SELECTED_APP = 'CLEAR_SELECTED_APP';
const INITIALIZE_APP = 'INITIALIZE_APP';

// Initial State
class SharedState {
  loading = false;
  userObject = {};
  appSelection = '';
  appInitialized = false;
}

export interface ISharedState {
  1: SharedState;
  2: SharedState;
  3: SharedState;
  4: SharedState;
  5: SharedState;
  6: SharedState;
  7: SharedState;
  8: SharedState;
  9: SharedState;
  10: SharedState;
  11: SharedState;
  12: SharedState;
  13: SharedState;
  14: SharedState;
  15: SharedState;
  16: SharedState;
}

const sharedInitialState: ISharedState = {
  1: new SharedState(),
  2: new SharedState(),
  3: new SharedState(),
  4: new SharedState(),
  5: new SharedState(),
  6: new SharedState(),
  7: new SharedState(),
  8: new SharedState(),
  9: new SharedState(),
  10: new SharedState(),
  11: new SharedState(),
  12: new SharedState(),
  13: new SharedState(),
  14: new SharedState(),
  15: new SharedState(),
  16: new SharedState()
};

// Reducer
export function sharedReducer(state: ISharedState = sharedInitialState, action): ISharedState {
  const currentUserLocalStorage = localStorage.getItem('currentUserID');

  const usersState = Object.keys(state).filter(key => key === currentUserLocalStorage).reduce((obj, key) => {
    obj[key] = state[key];
    return obj;
  }, {});

  switch (action.type) {
    case GET_USER_PENDING:
      usersState[currentUserLocalStorage].loading = true;
      return Object.assign({}, state, usersState);
    case GET_USER_FULFILLED:
      usersState[currentUserLocalStorage].loading = false;
      usersState[currentUserLocalStorage].userObject = action.payload;
      return Object.assign({}, state, usersState);
    case SET_SELECTED_APP:
      usersState[currentUserLocalStorage].appSelection = action.payload;
      return Object.assign({}, state, usersState);
    case CLEAR_SELECTED_APP:
      usersState[currentUserLocalStorage].appSelection = action.payload;
      return Object.assign({}, state, usersState);
    case INITIALIZE_APP:
      usersState[currentUserLocalStorage].appInitialized = action.payload;
      return Object.assign({}, state, usersState);

    default:
      return state;
  }
}

// Action Creators

@Injectable()
export class SharedActionCreators {

  constructor(private sharedService: SharedService) { }

  getUser(userId: number) {
    return {
      type: GET_USER,
      payload: this.sharedService.getUser(userId)
    };
  }

  setSelectedApp(appSelection: string) {
    return {
      type: SET_SELECTED_APP,
      payload: appSelection
    };
  }

  clearSelectedApp() {
    return {
      type: CLEAR_SELECTED_APP,
      payload: ''
    };
  }

  initializeApp() {
    return {
      type: INITIALIZE_APP,
      payload: true
    };
  }
}
