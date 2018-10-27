import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating: number;
  @Input() wishId: string;
  star5 = this.wishId + 'star5';
  star4half = this.wishId + 'star4half';
  star4 = this.wishId + 'star4';
  star3half = this.wishId + 'star3half';
  star3 = this.wishId + 'star3';
  star2half = this.wishId + 'star2half';
  star2 = this.wishId + 'star2';
  star1half = this.wishId + 'star1half';
  star1 = this.wishId + 'star1';
  starhalf = this.wishId + 'starhalf';

  constructor() { }

  ngOnInit() {
    console.log('rating', this.rating);
    console.log('wishid', this.wishId);

      if (this.rating == 0.5) {
        (<HTMLInputElement>document.getElementById(this.starhalf)).checked = true;
      }
      if (this.rating == 1) {
        (<HTMLInputElement>document.getElementById(this.star1)).checked = true;
      }
      if (this.rating == 1.5) {
        (<HTMLInputElement>document.getElementById(this.star1half)).checked = true;
      }
      if (this.rating == 2) {
        (<HTMLInputElement>document.getElementById(this.star2)).checked = true;
      }
      if (this.rating == 2.5) {
        (<HTMLInputElement>document.getElementById(this.star2half)).checked = true;
      }
      if (this.rating == 3) {
        (<HTMLInputElement>document.getElementById(this.star3)).checked = true;
      }
      if (this.rating == 3.5) {
        (<HTMLInputElement>document.getElementById(this.star3half)).checked = true;
      }
      if (this.rating == 4) {
        (<HTMLInputElement>document.getElementById(this.star4)).checked = true;
      }
      if (this.rating == 4.5) {
        (<HTMLInputElement>document.getElementById(this.star4half)).checked = true;
      }
      if (this.rating == 5) {
        (<HTMLInputElement>document.getElementById(this.star5)).checked = true;
      }
    }
}
