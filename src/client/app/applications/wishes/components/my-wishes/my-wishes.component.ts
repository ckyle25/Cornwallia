import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';

@Component({
  selector: 'my-wishes',
  templateUrl: './my-wishes.component.html',
  styleUrls: ['./my-wishes.component.scss']
})
export class MyWishesComponent implements OnInit {

  wishesInitialized: boolean = false;

  constructor(private ngRedux: NgRedux<GlobalState>) { }

  @select(['wishes', localStorage.getItem('currentUserID')]) wishesObs;

  ngOnInit() {
    this.wishesObs.subscribe(result => {
      this.wishesInitialized = result.wishesInitialized;
    });
  }

}
