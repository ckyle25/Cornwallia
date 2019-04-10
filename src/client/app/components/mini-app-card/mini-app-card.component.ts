import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mini-app-card',
  templateUrl: './mini-app-card.component.html',
  styleUrls: ['./mini-app-card.component.scss']
})
export class MiniAppCardComponent implements OnInit {

  @Input() appName: string;
  @Input() title: string;
  @Input() caption: string;

  class: any;

  constructor() { }

  ngOnInit() {
    switch (this.appName) {
      case 'wishes':
        this.class = 'wishes-image-style';
        break;
      case 'foodTracker':
        this.class = 'food-image-style';
        break;
      case 'calendar':
        this.class = 'calendar-image-style';
        break;
    }
  }

}
