import { SuscripcionService } from 'src/app/services/suscripcion/suscripcion.service';
import { MercadopagoService } from './../../services/mercadopago/mercadopago.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MP_PUBLIC_KEY } from '../../../environments/environment'

declare const MercadoPago: any;

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})

export class PremiumComponent implements OnInit {

    id1 = "";
    id2 = "";
    id3 = "";

    private publick_key: string;

    constructor( private _mercadopago: MercadopagoService, private router: Router, private _premium: SuscripcionService ) {
        this.publick_key = MP_PUBLIC_KEY;
    }

    ngOnInit(): void {
        this.getPreferences();
        this._premium.isPremium().then(res => {
            if (res) {
                this.router.navigate(['principal']);
            }
        })
    }

    mostrarBoton = () => {
        
        const mp = new MercadoPago(this.publick_key, {locale: 'es-AR'});

        // Boton del plan 1
        mp.checkout({
            preference: {
                id: this.id1
            },
            render: {
                container: '.cho-container-1',
                label: 'Comprar'
            }
        });

        // Boton del plan 2
        mp.checkout({
            preference: {
                id: this.id2
            },
            render: {
                container: '.cho-container-2',
                label: 'Comprar'
            }
        });

        // Boton del plan 3
        mp.checkout({
            preference: {
                id: this.id3
            },
            render: {
                container: '.cho-container-3',
                label: 'Comprar'
            }
        });
    }


    getPreferences = async () => {
        for (let i = 1; i < 4; i++) {
            await this._mercadopago.createPreference(i).then(data => {
                if (i == 1) this.id1 = data.id;
                else if (i == 2) this.id2 = data.id;
                else if (i == 3) this.id3 = data.id;
                else return;
            });
        }

        this.mostrarBoton();
    }
}
