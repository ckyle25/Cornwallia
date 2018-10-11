import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';

@Component({
  selector: 'app-loading',
  templateUrl: './app-loading.component.html',
  styleUrls: ['./app-loading.component.scss']
})
export class AppLoadingComponent implements OnInit {

  appTitle: string;

  @select(['shared']) sharedObs;

  constructor(private router: Router) { }

  ngOnInit() {
    this.sharedObs.subscribe(response => {
      this.appTitle = response.appSelection;
      if (this.appTitle == 'Wishes') {
        setTimeout(() => {this.router.navigate(['wishes/landing'])}, 4000)
      } else if (this.appTitle == 'LAN Party Planner') {
        setTimeout(() => {this.router.navigate(['lanparty/landing'])}, 4000)
      }
    });
  }

}
