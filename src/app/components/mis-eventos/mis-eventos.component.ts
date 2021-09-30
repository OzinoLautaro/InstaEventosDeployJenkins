import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css']
})
export class MisEventosComponent implements OnInit {

  misEventos: any = [];

  eventoElegido: string = "";

  opcionElegidaEditar: string = "";

  editarEventoForm: FormGroup;

  constructor(private fb: FormBuilder, private _eventoService: EventoService, private _oauth: OauthService, private router: Router) {
    this.editarEventoForm = this.fb.group({
      data: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._oauth.getUser().subscribe(data => {
      this._eventoService.getEventos().subscribe(res => {
        this.misEventos = [];
        for (let evento of res) {
          if (evento.payload.doc.data().idCreador == data.id) {
            let fecha: Date = evento.payload.doc.data().fecha.toDate();
            let date: string = fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate().toString();
            let mes: string = fecha.getMonth() < 10 ? '0' + fecha.getMonth() : fecha.getMonth().toString();
            let hora: string = fecha.getHours() < 10 ? '0' + fecha.getHours() : fecha.getHours().toString();
            let minutos: string = fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes().toString();
            let segundos: string = fecha.getSeconds() < 10 ? '0' + fecha.getSeconds() : fecha.getSeconds().toString();
            let fechaArreglada: string = fecha.getFullYear() + '-' + mes + '-' + date + ' ' + hora + ':' + minutos + ':' + segundos;
            this.misEventos.push({
              id: evento.payload.doc.id,
              fechaArreglada,
              ...evento.payload.doc.data()
            });
          }
        }
      });
    });
  }

  mostrarCartelBorrar = (idEvento: string) => {
    const cartelBorrar: any = document.querySelector(".borrar-cartel-fondo");
    cartelBorrar.style.display = "flex";
    this.eventoElegido = idEvento;
  }

  cerrarCartelBorrar = () => {
    const cartelBorrar: any = document.querySelector(".borrar-cartel-fondo");
    cartelBorrar.style.display = "none";
    this.eventoElegido = "";
  }

  borrarEvento = () => {
    const cartelBorrar: any = document.querySelector(".borrar-cartel-fondo");
    cartelBorrar.style.display = "none";
    this._eventoService.eliminarEvento(this.eventoElegido).then(() => {
      console.log("Evento borrado correctamente");
    }).catch(error => {
      console.log(error);
    })
    this.eventoElegido = "";
    const cartelBorradoCorrectamente: any = document.querySelector(".borrado-correctamente");
    cartelBorradoCorrectamente.style.display = "block";
    setTimeout(() => {
      cartelBorradoCorrectamente.style.display = "none";
    }, 3000)
  }

  mostrarCartelEditar = (idEvento: string, opcion: string) => {
    this.opcionElegidaEditar = opcion;
    const cartelEditar: any = document.querySelector(".editar-cartel-fondo");
    cartelEditar.style.display = "flex";
    this.eventoElegido = idEvento;
  }

  cerrarCartelEditar = () => {
    const cartelEditar: any = document.querySelector(".editar-cartel-fondo");
    cartelEditar.style.display = "none";
    this.eventoElegido = "";
    this.opcionElegidaEditar = "";
  }

  editarEvento = () => {
    
    if (!this.editarEventoForm.value.data) return;

    const cartelEditar: any = document.querySelector(".editar-cartel-fondo");
    cartelEditar.style.display = "none";

    let obj = {};
    if (this.opcionElegidaEditar == 'nombre') {
      obj = {
        nombre: this.editarEventoForm.value.data
      }
    }
    else if (this.opcionElegidaEditar == 'descripcion') {
      obj = {
        descripcion: this.editarEventoForm.value.data
      }
    }
    else if (this.opcionElegidaEditar == 'fecha') {
      const fecha: Date = new Date(this.editarEventoForm.value.data);
      obj = {
        fecha
      }
    }
    else return;
    this._eventoService.actualizarEvento(this.eventoElegido, obj).then(() => {
      console.log("Evento editado correctamente");
    }).catch(error => {
      console.log(error);
    })
    this.eventoElegido = "";
    this.opcionElegidaEditar = "";

    const cartelEditadoCorrectamente: any = document.querySelector(".editado-correctamente");
    cartelEditadoCorrectamente.style.display = "block";
    setTimeout(() => {
      cartelEditadoCorrectamente.style.display = "none";
    }, 3000)
  }
}
