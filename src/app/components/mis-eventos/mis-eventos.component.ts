import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css']
})
export class MisEventosComponent implements OnInit {

  misEventos: any = [];

  userId: any = "";

  constructor(private _eventoService: EventoService, private _oauth: OauthService) { }

  ngOnInit(): void {
    this._oauth.getUser().subscribe(data => {
      this.userId = data.id;
    });
    this._eventoService.getEventos().subscribe(res => {
      for (let evento of res) {
        if (evento.payload.doc.data().idCreador == this.userId) {
          this.misEventos.push({
            id: evento.payload.doc.id,
            ...evento.payload.doc.data()
          });
        }
      }
    });
  }

}
