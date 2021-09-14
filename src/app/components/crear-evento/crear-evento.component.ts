import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { OauthService } from 'src/app/services/oauth.service';
import { DISCORD_LOGIN_URL } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';

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

  constructor(private _oauth: OauthService, private fb: FormBuilder, private _eventoService: EventoService, private router: Router, private storage: AngularFireStorage) {
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
            for(let guild of data){
              if(guild.members.getUser[this].id == 829037977640501259){
                let urlImagen = guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png';
                this.misServers.push({
                  ...guild,
                  userIcon: urlImagen
                });
              }
            }
          }
        }
      })
      this._oauth.getUser().subscribe(data => {
        this.userId = data.id;
      })
    }
  }

  onUpload(e:any){
  //console.log('subir', e.target.files[0])
  const id = Math.random().toString(36).substring(2);
  const file = e.target.files[0];
  const filePath = `uploads/fotoEvento_${id}`;
  const ref  = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);
  } 

  ngAfterViewInit(): void {
    if (this.isLoggedIn) this.mostrarElegirServer();
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
  }

  agregarEvento = () => {
    this.submitted = true;
    if(this.crearEvento.invalid) return;

    const fechaEvento: string= this.crearEvento.value.fecha;

    const obj = {
      idCreador: this.userId,
      idServidor: this.serverElegido,
      nombre: this.crearEvento.value.nombre,
      fecha: fechaEvento,
      descripcion: this.crearEvento.value.descripcion
      
    }
    
    this._eventoService.agregarEvento(obj).then(() => {
      console.log("Evento agregado");
      alert("Evento agregado");
      this.router.navigate(['/principal']);
    }).catch(error => {
      console.log(error);
    })
  }
}
