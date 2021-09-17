import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { OauthService } from '../oauth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscripcionService {

  constructor(private firestore: AngularFirestore, private _oauth: OauthService) { }

  agregarSubscripcion(obj: any): Promise<any> {
    return this.firestore.collection('premium').add(obj);
  }

  getSubscripciones(): Observable<any> {
    return this.firestore.collection('premium').snapshotChanges();
  }

  async isPremium(): Promise<any> {
    
    let userId: any = "";

    let premiumPromise: Promise<any>;

    let subPromise: Promise<any>;

    await this._oauth.getUser().toPromise().then(res => {
      userId = res.id;
    })

    subPromise = new Promise(async resolve => {
      this.getSubscripciones().subscribe(data => {
        resolve(data);
      })
    })
    
    premiumPromise = new Promise(async (resolve, reject) => {

      let subs: any = [];

      await subPromise.then(data => subs.push(...data));

      for ( let element of subs ) {
        if ( element.payload.doc.data().idUsuario == userId ) {
          resolve(true);
        }
      }

      resolve(false);

    })

    return premiumPromise;

  }

}
