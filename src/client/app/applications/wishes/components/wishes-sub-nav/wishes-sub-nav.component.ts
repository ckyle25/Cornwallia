import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators } from '../../../../redux//wishes/wishesRootReducer';

@Component({
  selector: 'wishes-sub-nav',
  templateUrl: './wishes-sub-nav.component.html',
  styleUrls: ['./wishes-sub-nav.component.scss']
})
export class WishesSubNavComponent implements OnInit {

  currentUserID: number;

  @select('shared') sharedObs;

  constructor(private ngRedux: NgRedux<GlobalState>,
    private wishesActionCreators: WishesActionCreators) { }

  ngOnInit() {
    this.sharedObs.subscribe(result => {
      this.currentUserID = result.userObject.userid;
    });
  }

  setWishToCurrentUserID() {
    this.ngRedux.dispatch(this.wishesActionCreators.setWishListUser(this.currentUserID));
  }

}
