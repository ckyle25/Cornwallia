import { Component, OnInit } from '@angular/core';
import { ModalTemplateComponent } from '../../shared/modal-template/modal-template.component';

@Component({
  selector: 'leave-feedback',
  templateUrl: './leave-feedback.component.html',
  styleUrls: ['./leave-feedback.component.scss']
})
export class LeaveFeedbackComponent implements OnInit {

  messageContent: string;

  constructor(
    public modal: ModalTemplateComponent
  ) { }

  ngOnInit() {

  }

  sendEmail() {
    this.modal.openModal('improvementEmailSent');
    this.messageContent = '';
  }
}
