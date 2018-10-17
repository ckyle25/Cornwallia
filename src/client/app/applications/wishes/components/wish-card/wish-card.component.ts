import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators } from '../../../../redux/wishes/wishesRootReducer';

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
  wishid: number;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private wishesActionCreators: WishesActionCreators) { }

  ngOnInit() {
    this.wishid = this.wish.wishid;
    this.title = this.wish.titledsc;
    this.price = this.wish.costamt;
    this.link = this.wish.linktxt;
    this.description = this.wish.descriptiondsc;
    this.rating = parseFloat(this.wish.ratingnbr);
    this.wishUser = this.wish.userid;
    this.wish.reservedflg === 1 ? this.reserved = true : this.reserved = false;
    this.parentUsers = [this.wish.parent1wishesuserid, this.wish.parent2wishesuserid];
    this.reservedUser = this.wish.reserveduserid;
  }

  ngOnChanges() {
    this.wishid = this.wish.wishid;
    this.title = this.wish.titledsc;
    this.price = this.wish.costamt;
    this.link = this.wish.linktxt;
    this.description = this.wish.descriptiondsc;
    this.rating = parseFloat(this.wish.ratingnbr);
    this.wishUser = this.wish.userid;
    this.wish.reservedflg === 1 ? this.reserved = true : this.reserved = false;
    this.parentUsers = [this.wish.parent1wishesuserid, this.wish.parent2wishesuserid];
    this.reservedUser = this.wish.reserveduserid;
  }

  onReserveClick() {
    this.reserved = true;
    this.reservedUser = this.currentUser;
    this.ngRedux.dispatch(this.wishesActionCreators.reserveWish(this.currentUser, this.wishid, this.wishUser));
  }

  onReleaseClick() {
    this.reserved = false;
    this.reservedUser = 0;
    this.ngRedux.dispatch(this.wishesActionCreators.releaseWish(this.wishid, this.wishUser));
  }
}
