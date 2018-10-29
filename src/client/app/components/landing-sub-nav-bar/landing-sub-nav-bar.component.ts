import { Component, OnInit, HostListener } from '@angular/core';

@HostListener('window:resize', ['$event'])
@Component({
  selector: 'landing-sub-nav-bar',
  templateUrl: './landing-sub-nav-bar.component.html',
  styleUrls: ['./landing-sub-nav-bar.component.scss']
})
export class LandingSubNavBarComponent implements OnInit {

  innerWidth: number = window.innerWidth;

  constructor() { }

  ngOnInit() {
  }

  onResize(event) {
    this.innerWidth =  event.target.innerWidth;
   }

}
