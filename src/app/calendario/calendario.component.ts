import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
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
    this._eventoService.getEventos().subscribe(data => {
      this.eventos = [];
      data.forEach((element: any) => {
        let urlImagen = element.payload.doc.data().imgUrl ?? 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png';
        this.eventos.push({
          id: element.payload.doc.id,
          url: urlImagen,
          ...element.payload.doc.data()
        })
      });
    });
  }

  mostrarEditar = (opcion: string, eventoId: any) => {
    const editarContainer: any = document.getElementById(opcion);
    editarContainer.style.display = 'flex';
    this.eventoElegidoEditar = eventoId;
  }

  modificarEvento = (opcion: string) => {
    let obj = {};
    
    if (opcion == 'nombre') {
      obj = {
        nombre: this.editarEvento.value.nombre
      };
    }
    else if (opcion == 'fecha') {
      const fechaEvento: string= new Date(this.editarEvento.value.fecha).toString();
      obj = {
        fecha: fechaEvento
      };
    }
    else {
      obj = {
        descripcion: this.editarEvento.value.descripcion
      };
    }

    this._eventoService.actualizarEvento(this.eventoElegidoEditar, obj).then(() => {
      console.log("Evento editado");
      alert("Evento editado");
      this.router.navigate(['/principal'])
    }).catch(error => {
      console.log(error);
    })
  }

  eliminarEvento = (eventoId: any) => {
    this._eventoService.eliminarEvento(eventoId).then(() => {
      console.log("Evento eliminado");
      alert("Evento eliminado");
    }).catch(error => {
      console.log(error);
    })
  }
}

