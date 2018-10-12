import { Component, OnInit, Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';
import { SharedActionCreators } from '../../redux/shared/sharedReducer';

@Injectable()
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  appInitialized: boolean = false;

  // Redux Observables
  @select(['shared']) sharedObs;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private sharedActionCreators: SharedActionCreators) { }

  async ngOnInit(): Promise<boolean> {
    this.sharedObs.subscribe(result => {
      this.appInitialized = result.appInitialized;
    });
    if (!this.appInitialized) {
      await this.initializeApp();
    } else {
      console.log('app initialized');
    }

    return true;
  }

  public async initializeApp(): Promise<boolean> {
    await this.ngRedux.dispatch(this.sharedActionCreators.getUser(parseInt(localStorage.getItem('currentUserID'), 10)));
    await this.ngRedux.dispatch(this.sharedActionCreators.initializeApp());
    return true;
  }
}
