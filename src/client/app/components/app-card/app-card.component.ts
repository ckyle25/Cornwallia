// declare function require(path: string);
import { Component, OnInit, Input } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';
import { SharedActionCreators } from '../../redux/shared/sharedReducer';


@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.scss']
})
export class AppCardComponent implements OnInit {

  @Input() appName: string;
  @Input() title: string;
  @Input() caption: string;

  class: any;
  
  constructor(private ngRedux: NgRedux<GlobalState>,
              private sharedActionCreators: SharedActionCreators) { }

  ngOnInit() {
    switch (this.appName) {
      case 'wishes':
        this.class = 'wishes-image-style'
        break;
      case 'lanParty':
        this.class = 'lan-image-style'
        break;
      case 'calendar':
        this.class = 'calendar-image-style'
        break;
    }
  }

  onLaunchClick() {
    
    this.ngRedux.dispatch(this.sharedActionCreators.setSelectedApp(this.title));
  }
}
