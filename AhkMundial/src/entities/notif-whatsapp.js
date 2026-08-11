import { Notificacion } from './notificacion.js';

export class NotifWhatsapp extends Notificacion {
  async enviar(destinatario, mensaje) {
    console.log(`[WhatsApp] Para: ${destinatario} - Mensaje: ${mensaje}`);
  }
}
