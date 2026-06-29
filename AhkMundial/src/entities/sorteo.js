export class Sorteo{
    participantes=[];

AgregarParticipante(){

}

CantidadParticipantesCategoria(Categoria){
return this.participantes.filter(p =>p.categoria === Categoria).length;
    }

}