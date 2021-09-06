import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  constructor(private http: HttpClient) {}

  getPreferencesId(num_plan: number): Promise<any> {
    return this.http.get(`http://localhost:3000/preferenece/${num_plan}`).toPromise();
  }
}
