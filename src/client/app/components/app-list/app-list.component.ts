import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {
  wishesFlag: number;
  calendarFlag: number;
  lanPartyFlag: number;

  @select(['shared', localStorage.getItem('currentUserID')]) sharedObs;

  constructor() { }

  ngOnInit() {
    this.sharedObs.subscribe(result => {
      this.wishesFlag = result.userObject.wishesflg;
      this.calendarFlag = result.userObject.calendarflg;
      this.lanPartyFlag = result.userObject.lanpartyflg;
    })
  }

}
