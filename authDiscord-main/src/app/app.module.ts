import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { ComandosComponent } from './comandos/comandos.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    ComandosComponent,
    PrincipalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
