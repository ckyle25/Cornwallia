import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
   }

  ngOnInit() {
  }

}
