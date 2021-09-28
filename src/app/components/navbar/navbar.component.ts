import { SuscripcionService } from 'src/app/services/suscripcion/suscripcion.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  constructor(private _premium: SuscripcionService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._premium.isPremium().then(res => {
      if (!res) {
        const premium_btn: any = document.querySelector('.premium-button');
        premium_btn.style.display = "block";
      }
    })
  }

}
