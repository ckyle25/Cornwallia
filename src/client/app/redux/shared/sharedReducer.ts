import { Injectable } from '@angular/core';
import { SharedService } from '../../services/shared/sharedServices';

// Action Constants
const GET_USER = 'GET_USER';
const GET_USER_PENDING = 'GET_USER_PENDING';
const GET_USER_FULFILLED = 'GET_USER_FULFILLED';

// Initial State
export interface ISharedState {
  loading: boolean;
  userObject: object;
}

const sharedInitialState: ISharedState = {
  loading: false,
  userObject: {}
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
    console.log('reduceruserID', userId);
    return {
      type: GET_USER,
      payload: this.sharedService.getUser(userId)
    };
  }
}
