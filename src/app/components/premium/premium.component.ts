import { MercadopagoService } from './../../services/mercadopago/mercadopago.service';
import { Component, OnInit } from '@angular/core';

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

    constructor( private _mercadopago: MercadopagoService ) {

    }

    ngOnInit(): void {
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
                  container: '.tokenizer-container-1', // Indica el nombre de la clase donde se mostrará el botón de pago
                  label: 'Pagar', // Cambia el texto del botón de pago (opcional)
            }
        });


        // Boton del plan 2

        const tokenizer2 = mp.checkout({
            tokenizer: {
                totalAmount: 200,
                backUrl: 'http://localhost:3000/procesar-pago'
            }
        });

        tokenizer2.render({
            container: '.tokenizer-container-2',
            label: 'Comprar'
        });


        // Boton del plan 3

        const tokenizer3 = mp.checkout({
            tokenizer: {
                totalAmount: 750,
                backUrl: 'http://localhost:3000/procesar-pago'
            }
        });

        tokenizer3.render({
            container: '.tokenizer-container-3',
            label: 'Comprar'
        });

    }


    getPreferences = async () => {
        for (let i = 1; i < 4; i++) {
            await this._mercadopago.getPreferencesId(i).then(data => {
                if (i == 1) this.id1 = data.id;
                else if (i == 2) this.id2 = data.id;
                else if (i == 3) this.id3 = data.id;
                else return;
            });
        }

        this.mostrarBoton();
    }
}
