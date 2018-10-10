import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  logoutURL = `${environment.serverUrl}auth/logout`;

  constructor() { }

  ngOnInit() {
  }

  removeUserId() {
    localStorage.setItem('currentUserID', '');
  }

}
