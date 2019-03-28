import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators } from '../../../../redux/wishes/wishesRootReducer';
import { ModalTemplateComponent } from '../../../../shared/modal-template/modal-template.component';
import { WishesService } from '../../../../services/wishes/wishesService';

@HostListener('window:resize', ['$event'])
@Component({
  selector: 'wish-card',
  templateUrl: './wish-card.component.html',
  styleUrls: ['./wish-card.component.scss']
})
export class WishCardComponent implements OnInit {

  @Input() wishes: any[];
  @Input() currentUser: number;
  @Input() wishCardId: string;

  @select(['wishes']) wishesObs;
  currentUserFirstName: string;

  title: string;
  price: number;
  link: string;
  description: string;
  rating: number;
  wishUserId: number;
  reserved: boolean;
  parentUsers: any[];
  wishId: number;
  contactMessage: string;

  oldTitle: string;
  oldPrice: number;
  oldLink: string;
  oldDescription: string;
  oldRating: number;
  innerWidth: number = window.innerWidth;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private wishesActionCreators: WishesActionCreators,
              private wishesService: WishesService,
              private modal: ModalTemplateComponent) { }

  ngOnInit() {
    this.wishesObs.subscribe(data => {
      this.currentUserFirstName = data.currentUser.firstnameval;
    });
    console.log('wishes', this.wishes);
  }

  async onReserveClick(wishid: number, userid: number) {
    await this.ngRedux.dispatch(this.wishesActionCreators.reserveWish(this.currentUser, wishid));
    await this.ngRedux.dispatch(this.wishesActionCreators.getReservedWishes(this.currentUser));
    await this.ngRedux.dispatch(this.wishesActionCreators.getWishes(userid));
  }

  async onReleaseClick(wishid: number, userid: number) {
    await this.ngRedux.dispatch(this.wishesActionCreators.releaseWish(wishid));
    await this.ngRedux.dispatch(this.wishesActionCreators.getReservedWishes(this.currentUser));
    await this.ngRedux.dispatch(this.wishesActionCreators.getWishes(userid));
  }

  onDeleteClick(wishid: number, userid: number) {
    localStorage.setItem('wishId', wishid.toString());
    localStorage.setItem('wishUserId', userid.toString());
    this.modal.openModal('deleteConfirm');
  }

  cancelDeleteWish() {
    this.wishId = null;
    this.wishUserId = null;
    this.modal.closeModal('deleteConfirm');
  }

  async confirmDeleteWish() {
    this.modal.closeModal('deleteConfirm');
    const wishid = parseInt(localStorage.getItem('wishId'), 10);
    const userid = parseInt(localStorage.getItem('wishUserId'), 10);
    await this.ngRedux.dispatch(this.wishesActionCreators.deleteWish(wishid));
    await this.ngRedux.dispatch(this.wishesActionCreators.getWishes(userid));
    if (userid === this.currentUser) {
      await this.ngRedux.dispatch(this.wishesActionCreators.getMyWishes(this.currentUser));
    }
    localStorage.setItem('wishId', '');
    localStorage.setItem('wishUserId', '');
  }

  onEditClick(title: string, price: number, link: string, description: string, rating: number, wishId: number, userid: number) {
    this.title = title;
    this.price = price;
    this.link = link;
    this.description = description;
    this.rating = rating;
    this.wishId = wishId;
    this.wishUserId = userid;
    this.modal.openModal('editWish');
  }

  async saveEditedWish(title: string, price: number, link: string, description: string, rating: number, wishId: number, userid: number) {
    if (title && price && rating) {
      this.modal.closeModal('editWish');
      const newDescription = description ? description : '';
      let newLink = link ? link : '';
      if (newLink !== '') {
        if (newLink.substring(0, 8) !== 'https://' && newLink.substring(0, 7) !== 'http://') {
          newLink = 'http://' + newLink;
        }
      }
      await this.ngRedux.dispatch(this.wishesActionCreators.updateWish(title, newDescription, price, newLink, rating, wishId));
      await this.ngRedux.dispatch(this.wishesActionCreators.getWishes(userid));
      if (userid === this.currentUser) {
        await this.ngRedux.dispatch(this.wishesActionCreators.getMyWishes(this.currentUser));
      }
      this.title = null;
      this.price = null;
      this.link = null;
      this.description = null;
      this.rating = null;
      this.wishId = null;
    } else {
      alert('Please fill in all required fields with a * next to them or shown in red');
    }

  }

  cancelEditWish() {
    this.modal.closeModal('editWish');
    this.title = null;
    this.price = null;
    this.link = null;
    this.description = null;
    this.rating = null;
    this.wishId = null;
  }

  onContactClick(contactFirstName: string, contactWishTitle: string, reservedUser: number) {
    this.ngRedux.dispatch(this.wishesActionCreators.updateReserverInfo(contactFirstName, contactWishTitle, reservedUser))
    this.modal.openModal('contactReserver');
  }

  cancelContactClick() {
    this.ngRedux.dispatch(this.wishesActionCreators.removeReserverInfo());
    this.modal.closeModal('contactReserver');
  }

  async sendContact() {
    this.modal.closeModal('contactReserver');

    let reservedUser = null;
    let wishTitle = '';
    let contactFirstName = '';

    await this.wishesObs.subscribe(data => {
      reservedUser = data.reserverInfo.reservedUser;
      wishTitle = data.reserverInfo.contactWishTitle;
      contactFirstName = data.reserverInfo.contactFirstName;
    });
    await this.wishesService.emailReserver(reservedUser, this.currentUser, wishTitle, contactFirstName, this.contactMessage, this.currentUserFirstName)
    await this.ngRedux.dispatch(this.wishesActionCreators.removeReserverInfo());
  }


  onResize(event) {
    this.innerWidth =  event.target.innerWidth;
  }
}
