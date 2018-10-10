import { Injectable } from '@angular/core';
import { SharedService } from '../../services/shared/sharedServices';

// Action Constants
const GET_USER = 'GET_USER';
const GET_USER_PENDING = 'GET_USER_PENDING';
const GET_USER_FULFILLED = 'GET_USER_FULFILLED';
const SET_SELECTED_APP = 'SET_SELECTED_APP';
const CLEAR_SELECTED_APP = 'CLEAR_SELECTED_APP'

// Initial State
export interface ISharedState {
  loading: boolean;
  userObject: object;
  appSelection: string;
}

const sharedInitialState: ISharedState = {
  loading: false,
  userObject: {},
  appSelection: ''
};

// Reducer
export function sharedReducer(state: ISharedState = sharedInitialState, action): ISharedState {
  switch (action.type) {
    case GET_USER_PENDING:
      return Object.assign({}, state, {loading: true});
    case GET_USER_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        userObject: action.payload
      });
    case SET_SELECTED_APP:
      return Object.assign({}, state, {appSelection: action.payload})
    case CLEAR_SELECTED_APP:
      return Object.assign({}, state, {appSelection: action.payload})

    default:
      return state;
  }
}

// Action Creators
export interface ISharedActionCreators {
  getUser: Function;
}

@Injectable()
export class SharedActionCreators implements ISharedActionCreators {

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
}
