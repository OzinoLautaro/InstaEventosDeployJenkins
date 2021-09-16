import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscripcionService {

  constructor(private firestore: AngularFirestore) { }

  agregarSubscripcion(obj: any): Promise<any> {
    return this.firestore.collection('premium').add(obj);
  }

  getSubscripciones(): Observable<any> {
    return this.firestore.collection('premium').snapshotChanges();
  }
}
