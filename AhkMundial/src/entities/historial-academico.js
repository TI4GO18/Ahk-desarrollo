export class HistorialAcademico{

    factorMateria = 0.5
    cantMateriasCursadas = 0
    notasAprobadas = []

    agregarMateriaCursada(cant){
        this.cantMateriasCursadas += cant;
    }

    agregarMateriaAprobada(nota){
        this.notasAprobadas.push(nota);
    }

    chancesPorMateriasCursadas(){
        return this.factorMateria * this.cantMateriasCursadas;
    }

    chancesPorMateriasAprobadas(){
        return this.notasAprobadas.reduce((total, nota) => total + (nota * this.factorMateria), 0);
    }
}
