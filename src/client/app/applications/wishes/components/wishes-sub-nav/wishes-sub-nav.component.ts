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

  @select('wishes') wishesObs;

  constructor(private ngRedux: NgRedux<GlobalState>,
    private wishesActionCreators: WishesActionCreators) { }

  ngOnInit() {

    this.wishesObs.subscribe(result => {
      this.currentUserID = result.currentUser.userid
    });
    
  }

  setWishToCurrentUserID() {
    localStorage.setItem('wishlistUser', this.currentUserID.toString());
    this.ngRedux.dispatch(this.wishesActionCreators.setWishListUser(this.currentUserID));
  }

}
