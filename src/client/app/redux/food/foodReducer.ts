import { Injectable } from '@angular/core';
import { FoodService } from '../../services/food/foodService';

// Action Constants
const FOOD_GET_ACTIVE_USER = 'FOOD_GET_ACTIVE_USER';
const FOOD_GET_ACTIVE_USER_PENDING = 'FOOD_GET_ACTIVE_USER_PENDING';
const FOOD_GET_ACTIVE_USER_FULFILLED = 'FOOD_GET_ACTIVE_USER_FULFILLED';
const INITIALIZE_FOOD = 'INITIALIZE_FOOD';

// Initial State
export interface IFoodState {
  loading: boolean;
  foodInitialized: boolean;
  currentUser: any;
}

const foodInitialState: IFoodState = {
  loading: false,
  foodInitialized: false,
  currentUser: {}
};

// Reducer
export function foodReducer(state: IFoodState = foodInitialState, action): IFoodState {
  switch (action.type) {
    case FOOD_GET_ACTIVE_USER_PENDING:
      return Object.assign({}, state, {loading: true});
    case FOOD_GET_ACTIVE_USER_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        currentUser: action.payload
      });

    case INITIALIZE_FOOD:
      return Object.assign({}, state, {foodInitialized: action.payload});

    default:
      return state;
  }
}

// Action Creators
export interface IFoodActionCreators {
  getActiveUser: Function;
}

@Injectable()
export class FoodActionCreators implements IFoodActionCreators {

  constructor(private foodService: FoodService) { }

  getActiveUser(userId: number) {
    return {
      type: FOOD_GET_ACTIVE_USER,
      payload: this.foodService.getActiveUser(userId)
    };
  }

  initializeFood() {
    return {
      type: INITIALIZE_FOOD,
      payload: true
    };
  }
}
