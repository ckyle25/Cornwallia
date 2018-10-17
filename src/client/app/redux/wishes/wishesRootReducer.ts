import { Injectable } from '@angular/core';
import { WishesService } from '../../services/wishes/wishesService';

// Action Constants
const GET_ACTIVE_USER = 'GET_ACTIVE_USER';
const GET_ACTIVE_USER_PENDING = 'GET_ACTIVE_USER_PENDING';
const GET_ACTIVE_USER_FULFILLED = 'GET_ACTIVE_USER_FULFILLED';
const GET_USERS = 'GET_USERS';
const GET_USERS_PENDING = 'GET_USERS_PENDING';
const GET_USERS_FULFILLED = 'GET_USERS_FULFILLED';
const GET_WISHES = 'GET_WISHES';
const GET_WISHES_PENDING = 'GET_WISHES_PENDING';
const GET_WISHES_FULFILLED = 'GET_WISHES_FULFILLED';
const SET_WISHLIST_USER = 'SET_WISHLET_USER';
const INITIALIZE_WISHES = 'INITIALIZE_WISHES';
const RESERVE_WISH = 'RESERVE_WISH';
const RESERVE_WISH_PENDING = 'RESERVE_WISH_PENDING';
const RESERVE_WISH_FULFILLED = 'RESERVE_WISH_FULFILLED';
const RELEASE_WISH = 'RELEASE_WISH';
const RELEASE_WISH_PENDING = 'RELEASE_WISH_PENDING';
const RELEASE_WISH_FULFILLED = 'RELEASE_WISH_FULFILLED';


// Initial State
export interface IWishesState {
  loading: boolean;
  currentUser: object;
  allUsers: object;
  familyReference: object;
  wishesInitialized: boolean;
  wishes: any[];
  wishListUser: number;
}

const wishesInitialState: IWishesState = {
  loading: false,
  currentUser: {},
  allUsers: {},
  familyReference: {},
  wishesInitialized: false,
  wishes: [],
  wishListUser: 0
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

    case GET_WISHES_PENDING:
      return Object.assign({}, state, {loading: true});
    case GET_WISHES_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        wishes: action.payload
      });

    case SET_WISHLIST_USER:
      return Object.assign({}, state, {wishListUser: action.payload})

    case INITIALIZE_WISHES:
      return Object.assign({}, state, {wishesInitialized: action.payload});

    case RESERVE_WISH_PENDING:
      return Object.assign({}, state, {loading: true});
    case RESERVE_WISH_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        wishes: action.payload
      });

    case RELEASE_WISH_PENDING:
      return Object.assign({}, state, {loading: true});
    case RELEASE_WISH_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        wishes: action.payload
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

  getWishes(userId: number) {
    return {
      type: GET_WISHES,
      payload: this.wishesService.getWishes(userId)
    };
  }

  setWishListUser(userId: number) {
    return {
      type: SET_WISHLIST_USER,
      payload: userId
    };
  }

  initializeWishes() {
    return {
      type: INITIALIZE_WISHES,
      payload: true
    };
  }

  reserveWish(reservedUserId: number, wishId: number, wishUserId: number) {
    return {
      type: RESERVE_WISH,
      payload: this.wishesService.reserveWish(reservedUserId, wishId, wishUserId)
    };
  }

  releaseWish(wishId: number, wishUserId: number) {
    return {
      type: RELEASE_WISH,
      payload: this.wishesService.releaseWish(wishId, wishUserId)
    };
  }
}
