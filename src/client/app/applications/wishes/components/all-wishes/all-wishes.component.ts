import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesLandingComponent } from '../wishes-landing/wishes-landing.component';
import { LandingComponent } from '../../../../components/landing/landing.component';

@Component({
  selector: 'all-wishes',
  templateUrl: './all-wishes.component.html',
  styleUrls: ['./all-wishes.component.scss']
})
export class AllWishesComponent implements OnInit {

  family1Access: boolean;
  family2Access: boolean;
  family3Access: boolean;

  @select('wishes') wishesObs;

  constructor(private ngRedux: NgRedux<GlobalState>,) { }

  ngOnInit() {
    this.wishesObs.subcribe(result => {
      result.currentUser.accessgroup1flg === 1 ? this.family1Access = true : this.family1Access = false;
      result.currentUser.accessgroup2flg === 1 ? this.family1Access = true : this.family1Access = false;
      result.currentUser.accessgroup3flg === 1 ? this.family1Access = true : this.family1Access = false;
  }


}
