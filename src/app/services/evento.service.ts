import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
    
  constructor(private firestore: AngularFirestore) { }

  getEventos(): Observable<any> {
    return this.firestore.collection('eventos', ref => ref.orderBy('fecha', 'asc')).snapshotChanges();
  }

  agregarEvento(evento: any): Promise<any> {
    return this.firestore.collection('eventos').add(evento);
  }

  eliminarEvento(id: string): Promise<any> {
    return this.firestore.collection('eventos').doc(id).delete();
  }

  actualizarEvento(id: any, data:any): Promise<any> {
    return this.firestore.collection('eventos').doc(id).update(data);
  }
}
