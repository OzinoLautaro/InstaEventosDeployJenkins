import { SuscripcionService } from 'src/app/services/suscripcion/suscripcion.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { OauthService } from 'src/app/services/oauth.service';
import { DISCORD_LOGIN_URL } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit, AfterViewInit {

  url = DISCORD_LOGIN_URL;

  isLoggedIn: boolean = false;

  misServers: any = [];

  serverElegido: any = "";

  userId: any = "";

  crearEvento: FormGroup;

  submitted: boolean = false;

  imgUrl: string = "";

  constructor(private _oauth: OauthService, private fb: FormBuilder, private _eventoService: EventoService, private router: Router, private storage: AngularFireStorage, private _premium: SuscripcionService) {
    this.isLoggedIn = localStorage.getItem('token') ? true : false;
    this.crearEvento = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.isLoggedIn) {
      this._oauth.getGuilds().subscribe(data => {
        for (let guild of data) {
          if ((guild.permissions & 0x0000000020) == 0x0000000020) {
            let urlImagen = guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : 'data:image/png;base64,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';
            this.misServers.push({
              ...guild,
              userIcon: urlImagen
            });
          }
        }
      })
      this._oauth.getUser().subscribe(data => {
        this.userId = data.id;
      });
    }
  }

  onUpload(e:any){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/fotoEvento_${id}`;
    const ref  = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(data => {
          this.imgUrl = data;
        });
      })
    ).subscribe();
  }

  ngAfterViewInit(): void {
    if (this.isLoggedIn) this.mostrarElegirServer();

    this._premium.isPremium().then(res => {
      if (!res) {
        this._eventoService.getEventos().subscribe(res => {
          for (let element of res) {
            if ( element.payload.doc.data().idCreador == this.userId ) {
              this.mostrarCartel();
              return;
            }
          }
        });
      }
    })
  }

  mostrarElegirServer = () => {
    if (this.isLoggedIn) {
      this.serverElegido = "";
      const circuloLogin: any = document.getElementById('circulo-1');
      const circuloServers: any = document.getElementById('circulo-2');
      const circuloEvento: any = document.getElementById('circulo-3');
      const stepLogin: any = document.querySelector('.login-container');
      const stepServer: any = document.querySelector('.servers-container');
      const stepEvento: any = document.querySelector('.evento-formulario');
      const pasoUno: any = document.querySelector('.step:first-child');
      const pasoDos: any = document.querySelector('.step:nth-child(2)');
      const pasoTres: any = document.querySelector('.step:last-child');
      circuloLogin.style.background = 'transparent';
      circuloServers.style.background = '#f66';
      circuloServers.style.cursor = 'default';
      circuloEvento.style.background = 'transparent';
      stepLogin.style.display = 'none';
      stepServer.style.display = 'grid';
      stepEvento.style.display = 'none';
      pasoUno.style.color = '#3337';
      pasoDos.style.color = '#212121';
      pasoTres.style.color = '#3337';
    }
  }

  loginConDiscord = () => {
    window.location.href = this.url;
  }

  elegirServer = (serverId: any) => {
    const circuloLogin: any = document.getElementById('circulo-1');
    const circuloServers: any = document.getElementById('circulo-2');
    const circuloEvento: any = document.getElementById('circulo-3');
    const stepLogin: any = document.querySelector('.login-container');
    const stepServer: any = document.querySelector('.servers-container');
    const stepEvento: any = document.querySelector('.evento-formulario');
    const pasoUno: any = document.querySelector('.step:first-child');
    const pasoDos: any = document.querySelector('.step:nth-child(2)');
    const pasoTres: any = document.querySelector('.step:last-child');
    circuloLogin.style.background = 'transparent';
    circuloServers.style.background = 'transparent';
    circuloServers.style.cursor = 'pointer';
    circuloEvento.style.background = '#6fa';
    stepLogin.style.display = 'none';
    stepServer.style.display = 'none';
    stepEvento.style.display = 'flex';
    pasoUno.style.color = '#3337';
    pasoDos.style.color = '#3337';
    pasoTres.style.color = '#212121';
    this.serverElegido = serverId;
    this.submitted = false;
  }

  agregarEvento = () => {
    this.submitted = true;
    if(this.crearEvento.invalid) return;
    if(this.imgUrl == "") return;

    const fechaEvento: Date = new Date(this.crearEvento.value.fecha);

    const obj = {
      idCreador: this.userId,
      idServidor: this.serverElegido,
      nombre: this.crearEvento.value.nombre,
      fecha: fechaEvento,
      descripcion: this.crearEvento.value.descripcion,
      imgUrl: this.imgUrl,
      publico: true
    }
    
    this.mostrarCartelEventoCreado();
    
    this._eventoService.agregarEvento(obj).then(() => {
      console.log("Evento agregado");
    }).catch(error => {
      console.log(error);
    })
  }


  mostrarCartel = () => {
    const cartel: any = document.querySelector(".cartel-fondo");
    cartel.style.display = "flex";
  }

  mostrarCartelEventoCreado = () => {
    const cartel: any = document.querySelector(".cartel-fondo");
    cartel.style.display = "none";
    const cartelEventoCreado: any = document.querySelector(".cartel-fondo-evento-creado");
    cartelEventoCreado.style.display = "flex";
  }

}



