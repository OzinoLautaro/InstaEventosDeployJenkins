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
        for (let evento of res) {
          if (evento.payload.doc.data().idCreador == data.id) {
            this.misEventos.push({
              id: evento.payload.doc.id,
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
    this.eventoElegido = "";
    this._eventoService.eliminarEvento(this.eventoElegido).then(() => {
      console.log("Evento borrado correctamente");
    }).catch(error => {
      console.log(error);
    })
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
      obj = {
        fecha: this.editarEventoForm.value.data
      }
    }
    else return;
    this._eventoService.actualizarEvento(this.eventoElegido, obj).then(() => {
      console.log("Evento editado correctamente");
      window.location.href = '/mis-eventos';
    }).catch(error => {
      console.log(error);
    })
    this.eventoElegido = "";
    this.opcionElegidaEditar = "";
  }
}
