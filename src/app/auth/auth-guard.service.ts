import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OauthService } from '../services/oauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public _oauth: OauthService, public router: Router) {}  
  
  canActivate(): boolean {
    if (!this._oauth.isLoggedIn()) {
      this.router.navigate(['principal']);
      return false;
    }
    return true;
  }
}
