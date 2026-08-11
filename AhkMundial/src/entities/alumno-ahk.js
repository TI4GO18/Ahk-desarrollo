import { Participante } from './participante.js';
import { HistorialAcademico } from './historial-academico.js';

export class AlumnoAhk extends Participante{
  constructor(nombre, dni, email){
    super(nombre, dni, email, true);
    this.historialAcademico = new HistorialAcademico();
   }

    chancesPorReferidos(){
     const aceptados = this.referidos.filter(r => r.participante);
     let cantRef = 0;
     cantRef += aceptados.filter(r => r.participante instanceof AlumnoAhk).length * 2;
     cantRef += aceptados.filter(r => !(r.participante instanceof AlumnoAhk) && r.participante.esTecno).length * 1;
     cantRef += aceptados.filter(r => !(r.participante instanceof AlumnoAhk) && !r.participante.esTecno).length * 0.5;
      return cantRef
    }

    chancesPorMaterias(){
      return this.historialAcademico.chancesPorMateriasCursadas() + this.historialAcademico.chancesPorMateriasAprobadas();
    }
}