import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { ComandosComponent } from './comandos/comandos.component'
import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {path:'calendario', component:CalendarioComponent},
  {path:'comandos', component:ComandosComponent},
  {path:'principal', component:PrincipalComponent},
  {path:'crear-evento', component:CrearEventoComponent},
  {path: 'login', component: LoginComponent},
  {path:'',redirectTo: '/principal',pathMatch:'full'},
  {path: '**', redirectTo: '/principal', pathMatch: 'full'}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
