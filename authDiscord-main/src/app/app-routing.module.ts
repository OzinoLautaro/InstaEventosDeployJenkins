import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarioComponent } from './calendario/calendario.component';
import {ComandosComponent} from './comandos/comandos.component'
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {path:'calendario', component:CalendarioComponent},
  {path:'comandos', component:ComandosComponent},
  {path:'principal', component:PrincipalComponent},
  {path:'',redirectTo: '/principal',pathMatch:'full'}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
