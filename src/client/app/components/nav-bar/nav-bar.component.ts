import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';
import { environment } from '../../../environments/environment';
import { SharedActionCreators } from '../../redux/shared/sharedReducer';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  logoutURL = `${environment.serverUrl}auth/logout`;
  loggedInName: string;

  @select(['shared']) sharedObs;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private sharedActionCreators: SharedActionCreators) { }

  ngOnInit() {
    this.sharedObs.subscribe(result => {
      this.loggedInName = result.userObject.firstnameval;
    })
  }

  removeUserId() {
    localStorage.setItem('currentUserID', '');
  }

  clearSelectedApp() {
    this.ngRedux.dispatch(this.sharedActionCreators.clearSelectedApp());
  }
}
