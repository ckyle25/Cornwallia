import { Component, OnInit, Input } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators, IWishesState } from '../../../../redux//wishes/wishesRootReducer';
import { ModalTemplateComponent } from '../../../../shared/modal-template/modal-template.component';

@Component({
  selector: 'wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  wishes: any;
  currentUserID: number;
  wishListUserID: number;
  parentUserIdsContains: number;

  wishListUserName: string;
  wishListUserBio: string;

  title: string;
  cost: number;
  link: string;
  description: string;
  rating: number;

  numberReservedWishes: number;
  numberActiveWishes: number;

  @select('shared') sharedObs;
  @select('wishes') wishesObs;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private wishesActionCreators: WishesActionCreators,
              private modal: ModalTemplateComponent) { }

  ngOnInit() {

    this.wishListUserID = parseInt(localStorage.getItem('wishlistUser'), 10);

    this.sharedObs.subscribe(result => {
      this.currentUserID = result.userObject.userid;
    });

    this.wishesObs.subscribe((result: IWishesState) => {
      this.wishListUserID = result.wishListUser;
      this.wishes = result.wishes;

      const wishListUserDetail = result.allUsers.filter(obj => obj.userid === this.wishListUserID)[0];
      this.wishListUserName = wishListUserDetail.firstnameval;
      this.wishListUserBio = wishListUserDetail.biographytxt;

      const familyObj = result.familyReference.filter(obj => obj.familyid === result.currentUser.familyid)[0];
      const parentUserIds = [familyObj.parent1wishesuserid, familyObj.parent2wishesuserid !== null ? familyObj.parent2wishesuserid : 0];
      this.parentUserIdsContains = parentUserIds.indexOf(this.wishListUserID);

      this.numberReservedWishes = result.wishes.filter(obj => obj.reservedflg === 1).length;
      this.numberActiveWishes = result.wishes.filter(obj => obj.reservedflg !== 1).length;
    });

    this.ngRedux.dispatch(this.wishesActionCreators.getWishes(this.wishListUserID));
  }

  openAddWishDialog() {
    this.modal.openModal('addWish');
  }

  async saveAddedWish() {
    if (this.title && this.cost && this.rating) {
      this.modal.closeModal('addWish');
      const newDescription = this.description ? this.description : '';
      const newLink = this.link ? this.link : '';
      await this.ngRedux.dispatch(this.wishesActionCreators.addWish(this.wishListUserID, this.title, newDescription, this.cost, newLink, this.rating));
      await this.ngRedux.dispatch(this.wishesActionCreators.getWishes(this.wishListUserID));
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

}
