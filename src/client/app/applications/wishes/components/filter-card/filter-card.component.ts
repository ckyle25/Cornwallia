import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'filter-card',
  templateUrl: './filter-card.component.html',
  styleUrls: ['./filter-card.component.scss']
})
export class FilterCardComponent implements OnInit {


  @Input() title: string;

  class: any;

  constructor() { }

  ngOnInit() {
    switch (this.title) {
      case 'Kyle & Jodi':
        this.class = 'kj-image-style';
        break;
      case 'Kyle':
        this.class = 'kyle-image-style';
        break;
      case 'Jodi':
        this.class = 'jodi-image-style';
        break;
      case 'Miles':
        this.class = 'miles-image-style';
        break;
      case 'Owen':
        this.class = 'owen-image-style';
        break;
      case 'Kevin & Kendal':
        this.class = 'kk-image-style';
        break;
      case 'Kevin':
        this.class = 'kevin-image-style';
        break;
      case 'Kendal':
        this.class = 'kendal-image-style';
        break;
      case 'Lily':
        this.class = 'lily-image-style';
        break;
      case 'Quinten':
        this.class = 'quinten-image-style';
        break;
      case 'Rob & Shari':
        this.class = 'rj-image-style';
        break;
      case 'Rob':
        this.class = 'rob-image-style';
        break;
      case 'Shari':
        this.class = 'shari-image-style';
        break;
      case 'Drew':
        this.class = 'drew-image-style';
        break;
      case 'Julie':
        this.class = 'julie-image-style';
        break;
      case 'Troy & Allison':
        this.class = 'ta-image-style';
        break;
      case 'Troy':
        this.class = 'troy-image-style';
        break;
      case 'Allison':
        this.class = 'alison-image-style';
        break;
    }
  }

}
