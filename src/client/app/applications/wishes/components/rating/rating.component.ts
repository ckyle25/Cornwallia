import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating: number;
  @Input() wishId: string;

  constructor() { }

  ngOnInit() {
    console.log('rating', this.rating)
  }
}
