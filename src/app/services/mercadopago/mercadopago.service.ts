import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  constructor(private http: HttpClient) {}

  createPreference(opcion: number): Promise<any> {
    
    const headers = {
      Authorization: `Bearer TEST-2324857734347598-082713-9f853aaf8e2e07acda6b2325ef9317cd-230878580`
    }

    let preference;

    let preference1 = {
      items: [{
        title: "Plan de un mes",
        unit_price: 100,
        quantity: 1,
      }],
      back_urls: {
        "success": "http://localhost:4200/procesar-pago",
        "failure": "http://localhost:4200/procesar-pago",
        "pending": "http://localhost:4200/procesar-pago"
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [
            {
                id: "ticket"
            }
        ],
        installments: 1
      }
    };

    let preference2 = {
      items: [{
        title: "Plan de tres meses",
        unit_price: 200,
        quantity: 1,
      }],
      back_urls: {
        "success": "http://localhost:4200/procesar-pago",
        "failure": "http://localhost:4200/procesar-pago",
        "pending": "http://localhost:4200/procesar-pago"
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [
            {
                id: "ticket"
            }
        ],
        installments: 1
      }
    };

    let preference3 = {
      items: [{
        title: "Plan de un año",
        unit_price: 750,
        quantity: 1,
      }],
      back_urls: {
        "success": "http://localhost:4200/procesar-pago",
        "failure": "http://localhost:4200/procesar-pago",
        "pending": "http://localhost:4200/procesar-pago"
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [
            {
                id: "ticket"
            }
        ],
        installments: 1
      }
    };

    if (opcion == 1) preference = preference1;
    else if (opcion == 2) preference = preference2;
    else if (opcion == 3) preference = preference3;

    return this.http.post('https://api.mercadopago.com/checkout/preferences', preference, {headers}).toPromise();
  }

  getPaymentData(id: any): Observable<any> {
    const headers = {
      Authorization: `Bearer TEST-2324857734347598-082713-9f853aaf8e2e07acda6b2325ef9317cd-230878580`
    }
    return this.http.get(`https://api.mercadopago.com/v1/payments/${id}`, {headers});
  }
}
