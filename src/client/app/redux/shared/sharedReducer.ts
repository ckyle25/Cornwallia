import { Injectable } from '@angular/core';
import { SharedService } from '../../services/shared/sharedServices';

// Action Constants
const GET_USER = 'GET_USER';
const GET_USER_PENDING = 'GET_USER_PENDING';
const GET_USER_FULFILLED = 'GET_USER_FULFILLED';
const GET_ADMIN = 'GET_ADMIN';
const GET_ADMIN_PENDING = 'GET_ADMIN_PENDING';
const GET_ADMIN_FULFILLED = 'GET_ADMIN_FULFILLED';
const UPDATE_EDW_USER = 'UPDATE_EDW_USER';
const UPDATE_EDW_USER_PENDING = 'UPDATE_EDW_USER_PENDING';
const UPDATE_EDW_USER_FULFILLED = 'UPDATE_EDW_USER_FULFILLED';
const SET_SELECTED_APP = 'SET_SELECTED_APP';
const CLEAR_SELECTED_APP = 'CLEAR_SELECTED_APP';
const INITIALIZE_APP = 'INITIALIZE_APP';

// Initial State
export interface ISharedState {
  loading: boolean;
  userObject: any;
  appSelection: string;
  adminInfo: any;
  appInitialized: boolean;
}

const sharedInitialState: ISharedState = {
  loading: false,
  userObject: {},
  appSelection: '',
  adminInfo: {},
  appInitialized: false
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

    case GET_ADMIN_PENDING:
      return Object.assign({}, state, {loading: true});
    case GET_ADMIN_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        adminInfo: action.payload
      });

    case SET_SELECTED_APP:
      return Object.assign({}, state, {appSelection: action.payload});
    case CLEAR_SELECTED_APP:
      return Object.assign({}, state, {appSelection: action.payload});
    case INITIALIZE_APP:
      return Object.assign({}, state, {appInitialized: action.payload});

    case UPDATE_EDW_USER_PENDING:
      return Object.assign({}, state, {loading: true});
    case UPDATE_EDW_USER_FULFILLED:
      return Object.assign({}, state, {loading: false});

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

  getAdmin() {
    return {
      type: GET_ADMIN,
      payload: this.sharedService.getAdmin()
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

  updateEdwUser(userId: number, email: string, isAdmin: number, wishes: number, lanParty: number, calendar: number, firstName: string, lastName: string, auth0Id: string) {
    return {
      type: UPDATE_EDW_USER,
      payload: this.sharedService.updateEdwUser(userId, email, isAdmin, wishes, lanParty, calendar, firstName, lastName, auth0Id)
    };
  }
}
