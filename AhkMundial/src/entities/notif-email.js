import 'dotenv/config';
import emailjs from '@emailjs/nodejs';
import { Notificacion } from './notificacion.js';

export class NotifEmail extends Notificacion {
  async enviar(destinatario, mensaje) {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      { to_email: destinatario, message: mensaje },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );
  }
}