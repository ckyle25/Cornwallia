import { Component, OnInit, Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators } from '../../../../redux//wishes/wishesRootReducer';
import { LandingComponent } from '../../../../components/landing/landing.component';

@Injectable()
@Component({
  selector: 'wishes-landing',
  templateUrl: './wishes-landing.component.html',
  styleUrls: ['./wishes-landing.component.scss']
})
export class WishesLandingComponent implements OnInit {

  appInitialized: boolean = false;
  wishesInitialized: boolean = false;
  currentUserID: number;

  @select(['shared', localStorage.getItem('currentUserID')]) sharedObs;
  @select(['wishes', localStorage.getItem('currentUserID')]) wishesObs;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private wishesActionCreators: WishesActionCreators,
              private homeLanding: LandingComponent) { }

  async ngOnInit() {
    this.sharedObs.subscribe(result => {
      this.appInitialized = result.appInitialized;
      this.currentUserID = result.userObject.userid;
    });
    this.wishesObs.subscribe(result => {
      console.log('wishes result', result);
      this.wishesInitialized = result.wishesInitialized;
    });

    if (!this.appInitialized) {
      await this.homeLanding.initializeApp();
    } else {
      console.log('app initialized');
    }

    if (!this.wishesInitialized) {
      await this.initializeWishes();
    } else {
      console.log('wishes initialized');
    }

    return true;
  }

  async initializeWishes(): Promise<boolean> {
    await this.ngRedux.dispatch(this.wishesActionCreators.getFamilyReference());
    await this.ngRedux.dispatch(this.wishesActionCreators.getActiveUser(this.currentUserID));
    await this.ngRedux.dispatch(this.wishesActionCreators.getReservedWishes(this.currentUserID));
    await this.ngRedux.dispatch(this.wishesActionCreators.getMyWishes(this.currentUserID));
    await this.ngRedux.dispatch(this.wishesActionCreators.getAllUsers());
    await this.ngRedux.dispatch(this.wishesActionCreators.initializeWishes());
    return true;
  }

}
