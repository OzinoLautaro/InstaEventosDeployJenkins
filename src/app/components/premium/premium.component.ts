import { MercadopagoService } from './../../services/mercadopago/mercadopago.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

    constructor( private _mercadopago: MercadopagoService, private router: Router ) {

    }

    ngOnInit(): void {
        if (localStorage.getItem('premium')) this.router.navigate(['principal']);;
        this.getPreferences();
    }

    mostrarBoton = () => {
        
        const mp = new MercadoPago('TEST-a535f7cd-0217-4c82-8f48-04793bebfc27', {locale: 'es-AR'});

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
