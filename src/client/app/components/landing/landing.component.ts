import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';
import { SharedActionCreators } from '../../redux/shared/sharedReducer';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  currentUser: number;

  // Redux Observables
  @select(['shared']) sharedObs;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private sharedActionCreators: SharedActionCreators) { }

  ngOnInit() {
    this.currentUser = parseInt(localStorage.getItem('currentUserID'), 10);
    this.ngRedux.dispatch(this.sharedActionCreators.getUser(this.currentUser));
  }

}
