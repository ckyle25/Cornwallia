import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
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

  @select(['shared']) sharedObs;

  constructor() { }

  ngOnInit() {
    this.sharedObs.subscribe(result => {
      this.wishesFlag = result.userObject.wishesflg;
      this.calendarFlag = result.userObject.calendarflg;
      this.lanPartyFlag = result.userObject.lanpartyflg;
    })
  }

}
