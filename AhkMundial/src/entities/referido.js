import { Participante } from './participante.js';
import { AlumnoAhk } from './alumno-ahk.js';
import { NotifEmail } from './notif-email.js';

export class Referido{
    constructor(nombre, dni, email, referencia){
        this.nombre = nombre;
        this.dni = dni;
        this.email = email;
        this.referencia = referencia;
    }
    nombre
    dni
    mail
    referencia
    fechaDeAceptacion
    participante
  aceptarInvitacion(esAHK, esTecno){
    this.fechaDeAceptacion = new Date();
    if(esAHK){
        this.participante = new AlumnoAhk(this.nombre, this.dni, this.email);
    }
    else{
        this.participante = new Participante(this.nombre, this.dni, this.email, esTecno);
    }

    this.notificarAceptacion();
  }

  notificarAceptacion(){
    const apellido = this.participante.apellido ? ` ${this.participante.apellido}` : '';
    const mensaje = `${this.nombre}${apellido} acepto tu invitacion`;
    const notificacion = new NotifEmail();

    notificacion.enviar(this.referencia.email, mensaje).catch(error => {
        console.log('No se pudo enviar la notificacion:', error);
    });
  }
}
