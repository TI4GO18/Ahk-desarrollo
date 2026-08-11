import { Referido } from './referido.js';
import { Bronce } from './bronce.js';
import { Plata } from './plata.js';
import { Oro } from './oro.js';
import { AlumnoAhk } from './alumno-ahk.js';
import { Calculadora } from './calculadora.js';

export class Sorteo{
    participantes = [];
    bronce = new Bronce();
    plata = new Plata();
    oro = new Oro();
    ascensos = [];

    AgregarParticipante(participante){
        this.participantes.push(participante);
    }

    CantidadParticipantesCategoria(categoria){
        return this.participantes.filter(p => p.categoria === categoria).length;
    }

    existeParticipante(dni, email){
        for(let i = 0; i < this.participantes.length; i++){
            const participante = this.participantes[i];

            if(participante.dni === dni || participante.email === email){
                return true;
            }
        }

        return false;
    }

    existeReferido(dni, email){
        for(let i = 0; i < this.participantes.length; i++){
            const participante = this.participantes[i];

            for(let j = 0; j < participante.referidos.length; j++){
                const referido = participante.referidos[j];

                if(referido.dni === dni || referido.email === email){
                    return true;
                }
            }
        }

        return false;
    }

    invitarReferido(participanteQueInvita, nombre, dni, email){
        if(this.existeParticipante(dni, email) || this.existeReferido(dni, email)){
            throw new Error('La persona ya fue referida o ya es participante del sorteo');
        }

        const referido = new Referido(nombre, dni, email, participanteQueInvita);
        participanteQueInvita.referidos.push(referido);
        return referido;
    }

    registrarParticipante(participante){
        if(this.existeParticipante(participante.dni, participante.email)){
            throw new Error('Ya existe un participante con ese DNI o email');
        }

        if(!participante.categoria){
            participante.categoria = this.bronce;
        }

        if(!participante.fechaDeAceptacion){
            participante.fechaDeAceptacion = new Date();
        }

        this.AgregarParticipante(participante);
        return participante;
    }

    chequearAscensos(){
        const ascendidos = [];

        for(let i = 0; i < this.participantes.length; i++){
            const participante = this.participantes[i];
            const categoriaAnterior = participante.categoria;
            const cantReferidos = participante.referidos.length;

            if(cantReferidos >= this.oro.refNecesarios && participante.categoria !== this.oro){
                participante.categoria = this.oro;
                this.ascensos.push({ participante, de: categoriaAnterior, a: this.oro });
                ascendidos.push(participante);
            } else if(cantReferidos >= this.plata.refNecesarios && participante.categoria === this.bronce){
                participante.categoria = this.plata;
                this.ascensos.push({ participante, de: categoriaAnterior, a: this.plata });
                ascendidos.push(participante);
            }
        }

        return ascendidos;
    }

    cantidadReferidosConvertidos(participante){
        let cantidad = 0;

        for(let i = 0; i < participante.referidos.length; i++){
            if(participante.referidos[i].participante){
                cantidad += 1;
            }
        }

        return cantidad;
    }

    chancesDiscriminadas(participante){
        return {
            categoria: participante.categoria.multiplicadorChances(),
            materias: participante.chancesPorMaterias(),
            referidos: participante.chancesPorReferidos()
        };
    }

    inscriptosPorCategoria(){
        return {
            bronce: this.CantidadParticipantesCategoria(this.bronce),
            plata: this.CantidadParticipantesCategoria(this.plata),
            oro: this.CantidadParticipantesCategoria(this.oro)
        };
    }

    participanteConMasChances(){
        const calculadora = new Calculadora();
        let participanteConMasChances = null;
        let mayorCantidadDeChances = -1;

        for(let i = 0; i < this.participantes.length; i++){
            const participante = this.participantes[i];
            const chances = calculadora.calcularChances(participante);

            if(chances > mayorCantidadDeChances){
                mayorCantidadDeChances = chances;
                participanteConMasChances = participante;
            }
        }

        return participanteConMasChances;
    }

    referidosAceptadosEntre(desde, hasta){
        let cantidad = 0;

        for(let i = 0; i < this.participantes.length; i++){
            const participante = this.participantes[i];

            for(let j = 0; j < participante.referidos.length; j++){
                const fecha = participante.referidos[j].fechaDeAceptacion;

                if(fecha && fecha >= desde && fecha <= hasta){
                    cantidad += 1;
                }
            }
        }

        return cantidad;
    }

    cantidadPorOrigen(){
        let cantidadAhk = 0;
        let cantidadOtrasInstituciones = 0;

        for(let i = 0; i < this.participantes.length; i++){
            if(this.participantes[i] instanceof AlumnoAhk){
                cantidadAhk += 1;
            } else {
                cantidadOtrasInstituciones += 1;
            }
        }

        return { cantidadAhk, cantidadOtrasInstituciones };
    }

    promedioChancesPorCategoria(categoria){
        const calculadora = new Calculadora();
        let cantidadParticipantes = 0;
        let sumaChances = 0;

        for(let i = 0; i < this.participantes.length; i++){
            const participante = this.participantes[i];

            if(participante.categoria === categoria){
                cantidadParticipantes += 1;
                sumaChances += calculadora.calcularChances(participante);
            }
        }

        if(cantidadParticipantes === 0){
            return 0;
        }

        return sumaChances / cantidadParticipantes;
    }

    materiasDeAlumno(alumnoAhk){
        return {
            cursadas: alumnoAhk.historialAcademico.cantMateriasCursadas,
            aprobadas: alumnoAhk.historialAcademico.notasAprobadas.length
        };
    }

    evolucionDiaria(){
        const inscriptosPorDia = {};

        for(let i = 0; i < this.participantes.length; i++){
            const fecha = this.participantes[i].fechaDeAceptacion;
            const dia = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();

            if(!inscriptosPorDia[dia]){
                inscriptosPorDia[dia] = 0;
            }

            inscriptosPorDia[dia] += 1;
        }

        return inscriptosPorDia;
    }

    cantidadAscensosPorCategoria(){
        let cantidadBronceAPlata = 0;
        let cantidadPlataAOro = 0;

        for(let i = 0; i < this.ascensos.length; i++){
            const ascenso = this.ascensos[i];

            if(ascenso.de === this.bronce && ascenso.a === this.plata){
                cantidadBronceAPlata += 1;
            } else if(ascenso.de === this.plata && ascenso.a === this.oro){
                cantidadPlataAOro += 1;
            }
        }

        return { cantidadBronceAPlata, cantidadPlataAOro };
    }
}
