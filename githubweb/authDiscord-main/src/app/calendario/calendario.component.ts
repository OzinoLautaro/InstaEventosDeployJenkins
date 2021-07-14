import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  eventos: any[] = [];
  constructor(private _eventoService: EventoService) { }
  

  ngOnInit(): void {
    this.getEventos();
  }
getEventos(){
  this._eventoService.getEventos().subscribe(data => {
    this.eventos = [];
    data.forEach((element: any) => {
      this.eventos.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      })
    });
  });
}
}

