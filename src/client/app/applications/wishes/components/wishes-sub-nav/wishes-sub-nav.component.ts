import { Component, OnInit, HostListener } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators } from '../../../../redux//wishes/wishesRootReducer';

@HostListener('window:resize', ['$event'])
@Component({
  selector: 'wishes-sub-nav',
  templateUrl: './wishes-sub-nav.component.html',
  styleUrls: ['./wishes-sub-nav.component.scss']
})
export class WishesSubNavComponent implements OnInit {

  currentUserID: number;
  innerWidth: number = window.innerWidth;

  @select(['wishes', localStorage.getItem('currentUserID')]) wishesObs;

  constructor(private ngRedux: NgRedux<GlobalState>,
    private wishesActionCreators: WishesActionCreators) { }

  ngOnInit() {

    this.wishesObs.subscribe(result => {
      this.currentUserID = result.currentUser.userid;
    });

  }

  setWishToCurrentUserID() {
    localStorage.setItem('wishlistUser', this.currentUserID.toString());
    this.ngRedux.dispatch(this.wishesActionCreators.setWishListUser(this.currentUserID));
  }

  onResize(event) {
    this.innerWidth =  event.target.innerWidth;
   }

}
