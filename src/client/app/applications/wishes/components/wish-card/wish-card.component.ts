import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'wish-card',
  templateUrl: './wish-card.component.html',
  styleUrls: ['./wish-card.component.scss']
})
export class WishCardComponent implements OnInit, OnChanges {

  @Input() wish: any;
  @Input() currentUser: number;
  
  title: string;
  price: number;
  link: string;
  description: string;
  rating: number;
  wishUser: number;
  reserved: boolean;
  reservedUser: number;
  parentUsers: any[];

  constructor() { }

  ngOnInit() {
    this.title = this.wish.titledsc;
    this.price = this.wish.costamt;
    this.link = this.wish.linktxt;
    this.description = this.wish.descriptiondsc;
    this.rating = parseFloat(this.wish.ratingnbr);
    this.wishUser = this.wish.userid;
    this.wish.reserved === 1 ? this.reserved = true : this.reserved = false
    this.parentUsers = [this.wish.parent1wishesuserid, this.wish.parent2wishesuserid];
    this.reservedUser = this.wish.reserveduserid;

  }

  ngOnChanges() {
    this.title = this.wish.titledsc;
    this.price = this.wish.costamt;
    this.link = this.wish.linktxt;
    this.description = this.wish.descriptiondsc;
    this.rating = parseFloat(this.wish.ratingnbr);
    this.wishUser = this.wish.userid;
    this.wish.reserved === 1 ? this.reserved = true : this.reserved = false
    this.parentUsers = [this.wish.parent1wishesuserid, this.wish.parent2wishesuserid];
    this.reservedUser = this.wish.reserveduserid;
  }
}
