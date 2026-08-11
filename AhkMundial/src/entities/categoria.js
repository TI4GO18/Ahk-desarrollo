export class Categoria{

    costo
    refNecesarios
    inscriptos

    multiplicadorChances(){
    }

    cambiarCosto(nuevoCosto){
        this.costo = nuevoCosto;
    }

    cambiarRefNecesarios(nuevoValor){
        this.refNecesarios = nuevoValor;
    }
}