import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators } from '../../../../redux//wishes/wishesRootReducer';

@Component({
  selector: 'how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.scss']
})
export class HowToUseComponent implements OnInit {

  @select('shared') sharedObs

  currentUserID: number;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private wishesActionCreators: WishesActionCreators) { }

  ngOnInit() {
    this.sharedObs.subscribe(result => {
      this.currentUserID = result.userObject.userid
      this.ngRedux.dispatch(this.wishesActionCreators.getActiveUser(this.currentUserID))
      this.ngRedux.dispatch(this.wishesActionCreators.getAllUsers())
    })
  }

}
