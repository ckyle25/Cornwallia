import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'wish-card',
  templateUrl: './wish-card.component.html',
  styleUrls: ['./wish-card.component.scss']
})
export class WishCardComponent implements OnInit, OnChanges {

  @Input() wish: any;

  title: string;
  price: number;
  link: string;
  description: string;
  rating: number;
  currentUser: number;
  wishUser: number;
  reserved: boolean;
  reservedUser: number;
  parentUser: number;

  constructor() { }

  ngOnInit() {
    this.title = 'The Thing I Want';
    this.price = 2.56;
    this.link = 'http://www.google.com';
    this.description = 'This is a description';
    this.rating = 2.5;
    this.currentUser = 1;
    this.wishUser = 2;
    this.reserved = false;
    this.parentUser = 1;
    this.reservedUser = 4;

  }

  ngOnChanges() {
    this.title = 'The Thing I Want';
    this.price = 2.56;
    this.link = 'http://www.google.com';
    this.description = 'This is a description';
    this.rating = 3;
    this.currentUser = 1;
    this.wishUser = 2;
    this.reserved = false;
    this.parentUser = 1;
    this.reservedUser = 4;
  }
}
