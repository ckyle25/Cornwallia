import { Component, OnInit } from '@angular/core';
import { ModalTemplateComponent } from '../../shared/modal-template/modal-template.component';

@Component({
  selector: 'request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.scss']
})
export class RequestAccessComponent implements OnInit {
  messageContent: string;

  constructor(
    public modal: ModalTemplateComponent
  ) { }

  ngOnInit() {

  }

  sendEmail() {
    this.modal.openModal('accessEmailSent');
    this.messageContent = '';
  }
}
