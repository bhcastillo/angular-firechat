import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) {}
  CargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats',ref => ref.orderBy('fecha','desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats =[];
        for (let mensaje of mensajes){
          this.chats.unshift(mensaje)
        }
        return this.chats
       //this.chats = mensajes;
      })
    );
  }
  agregarMensaje(texto: string) {
    // TODO fatla el uid del usuaior
    let mensaje: Mensaje = {
      nombre: 'Brayan',
      mensaje: texto,
      fecha: new Date().getTime(),
    };
   return this.itemsCollection.add( mensaje )
  }
}
