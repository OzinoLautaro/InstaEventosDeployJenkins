import { Component, OnInit } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';
import { DISCORD_LOGIN_URL } from 'src/environments/environment';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styles: [
  ]
})
export class LoginButtonComponent implements OnInit {

  url = DISCORD_LOGIN_URL;

  userIcon: string = "";

  userName:string = "";

  constructor(public _oauth: OauthService) {
  }

  ngOnInit(): void {
    if (this._oauth.isLoggedIn()) {
      this._oauth.getUser().subscribe(res => {
        this.userIcon = res.avatar ? `https://cdn.discordapp.com/icons/${res.id}/${res.avatar}.png` : 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png';
        this.userName = res.username;
      })
    }
  }

  loginConDiscord = () => {
    window.location.href = this.url;
  }

}
