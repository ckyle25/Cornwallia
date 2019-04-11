import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginURL = `${environment.serverUrl}auth`;

  options: string[] = ['wish list?', 'food storage tracking app?', 'family calendar?']

  changingText: string = this.options[0];
  speed: number = 50;
  i: number = 0;
  position: number = 0;

  constructor() {

   }

  ngOnInit() {
    this.typewriter();
  }

  typewriter() {
    if (this.i < this.changingText.length) {
      document.getElementById('text-change').innerHTML += this.changingText.charAt(this.i);
      this.i++
      setTimeout(() => this.typewriter(), 100)
    } else {
      setTimeout(() => this.deleteTypeWriter(), 3000)
    }
  }

  deleteTypeWriter() {
    if (this.changingText.length > 0) {
      this.changingText = this.changingText.slice(0, -1)
      document.getElementById('text-change').innerHTML = this.changingText;
      setTimeout(() => this.deleteTypeWriter(), 100)
    } else {
      this.position++;
      this.changeEnding();
      this.i = 0;
      this.typewriter();
    }
  }

  changeEnding() {
    this.changingText = this.options[this.position]
    if (this.position > 2) {
      this.position = 0;
      this.changingText = this.options[this.position]
    }
  }

}
