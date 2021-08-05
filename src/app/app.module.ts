import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { ComandosComponent } from './comandos/comandos.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { CalendarioComponent } from './calendario/calendario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';
import { MisEventosComponent } from './components/mis-eventos/mis-eventos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    ComandosComponent,
    PrincipalComponent,
    CalendarioComponent,
    LoginComponent,
    NavbarComponent,
    CrearEventoComponent,
    MisEventosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(env.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
