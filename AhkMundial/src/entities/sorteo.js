export class Sorteo{
    participantes=[];

AgregarParticipante(){

}

CantidadParticipantesCategoria(Categoria){
this.participantes.filter(p =>p.categoria = Categoria).length();
    }

}