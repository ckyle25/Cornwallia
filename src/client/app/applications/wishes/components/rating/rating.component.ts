import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating: number;

  constructor() { }

  ngOnInit() {
    switch (this.rating) {
      case 0.5:
        (<HTMLInputElement>document.getElementById('starhalf')).checked = true;
        break;
      case 1:
        (<HTMLInputElement>document.getElementById('star1')).checked = true;
        break;
      case 1.5:
        (<HTMLInputElement>document.getElementById('star1half')).checked = true;
        break;
      case 2:
        (<HTMLInputElement>document.getElementById('star2')).checked = true;
        break;
      case 2.5:
        (<HTMLInputElement>document.getElementById('star2half')).checked = true;
        break;
      case 3:
        (<HTMLInputElement>document.getElementById('star3')).checked = true;
        break;
      case 3.5:
        (<HTMLInputElement>document.getElementById('star3half')).checked = true;
        break;
      case 4:
        (<HTMLInputElement>document.getElementById('star4')).checked = true;
        break;
      case 4.5:
        (<HTMLInputElement>document.getElementById('star4half')).checked = true;
        break;
      case 5:
        (<HTMLInputElement>document.getElementById('star5')).checked = true;
        break;
    }
  }

}
