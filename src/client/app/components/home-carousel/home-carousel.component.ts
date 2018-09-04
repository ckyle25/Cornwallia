import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.selectF();
  }

  selectF() {
    document.getElementById('F').click();
    setTimeout(() => this.selectG(), 5000);
  }

  selectG() {
    document.getElementById('G').click();
    setTimeout(() => this.selectH(), 5000);
  }

  selectH() {
    document.getElementById('H').click();
    setTimeout(() => this.selectI(), 5000);
  }

  selectI() {
    document.getElementById('I').click();
    setTimeout(() => this.selectF(), 5000);
  }
}
