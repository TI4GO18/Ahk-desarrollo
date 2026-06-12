export class Participante{
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
    tecno

    

    chances(){
    let cant = 0
    cant += participante.referidos.length();
    return cant
    
}
    invitarParticipante(nombre,dni,email){
        const nombre = new Referido(nombre, dni, email);
        
    }
    esReferido(){  
    return this.referencia !== null
  }

}