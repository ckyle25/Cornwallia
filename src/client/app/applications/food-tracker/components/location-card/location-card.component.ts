import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent implements OnInit {


  @Input() title: string;

  class: any;

  constructor() { }

  ngOnInit() {
    switch (this.title) {
      case 'Pantry':
        this.class = 'pantry-image-style';
        break;
      case 'Fridge & Freezer':
        this.class = 'fridge-image-style';
        break;
      case 'Deep Freeze':
        this.class = 'freezer-image-style';
        break;
      case 'Food Storage':
        this.class = 'storage-image-style';
        break;
    }
  }
}
