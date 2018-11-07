import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';
import { LandingComponent } from '../landing/landing.component';
import { ISharedState, SharedActionCreators } from '../../redux/shared/sharedReducer';
import * as moment from 'moment';
import { ModalTemplateComponent } from '../../shared/modal-template/modal-template.component';
import { WishesActionCreators } from '../../redux/wishes/wishesRootReducer';

@Component({
  selector: 'admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss']
})
export class AdminScreenComponent implements OnInit {

  appInitialized: boolean = false;
  innerWidth: number = window.innerWidth;
  edwUsers: any[];
  wishesUsers: any[];
  wishesFamilies: any[];

  cornwalliaUserId: number;
  cornwalliaEmail: string;
  cornwalliaAdmin: number;
  cornwalliaWishes: number;
  cornwalliaLan: number;
  cornwalliaCalendar: number;
  cornwalliaFirstName: string;
  cornwalliaLastName: string;
  cornwalliaAuth0Id: string;

  wishesUserId: number;
  wishesEdwUserId: number;
  wishesFamilyId: number;
  wishesParent: number;
  wishesFirstName: string;
  wishesLastName: string;
  wishesIsAdmin: number;
  wishesBirthday: string;
  wishesAnniversary: string;
  wishesGroup1: number;
  wishesGroup2: number;
  wishesGroup3: number;

  familyFamilyId: number;
  familyName: string;
  familyParent1: number;
  familyParent2: number;
  familyGroup: number;

  @select('shared') sharedObs;

  constructor(private ngRedux: NgRedux<GlobalState>,
              private homeLanding: LandingComponent,
              private sharedActionCreators: SharedActionCreators,
              private wisheseActionCreators: WishesActionCreators,
              private modal: ModalTemplateComponent) { }

  async ngOnInit() {
    await this.ngRedux.dispatch(this.sharedActionCreators.getAdmin());

    this.sharedObs.subscribe((result: ISharedState) => {
      this.appInitialized = result.appInitialized;
      this.edwUsers = result.adminInfo.edwUsers;
      this.wishesUsers = result.adminInfo.wishesUsers;
      this.wishesFamilies = result.adminInfo.wishesFamilies;
    });

    if (!this.appInitialized) {
      await this.homeLanding.initializeApp();
    } else {
      console.log('app initialized');
    }
  }

  onCornwalliaEditClick(userid: number, email: string, admin: number, wishes: number, lan: number, calendar: number, firstName: string, lastName: string, auth0Id: string) {
    this.cornwalliaUserId = userid;
    this.cornwalliaEmail = email;
    this.cornwalliaAdmin = admin;
    this.cornwalliaWishes = wishes;
    this.cornwalliaLan = lan;
    this.cornwalliaCalendar = calendar;
    this.cornwalliaFirstName = firstName;
    this.cornwalliaLastName = lastName;
    this.cornwalliaAuth0Id = auth0Id;
    this.modal.openModal('editCornwalliaUser');
  }

  cancelCornwalliaEditClick() {
    this.modal.closeModal('editCornwalliaUser');
    this.cornwalliaUserId = null;
    this.cornwalliaEmail = null;
    this.cornwalliaAdmin = null;
    this.cornwalliaWishes = null;
    this.cornwalliaLan = null;
    this.cornwalliaCalendar = null;
    this.cornwalliaFirstName = null;
    this.cornwalliaLastName = null;
    this.cornwalliaAuth0Id = null;
  }

  async updateCornwalliaUser(userid: number, email: string, admin: number, wishes: number, lan: number, calendar: number, firstName: string, lastName: string, auth0Id: string) {
    if (userid && email && admin !== null && wishes !== null && lan !== null && calendar !== null && firstName && lastName && auth0Id) {
      this.modal.closeModal('editCornwalliaUser');
      await this.ngRedux.dispatch(this.sharedActionCreators.updateEdwUser(userid, email, admin, wishes, lan, calendar, firstName, lastName, auth0Id));
      await this.ngRedux.dispatch(this.sharedActionCreators.getAdmin());
      this.cornwalliaUserId = null;
      this.cornwalliaEmail = null;
      this.cornwalliaAdmin = null;
      this.cornwalliaWishes = null;
      this.cornwalliaLan = null;
      this.cornwalliaCalendar = null;
      this.cornwalliaFirstName = null;
      this.cornwalliaLastName = null;
      this.cornwalliaAuth0Id = null;
    } else {
      alert('Please fill out all required fields');
    }
  }

  onWishesUsersEditClick(userId: number, edwUserId: number, familyId: number, isParent: number, firstName: string,
                         lastName: string, isAdmin: number, birthday: string, anniversary: string, group1: number, group2: number, group3: number) {
    this.wishesUserId = userId;
    this.wishesEdwUserId = edwUserId;
    this.wishesFamilyId = familyId;
    this.wishesParent = isParent;
    this.wishesFirstName = firstName;
    this.wishesLastName = lastName;
    this.wishesIsAdmin = isAdmin;
    this.wishesBirthday = birthday;
    this.wishesAnniversary = anniversary;
    this.wishesGroup1 = group1;
    this.wishesGroup2 = group2;
    this.wishesGroup3 = group3;
    this.modal.openModal('editWishesUser');
  }

  cancelWishesUsersEdit() {
    this.modal.closeModal('editWishesUser');
    this.wishesUserId = null;
    this.wishesEdwUserId = null;
    this.wishesFamilyId = null;
    this.wishesParent = null;
    this.wishesFirstName = null;
    this.wishesLastName = null;
    this.wishesIsAdmin = null;
    this.wishesBirthday = null;
    this.wishesAnniversary = null;
    this.wishesGroup1 = null;
    this.wishesGroup2 = null;
    this.wishesGroup3 = null;
  }

  async updateWishesUser(userId: number, edwUserId: number, familyId: number, isParent: number, firstName: string,
    lastName: string, isAdmin: number, birthday: string, anniversary: string, group1: number, group2: number, group3: number) {
      if (userId && familyId && isParent !== null && firstName && lastName && isAdmin !== null && birthday && group1 !== null && group2 !== null && group3 !== null) {
        this.modal.closeModal('editWishesUser');
        await this.ngRedux.dispatch(this.wisheseActionCreators.updateWishesUser(userId, edwUserId, familyId, isParent, firstName, lastName, isAdmin, birthday, anniversary, group1, group2, group3));
        await this.ngRedux.dispatch(this.sharedActionCreators.getAdmin());
        this.wishesUserId = null;
        this.wishesEdwUserId = null;
        this.wishesFamilyId = null;
        this.wishesParent = null;
        this.wishesFirstName = null;
        this.wishesLastName = null;
        this.wishesIsAdmin = null;
        this.wishesBirthday = null;
        this.wishesAnniversary = null;
        this.wishesGroup1 = null;
        this.wishesGroup2 = null;
        this.wishesGroup3 = null;
      } else {
        alert('Please fill out all required fields');
      }
  }

  onWishesFamilyClick(familyId: number, familyName: string, parent1: number, parent2: number, familyGroup: number) {
    this.familyFamilyId = familyId;
    this.familyName = familyName;
    this.familyParent1 = parent1;
    this.familyParent2 = parent2;
    this.familyGroup = familyGroup;
    this.modal.openModal('editFamily');
  }

  cancelWishesFamilyEdit() {
    this.modal.closeModal('editFamily');
    this.familyFamilyId = null;
    this.familyName = null;
    this.familyParent1 = null;
    this.familyParent2 = null;
    this.familyGroup = null;
  }

  async updateWishesFamily (familyId: number, familyName: string, parent1: number, parent2: number, familyGroup: number) {
    if (familyId && familyName && parent1 && familyGroup) {
      this.modal.closeModal('editFamily');
      await this.ngRedux.dispatch(this.wisheseActionCreators.updateWishesFamily(familyId, familyName, parent1, parent2, familyGroup));
      await this.ngRedux.dispatch(this.sharedActionCreators.getAdmin());
      this.familyFamilyId = null;
      this.familyName = null;
      this.familyParent1 = null;
      this.familyParent2 = null;
      this.familyGroup = null;
    } else {
      alert('Please fill out all required fields')
    }
  }

  onResize(event) {
    this.innerWidth =  event.target.innerWidth;
   }
}
