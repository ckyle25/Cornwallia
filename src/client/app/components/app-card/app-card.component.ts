// declare function require(path: string);
import { Component, OnInit, Input } from '@angular/core';

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
  
  constructor() { }

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
    
  }
}
