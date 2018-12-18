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
  foodFlag: number;

  @select('shared') sharedObs;

  constructor() { }

  ngOnInit() {
    this.sharedObs.subscribe(result => {
      this.wishesFlag = result.userObject.wishesflg;
      this.calendarFlag = result.userObject.calendarflg;
      this.foodFlag = result.userObject.foodflg;
    });
  }

}
