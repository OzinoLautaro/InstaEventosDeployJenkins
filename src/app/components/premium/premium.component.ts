import { Component, OnInit } from '@angular/core';

declare const MercadoPago: any;

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})

export class PremiumComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.mostrarBoton();
  }

  mostrarBoton = () => {
    
    const mp = new MercadoPago('TEST-a535f7cd-0217-4c82-8f48-04793bebfc27', {locale: 'es-AR'});


    // Boton del plan 1

    const tokenizer1 = mp.checkout({
        tokenizer: {
            totalAmount: 100,
            backUrl: 'https://localhost:4200/procesar-pago'
        }
    });

    tokenizer1.render({
        container: '.tokenizer-container-1',
        label: 'Comprar'
    });


    // Boton del plan 2

    const tokenizer2 = mp.checkout({
        tokenizer: {
            totalAmount: 200,
            backUrl: 'https://localhost:4200/procesar-pago'
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
            backUrl: 'https://localhost:4200/procesar-pago'
        }
    });

    tokenizer3.render({
        container: '.tokenizer-container-3',
        label: 'Comprar'
    });

  }


}
