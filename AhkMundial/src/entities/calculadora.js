export class Calculadora{

    calcularChances(participante){
        const chancesCategoria = participante.categoria.multiplicadorChances();
        const chancesBase = participante.chancesPorMaterias() + participante.chancesPorReferidos();

        return chancesCategoria * chancesBase;
    }

    calcularProbabilidad(participante, sorteo){
        const totalChances = sorteo.participantes.reduce(
            (total, p) => total + this.calcularChances(p),
            0
        );

        if(totalChances === 0){
            return 0;
        }

        return (this.calcularChances(participante) / totalChances) * sorteo.participantes.length;
    }
}
