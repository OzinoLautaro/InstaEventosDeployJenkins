import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { ComandosComponent } from './components/comandos/comandos.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { CalendarioComponent } from './components/calendario/calendario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';
import { MisEventosComponent } from './components/mis-eventos/mis-eventos.component';
import { PremiumComponent } from './components/premium/premium.component';
import { ProcesarPagoComponent } from './components/procesar-pago/procesar-pago.component';
import { CalendarioPublicoComponent } from './components/calendario-publico/calendario-publico.component';



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
    MisEventosComponent,
    PremiumComponent,
    ProcesarPagoComponent,
    CalendarioPublicoComponent

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
