export class AlumnoAhk extends Participante{
  constructor(nombre, dni, email){
    super(nombre, dni, email);
    this.cantMateriasRegularizadas = 0;
    this.cantMateriasAprobadas = 0;
    this.notasAprobadas = [];
    this.factorMateria = 0.5;
   }
    chancesPorReferidos(){
     let cantRef = 0;
     cantRef +=  this.referidos.filter(r=> r.participante.institucion === "AHK").length * 2;
     cantRef +=  this.referidos.filter(r=> r.participante.esTecno).length();
     cantRef += this.referidos.filter(r=> r.participante.institucion != "AHK" && r.participante.esTecno === false).length;
      return cantRef
    }
    chancesPorMaterias(){
     let cantMaterias = 0;
     cantMaterias += (this.factorMateria*this.cantMateriasRegularizadas);
     this.notasAprobadas.forEach(nota=> cantMaterias+= (nota*this.factorMateria));
  
      return cantMaterias 
    }
}