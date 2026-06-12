export class AlumnoAhk extends Participante{
    
    cantMateriasRegularizadas
    cantMateriasAprobadas
    notasAprobadas = []
    
    factorMateria = 0.5;

    chances(){
    let cant = 0;
   cant += (factorMateria*cantMateriasRegularizadas);
   notasAprobadas.forEach(nota=> cant+= (nota*factorMateria));
  cant +=  this.referidos.filter(r=> r.participante.institucion === "AHK").length() * 2;
  cant +=  this.referidos.filter(r=> r.participante.tecno).length();
  cant += this.referidos.filter(r=> r.participante.institucion != "AHK" && r.participante.tecno === false).length();

  return cant
}
}