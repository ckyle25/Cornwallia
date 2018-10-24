import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators } from '../../../../redux/wishes/wishesRootReducer';

@Component({
  selector: 'kyle-jodi',
  templateUrl: './kyle-jodi.component.html',
  styleUrls: ['./kyle-jodi.component.scss']
})
export class KyleJodiComponent implements OnInit {

  constructor(private ngRedux: NgRedux<GlobalState>,
    private wishesActionCreators: WishesActionCreators) { }

  ngOnInit() {
  }

  setWishUserID(userid: number) {
    localStorage.setItem('wishlistUser', userid.toString());
    this.ngRedux.dispatch(this.wishesActionCreators.setWishListUser(userid));
  }

}
