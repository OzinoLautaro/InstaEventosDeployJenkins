import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  realizarPago = (opcion: number) => {
    console.log(opcion);
  }

}