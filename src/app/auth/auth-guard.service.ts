import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DISCORD_LOGIN_URL } from 'src/environments/environment';
import { OauthService } from '../services/oauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  url = DISCORD_LOGIN_URL;

  constructor(public _oauth: OauthService, public router: Router) {}  
  
  canActivate(): boolean {
    if (!this._oauth.isLoggedIn()) {
      this.router.navigate(['principal']);
      window.location.href = this.url;
      return false;
    }
    return true;
  }
}
