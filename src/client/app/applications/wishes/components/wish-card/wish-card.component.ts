import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators } from '../../../../redux/wishes/wishesRootReducer';
import { ModalTemplateComponent } from '../../../../shared/modal-template/modal-template.component';

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

  oldTitle: string;
  oldPrice: number;
  oldLink: string;
  oldDescription: string;
  oldRating: number;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private wishesActionCreators: WishesActionCreators,
              private modal: ModalTemplateComponent) { }

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

  async onReserveClick() {
    this.reserved = true;
    this.reservedUser = this.currentUser;
    await this.ngRedux.dispatch(this.wishesActionCreators.reserveWish(this.currentUser, this.wishid));
    await this.ngRedux.dispatch(this.wishesActionCreators.getWishes(this.wishUser));
  }

  async onReleaseClick() {
    this.reserved = false;
    this.reservedUser = 0;
    await this.ngRedux.dispatch(this.wishesActionCreators.releaseWish(this.wishid));
    await this.ngRedux.dispatch(this.wishesActionCreators.getWishes(this.wishUser));
  }

  onDeleteClick() {
    this.modal.openModal('deleteConfirm');
  }

  cancelDeleteWish() {
    this.modal.closeModal('deleteConfirm');
    console.log('title', this.title);
  }

  async confirmDeleteWish() {
    this.modal.closeModal('deleteConfirm');
    await this.ngRedux.dispatch(this.wishesActionCreators.deleteWish(this.wishid));
    await this.ngRedux.dispatch(this.wishesActionCreators.getWishes(this.wishUser));
  }

  onEditClick() {

    console.log('title', this.title);
    this.oldTitle = this.title;
    this.oldPrice = this.price;
    this.oldLink = this.link;
    this.oldDescription = this.description;
    this.oldRating = this.rating;
    this.modal.openModal('editWish');
  }

  async saveEditedWish() {
    if (this.title && this.price && this.rating) {
      this.modal.closeModal('editWish');
      const newDescription = this.description ? this.description : '';
      const newLink = this.link ? this.link : '';
      await this.ngRedux.dispatch(this.wishesActionCreators.updateWish(this.title, newDescription, this.price, newLink, this.rating, this.wishid));
      await this.ngRedux.dispatch(this.wishesActionCreators.getWishes(this.wishUser));
    } else {
      alert('Please fill in all required fields with a * next to them or shown in red');
    }

  }

  cancelEditWish() {
    this.modal.closeModal('editWish');
    this.title = this.oldTitle;
    this.price = this.oldPrice;
    this.link = this.oldLink;
    this.description = this.oldDescription;
    this.rating = this.oldRating;
  }

  onTitleKey(event: any) {
    this.title = event.target.value;
  }
}
