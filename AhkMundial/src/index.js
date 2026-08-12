import { Sorteo } from './entities/sorteo.js';
import { Participante } from './entities/participante.js';
import { AlumnoAhk } from './entities/alumno-ahk.js';

const sorteo = new Sorteo();

const participante = new Participante('Juan', '30111222', 'tiagq06@gmail.com', false);
participante.completarDatos('Perez', 28, '1122334455', 'whatsapp');
sorteo.autoRegistrarParticipante(participante);

const alumno = new AlumnoAhk('Maria', '30222333', 'maria@mail.com');
alumno.categoria = sorteo.plata;
alumno.historialAcademico.agregarMateriaCursada(2);
alumno.historialAcademico.agregarMateriaAprobada(8);
alumno.historialAcademico.agregarMateriaAprobada(7);
sorteo.registrarParticipante(alumno);

const referido = sorteo.invitarReferido(participante, 'Pedro', '30333444', 'pedro@mail.com');

sorteo.autoRegistrarParticipante(new Participante('Pedro', '30333444', 'pedro@mail.com', false));

referido.aceptarInvitacion(false, true);
referido.participante.completarDatos('Gomez', 22, '1155667788', 'whatsapp');
sorteo.registrarParticipante(referido.participante);

sorteo.chequearAscensos();

console.log('Cantidad de participantes:', sorteo.participantes.length);
console.log('Probabilidad de Juan:', participante.consultarProbabilidad(sorteo));
console.log('Probabilidad de Maria:', alumno.consultarProbabilidad(sorteo));

console.log('1. Referidos convertidos de Juan:', sorteo.cantidadReferidosConvertidos(participante));
console.log('2. Chances discriminadas de Maria:', sorteo.chancesDiscriminadas(alumno));
console.log('3. Inscriptos por categoria:', sorteo.inscriptosPorCategoria());
console.log('4. Participante con mas chances:', sorteo.participanteConMasChances().nombre);
console.log('5. Referidos aceptados hoy:', sorteo.referidosAceptadosEntre(new Date(2000, 0, 1), new Date(2100, 0, 1)));
console.log('6. Cantidad por origen:', sorteo.cantidadPorOrigen());
console.log('7. Promedio de chances en plata:', sorteo.promedioChancesPorCategoria(sorteo.plata));
console.log('8. Materias de Maria:', sorteo.materiasDeAlumno(alumno));
console.log('9. Evolucion diaria de inscriptos:', sorteo.evolucionDiaria());
console.log('10. Ascensos por categoria:', sorteo.cantidadAscensosPorCategoria());
