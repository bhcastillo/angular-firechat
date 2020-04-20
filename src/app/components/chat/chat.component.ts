import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [],
})
export class ChatComponent implements OnInit {
  mensaje: string = '';
  elemento: any;
  constructor(public _cs: ChatService) {
    this._cs.CargarMensajes().subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }
  enviarMensaje() {
    console.log(this.mensaje);
    if (this.mensaje.length === 0) {
      return;
    }
    this._cs
      .agregarMensaje(this.mensaje)
      .then(() => (this.mensaje = ''))
      .catch(() => console.error('error al enviar'));
  }
}
