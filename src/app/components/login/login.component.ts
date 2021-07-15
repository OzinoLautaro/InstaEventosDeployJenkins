import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private _oauthService: OauthService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async params => {

      await params['code'] ?? this.router.navigate(['/']);

      this._oauthService.getToken(params['code']).subscribe(data => {

        localStorage.setItem('token', data.access_token);

        window.location.href = '/principal';

      });

    })
  }

}
