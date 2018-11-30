import { Component, OnInit } from '@angular/core';
import { ModalTemplateComponent } from '../../shared/modal-template/modal-template.component';
import { SharedService } from '../../services/shared/sharedServices';
import { NgRedux, select } from '@angular-redux/store';
import { IGlobalState } from '../../redux/rootReducer';

@Component({
  selector: 'leave-feedback',
  templateUrl: './leave-feedback.component.html',
  styleUrls: ['./leave-feedback.component.scss']
})
export class LeaveFeedbackComponent implements OnInit {

  messageContent: string;
  userName: string;

  @select(['shared']) sharedObs;

  constructor(
    public modal: ModalTemplateComponent,
    private sharedService: SharedService,
    private ngRedux: NgRedux<IGlobalState>
  ) { }

  ngOnInit() {
    this.sharedObs.subscribe(result => {
      this.userName = result.userObject.firstnameval;
    });
  }

  sendEmail() {
    this.sharedService.giveFeedback(this.messageContent, this.userName);
    this.modal.openModal('improvementEmailSent');
    this.messageContent = '';
  }
}
