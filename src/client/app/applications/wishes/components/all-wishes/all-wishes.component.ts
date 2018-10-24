import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators } from '../../../../redux/wishes/wishesRootReducer';

@Component({
  selector: 'all-wishes',
  templateUrl: './all-wishes.component.html',
  styleUrls: ['./all-wishes.component.scss']
})

export class AllWishesComponent implements OnInit {

  family1Access: boolean;
  family2Access: boolean;
  family3Access: boolean;
  currentUser: number;

  @select('wishes') wishesObs;

  viewMode: string = 'overall';

  constructor(private ngRedux: NgRedux<GlobalState>,
              private wishesActionCreators: WishesActionCreators) { }

  ngOnInit() {
      this.wishesObs.subscribe(result => {
        result.currentUser.accessgroup1flg === 1 ? this.family1Access = true : this.family1Access = false;
        result.currentUser.accessgroup2flg === 1 ? this.family2Access = true : this.family2Access = false;
        result.currentUser.accessgroup3flg === 1 ? this.family3Access = true : this.family3Access = false;
      });
  }

  setViewToFamily() {
    this.viewMode = 'family';
  }

  setWishUserID(userid: number) {
    localStorage.setItem('wishlistUser', userid.toString());
    this.ngRedux.dispatch(this.wishesActionCreators.setWishListUser(userid));
  }

}
