import { Component, OnInit, Input } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../../../redux/rootReducer';
import { WishesActionCreators } from '../../../../redux//wishes/wishesRootReducer';
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
  parentUserIds: number[];

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

  async ngOnInit() {

    this.wishesObs.subscribe(result => {
      this.wishListUserID = result.wishListUser;
      const familyObj = result.familyReference.filter(obj => obj.familyid === result.currentUser.familyid)[0];
      this.parentUserIds = [familyObj.parent1wishesuserid, familyObj.parent2wishesuserid !== null ? familyObj.parent2wishesuserid : 0];
    });

    this.sharedObs.subscribe(result => {
      this.currentUserID = result.userObject.userid;
    });

    this.ngRedux.dispatch(this.wishesActionCreators.getWishes(this.wishListUserID));

    this.wishesObs.subscribe(result => {
      this.wishes = result.wishes;
      const currentUserDetail = result.allUsers.filter(obj => obj.userid === this.wishListUserID)[0];
      this.wishListUserName = currentUserDetail.firstnameval;
      this.wishListUserBio = currentUserDetail.biographytxt;
      this.numberReservedWishes = result.wishes.filter(obj => obj.reservedflg === 1).length;
      this.numberActiveWishes = result.wishes.filter(obj => obj.reservedflg !== 1).length;
    });


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
