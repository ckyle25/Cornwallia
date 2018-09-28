import { Component, OnInit, Input, Injectable } from '@angular/core';

@Injectable()
@Component({
  selector: 'modal-template',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.scss']
})
export class ModalTemplateComponent implements OnInit {

  @Input() modalID;
  modal: any;

  constructor() { }

  ngOnInit() {
  }

  openModal(id) {
    this.modal = document.getElementById(id);
    this.modal.style.display = 'block';
  }

  closeModal(id) {
    this.modal = document.getElementById(id);
    this.modal.style.display = 'none';
  }

}
