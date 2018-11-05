import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators, IWishesState } from '../../../../redux//wishes/wishesRootReducer';
import { ModalTemplateComponent } from '../../../../shared/modal-template/modal-template.component';

@HostListener('window:resize', ['$event'])
@Component({
  selector: 'wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  wishes: any[];
  currentUserID: number;
  wishListUserID: number;
  parentUserIdsContains: number;

  wishListUserName: string;
  wishListUserBio: string;
  wishListUserBioOld: string;

  title: string;
  cost: number;
  link: string;
  description: string;
  rating: number;

  activeWishes: any[];
  activeWishesPresent: boolean;
  reservedWishes: any[];
  reservedWishesPresent: boolean;
  myWishes: any[];
  myWishesPresent: boolean;
  myReservedWishes: any[];
  myReservedWishesPresent: boolean;
  innerWidth: number = window.innerWidth;

  @select('shared') sharedObs;
  @select('wishes') wishesObs;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private wishesActionCreators: WishesActionCreators,
              private modal: ModalTemplateComponent) { }

  async ngOnInit() {

    this.wishListUserID = parseInt(localStorage.getItem('wishlistUser'), 10);
    
    await this.ngRedux.dispatch(this.wishesActionCreators.getWishes(this.wishListUserID));

    this.wishesObs.subscribe((result: IWishesState) => {
      this.wishListUserID = result.wishListUser;
      this.currentUserID = result.currentUser.userid;
      if (this.wishListUserID === 0) {
        this.wishListUserID = parseInt(localStorage.getItem('wishlistUser'), 10);
      }
      this.wishes = result.wishes;

      const wishListUserDetail = result.allUsers.filter(obj => obj.userid === this.wishListUserID)[0];
      this.wishListUserName = wishListUserDetail.firstnameval;
      this.wishListUserBio = wishListUserDetail.biographytxt;

      const familyObj = result.familyReference.filter(obj => obj.familyid === wishListUserDetail.familyid)[0];
      const parentUserIds = [familyObj.parent1wishesuserid, familyObj.parent2wishesuserid !== null ? familyObj.parent2wishesuserid : 0];
      this.parentUserIdsContains = parentUserIds.indexOf(this.currentUserID);

      this.reservedWishes = result.wishes.filter(obj => obj.reservedflg === 1).sort((a, b) => b.ratingnbr - a.ratingnbr);
      this.activeWishes = result.wishes.filter(obj => obj.reservedflg !== 1).sort((a, b) => b.ratingnbr - a.ratingnbr);
      this.activeWishes.length > 0 ? this.activeWishesPresent = true : this.activeWishesPresent = false;
      this.reservedWishes.length > 0 ? this.reservedWishesPresent = true : this.reservedWishesPresent = false;
      this.myWishes = result.myWishes.sort((a, b) => b.ratingnbr - a.ratingnbr);
      this.myWishes.length > 0 ? this.myWishesPresent = true : this.myWishesPresent = false;
      this.myReservedWishes = result.myReservedWishes.sort((a, b) => b.ratingnbr - a.ratingnbr);
      this.myReservedWishes.length > 0 ? this.myReservedWishesPresent = true : this.myReservedWishesPresent = false;
    });
  }

  openAddWishDialog() {
    this.modal.openModal('addWish');
  }

  async saveAddedWish() {
    if (this.title && this.cost && this.rating) {
      this.modal.closeModal('addWish');
      const newDescription = this.description ? this.description : '';
      let newLink = this.link ? this.link : '';
      if (newLink !== '') {
        if (newLink.substring(0, 8) !== 'https://' && newLink.substring(0, 7) !== 'http://') {
          newLink = 'http://' + newLink;
        }
      }
      await this.ngRedux.dispatch(this.wishesActionCreators.addWish(this.wishListUserID, this.title, newDescription, this.cost, newLink, this.rating));
      await this.ngRedux.dispatch(this.wishesActionCreators.getWishes(this.wishListUserID));
      if (this.wishListUserID = this.currentUserID) {
        await this.ngRedux.dispatch(this.wishesActionCreators.getMyWishes(this.currentUserID));
      }
      this.title = null;
      this.cost = null;
      this.rating = null;
      this.link = null;
      this.description = null;
    } else {
      alert('Please fill in all required fields with a * next to them or shown in red');
    }
  }

  cancelAddWishDialog() {
    this.modal.closeModal('addWish');
    this.title = null;
    this.cost = null;
    this.rating = null;
    this.link = null;
    this.description = null;
  }

  onBioEditClick() {
    this.wishListUserBioOld = this.wishListUserBio;
    this.modal.openModal('editBio');
  }

  cancelBioEdit() {
    this.wishListUserBio = this.wishListUserBioOld;
    this.wishListUserBioOld = '';
    this.modal.closeModal('editBio');
  }

  saveBioEdit() {

  }

  onResize(event) {
    this.innerWidth =  event.target.innerWidth;
   }
}
