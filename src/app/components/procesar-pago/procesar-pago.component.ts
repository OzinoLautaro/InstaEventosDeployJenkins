import { SubscripcionService } from './../../services/subscripcion/subscripcion.service';
import { OauthService } from 'src/app/services/oauth.service';
import { MercadopagoService } from './../../services/mercadopago/mercadopago.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-procesar-pago',
  templateUrl: './procesar-pago.component.html',
  styleUrls: ['./procesar-pago.component.css']
})
export class ProcesarPagoComponent implements OnInit {

  constructor( private _oauth: OauthService, private activatedRoute: ActivatedRoute, private router: Router, private _mercadopago: MercadopagoService, private _premium: SubscripcionService ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async params => {

      params['status'] == 'approved' ? console.log('Aprobado') : window.location.href = '/principal';

      if (localStorage.getItem('premium')) window.location.href = '/principal';

      this._oauth.getUser().subscribe(data => {
        let idUser = data.id;

        this._mercadopago.getPaymentData(params['payment_id']).subscribe(data => {
          let duracionPlan = 0;
          if (data.description == 'Plan de un mes') duracionPlan+=1;
          else if (data.description == 'Plan de tres meses') duracionPlan+=3;
          else if (data.description == 'Plan de un año') duracionPlan+=12;
          else this.router.navigate(['/']);
          let fechaInicial: any = new Date(data.date_approved);
          let fechaFinal: any = new Date(fechaInicial);
          fechaFinal.setMonth(fechaFinal.getMonth() + duracionPlan);
          fechaInicial= fechaInicial.toString();
          fechaFinal = fechaFinal.toString();
          let obj = {
            idUsuario: idUser,
            idPago: params['payment_id'],
            fechaInicial,
            fechaFinal
          }
          localStorage.setItem('premium', 'true');
          this._premium.agregarSubscripcion(obj)
            .then(data => window.location.href = '/principal')
        });

      });

      
    })
  }

}

//  http://localhost:4200/procesar-pago?collection_id=1240768077&collection_status=approved&payment_id=1240768077&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=3220090074&preference_id=230878580-081289b6-1603-4e64-a023-c770aee6e662&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
