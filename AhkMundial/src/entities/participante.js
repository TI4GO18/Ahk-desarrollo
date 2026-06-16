export class Participante{
    constructor(nombre, dni, email, esTecno){
        this.nombre = nombre;
        this.dni = dni;
        this.email = email;
        this.esTecno = esTecno;
    }
    nombre
    apellido
    dni
    edad
    mail
    telefono
    categoria
    referencia
    fechaDeAceptacion
    referidos = [];
    medioPreferido
    esTecno
    

    

    chances(){
    let cant = 0
    cant += this.referidos.length;
    return cant
    
}
    invitarParticipante(nombre,dni,email){
        const nombre = new Referido(nombre, dni, email, this);
        
    }
    esReferido(){  
    return this.referencia !== null
  }

}