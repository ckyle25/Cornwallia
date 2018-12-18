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
      if (this.appTitle === 'Wishes') {
        setTimeout(() => {this.router.navigate(['wishes/landing'])}, 2000)
      } else if (this.appTitle === 'Food Tracker') {
        setTimeout(() => {this.router.navigate(['foodtracker/landing'])}, 2000)
      }
    });
  }

}
