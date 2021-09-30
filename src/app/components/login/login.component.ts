import { SuscripcionService } from './../../services/suscripcion/suscripcion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId: any = "";

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private _oauthService: OauthService, private _premium: SuscripcionService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async params => {

      await params['code'] ?? this.router.navigate(['/']);

      await this._oauthService.getToken(params['code']).toPromise().then(data => {
        localStorage.setItem('token', data.access_token);
      });

      /* await this._oauthService.getUser().toPromise().then(async data => {

        this.userId = data.id;
        
        this._premium.getSubscripciones().subscribe(data => {
          for (let element of data) {
            if ( element.payload.doc.data().idUsuario == this.userId ) {
              let fecha_final = new Date(element.payload.doc.data().fechaFinal);
              if (fecha_final.getTime() > Date.now()) {
                localStorage.setItem('premium', 'true');
              }
              window.location.href = '/principal';
            }
          }
          window.location.href = '/principal';
        });
      }); */
      
      window.location.href = '/principal';
    })
  }

}
