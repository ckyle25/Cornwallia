import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';
import { environment } from '../../../environments/environment';
import { SharedActionCreators, ISharedState } from '../../redux/shared/sharedReducer';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  logoutURL = `${environment.serverUrl}auth/logout`;
  isAdmin: boolean;
  loggedInName: string;

  @select('shared') sharedObs;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private sharedActionCreators: SharedActionCreators) { }

  ngOnInit() {
    this.sharedObs.subscribe((result: ISharedState) => {
      this.loggedInName = result.userObject.firstnameval;
      result.userObject.isadminflg === 1 ? this.isAdmin = true : this.isAdmin = false;
    });
  }

  removeUserId() {
    localStorage.setItem('currentUserID', '');
  }

  clearSelectedApp() {
    this.ngRedux.dispatch(this.sharedActionCreators.clearSelectedApp());
  }
}
