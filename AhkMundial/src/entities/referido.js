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

    const notificacion = new NotifEmail();
    notificacion.enviar(this.referencia.email, `${this.nombre} acepto tu invitacion y ya es participante del sorteo`);
  }
}
