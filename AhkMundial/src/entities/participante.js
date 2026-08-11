import { Calculadora } from './calculadora.js';

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
    

    

    chancesPorReferidos(){
        return this.referidos.filter(r => r.participante).length * 1;
    }

    chancesPorMaterias(){
        return 0;
    }

    esReferido(){
        return this.referencia !== null
    }

    consultarProbabilidad(sorteo){
        const calculadora = new Calculadora();
        return calculadora.calcularProbabilidad(this, sorteo);
    }
}