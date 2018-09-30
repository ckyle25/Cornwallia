// declare function require(path: string);
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.scss']
})
export class AppCardComponent implements OnInit {

  @Input() appImage: string;
  @Input() title: string;
  @Input() caption: string;

  imageSource: any;
  
  constructor() { }

  ngOnInit() {
    this.imageSource = this.require(this.appImage);
  }

  require(path: string) {

  }
}
