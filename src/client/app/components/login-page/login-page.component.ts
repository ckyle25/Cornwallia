import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginURL = `${environment.serverUrl}auth`;

  changingText: string = 'wish list?'

  pixelWidth: string;

  constructor() {

   }

  ngOnInit() {
    this.pixelWidth = this.changingText.length * 5 + 'px';
  }

}
