import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario-publico.component.html',
  styleUrls: ['./calendario-publico.component.css']
})
export class CalendarioPublicoComponent implements OnInit {
  [x: string]: any;
  eventos: any[] = [];

  editarEvento: FormGroup;

  eventoElegidoEditar: any = "";
  
  constructor(private _eventoService: EventoService, private fb: FormBuilder, private router: Router) {
    this.editarEvento = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }
  

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos(){
    this._eventoService.getEventosPublicos().subscribe(data => {
      this.eventos = [];
      data.forEach((element:any) => {
        let urlImagen = element.payload.doc.data().imgUrl ?? 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png';
        let fecha: Date = element.payload.doc.data().fecha.toDate();
        let date: string = fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate().toString();
        let mes: string = fecha.getMonth() < 10 ? '0' + fecha.getMonth() : fecha.getMonth().toString();
        let hora: string = fecha.getHours() < 10 ? '0' + fecha.getHours() : fecha.getHours().toString();
        let minutos: string = fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes().toString();
        let segundos: string = fecha.getSeconds() < 10 ? '0' + fecha.getSeconds() : fecha.getSeconds().toString();
        let fechaArreglada: string = fecha.getFullYear() + '-' + mes + '-' + date + ' ' + hora + ':' + minutos + ':' + segundos;
        this.eventos.push({
          id: element.payload.doc.id,
          url: urlImagen,
          fechaArreglada,
          ...element.payload.doc.data()
        })
      });
    });
  }

  buscar(){
    if(this.nombre !=""){

    }else if (this.nombre== ""){
      this.ngOnInit();
    }
    this.eventos = this.eventos.filter(res=>{
      return res.nombre.toLocaleLowerCase().match(this.nombre.toLocaleLowerCase());
    });
  }
}

