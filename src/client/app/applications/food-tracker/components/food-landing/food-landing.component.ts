import { Component, OnInit, Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { FoodActionCreators } from '../../../../redux/food/foodReducer';
import { LandingComponent } from '../../../../components/landing/landing.component';

@Component({
  selector: 'food-landing',
  templateUrl: './food-landing.component.html',
  styleUrls: ['./food-landing.component.scss']
})
export class FoodLandingComponent implements OnInit {

  appInitialized: boolean = false;
  foodInitialized: boolean = false;
  edwUserID: number;
  currentUserId: number;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private foodActionCreators: FoodActionCreators,
              private homeLanding: LandingComponent) { }

  @select('shared') sharedObs;
  @select('food') foodObs;

  async ngOnInit() {
    this.sharedObs.subscribe(result => {
      this.appInitialized = result.appInitialized;
      this.edwUserID = result.userObject.userid;
    });
    this.foodObs.subscribe(result => {
      this.foodInitialized = result.foodInitialized;
      this.currentUserId = result.currentUser.userid;
    });

    if (!this.appInitialized) {
      await this.homeLanding.initializeApp();
    } else {
      console.log('app initialized');
    }

    if (!this.foodInitialized) {
      await this.initializeFood();
    } else {
      console.log('food initialized');
    }

    return true;
  }

  async initializeFood(): Promise<boolean> {
    await this.ngRedux.dispatch(this.foodActionCreators.getActiveUser(this.edwUserID));
    await this.ngRedux.dispatch(this.foodActionCreators.initializeFood());
    return true;
  }

}
