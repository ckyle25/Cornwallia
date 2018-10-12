import { Injectable } from '@angular/core';
import { WishesService } from '../../services/wishes/wishesService';

// Action Constants
const GET_ACTIVE_USER = 'GET_ACTIVE_USER';
const GET_ACTIVE_USER_PENDING = 'GET_ACTIVE_USER_PENDING';
const GET_ACTIVE_USER_FULFILLED = 'GET_ACTIVE_USER_FULFILLED';
const GET_USERS = 'GET_USERS';
const GET_USERS_PENDING = 'GET_USERS_PENDING';
const GET_USERS_FULFILLED = 'GET_USERS_FULFILLED';

// Initial State
export interface IWishesState {
  loading: boolean;
  currentUser: object;
  allUsers: object;
  familyReference: object;
}

const wishesInitialState: IWishesState = {
  loading: false,
  currentUser: {},
  allUsers: {},
  familyReference: {}
};

// Reducer
export function wishesReducer(state: IWishesState = wishesInitialState, action): IWishesState {
  switch (action.type) {
    case GET_ACTIVE_USER_PENDING:
      return Object.assign({}, state, {loading: true});
    case GET_ACTIVE_USER_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        currentUser: action.payload
      });
    case GET_USERS_PENDING:
      return Object.assign({}, state, {loading: true});
    case GET_USERS_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        allUsers: action.payload
      });

    default:
      return state;
  }
}

// Action Creators
export interface IWishesActionCreators {
  getActiveUser: Function;
  getAllUsers: Function;
}

@Injectable()
export class WishesActionCreators implements IWishesActionCreators {

  constructor(private wishesService: WishesService) { }

  getActiveUser(userId: number) {
    return {
      type: GET_ACTIVE_USER,
      payload: this.wishesService.getActiveUser(userId)
    };
  }

  getAllUsers() {
    return {
      type: GET_USERS,
      payload: this.wishesService.getAllUsers()
    };
  }
}
