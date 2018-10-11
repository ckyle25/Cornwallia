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
      case 'Kevin & Kendal':
        this.class = 'kk-image-style';
        break;
      case 'Rob & Shari':
        this.class = 'rj-image-style';
        break;
      case 'Drew':
        this.class = 'd-image-style';
        break;
    }
  }

}
