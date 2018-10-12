import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesLandingComponent } from '../wishes-landing/wishes-landing.component';
import { LandingComponent } from '../../../../components/landing/landing.component';

@Component({
  selector: 'how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.scss']
})
export class HowToUseComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }



}
