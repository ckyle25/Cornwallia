import { Component, OnInit, Input } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators } from '../../../../redux//wishes/wishesRootReducer';

@Component({
  selector: 'wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  wishes: any;
  currentUserID: number;
  wishListUserID: number;

  wishListUserName: string;
  wishListUserBio: string;

  @select('shared') sharedObs;
  @select('wishes') wishesObs;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private wishesActionCreators: WishesActionCreators) { }

  async ngOnInit() {

    this.wishesObs.subscribe(result => {
      this.wishListUserID = result.wishListUser;
    });

    this.sharedObs.subscribe(result => {
      this.currentUserID = result.userObject.userid;
    });

    this.ngRedux.dispatch(this.wishesActionCreators.getWishes(this.wishListUserID));

    this.wishesObs.subscribe(result => {
      this.wishes = result.wishes;
      const currentUserDetail = result.allUsers.filter(obj => obj.userid == this.wishListUserID)[0];
      this.wishListUserName = currentUserDetail.firstnameval;
      this.wishListUserBio = currentUserDetail.biographytxt;
    });
  }

}
