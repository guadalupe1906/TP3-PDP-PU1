const prompt = require('prompt-sync')();

console.log("Hola, ¿qué deseas realizar?");

// ==================== CONSTRUCTOR ====================
function ListaDeTareas(titulo, descripcion, estado, dificultad, vencimiento) {
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.estado = estado;
  this.dificultad = dificultad;
  this.vencimiento = vencimiento;
}

// ==================== MÉTODOS PROTOTIPALES ====================
ListaDeTareas.prototype.verTareas = function() {
  console.log(`\nTítulo: ${this.titulo}`);
  console.log(`Descripción: ${this.descripcion}`);
  console.log(`Estado: ${this.estado}`);
  console.log(`Dificultad: ${this.dificultad}`);
  console.log(`Vencimiento: ${this.vencimiento}`);
  console.log("-----------------------------------");
};

ListaDeTareas.prototype.editarTarea = function(nuevoTitulo, nuevaDescripcion, nuevoEstado, nuevaDificultad, nuevoVencimiento) {
  this.titulo = nuevoTitulo;
  this.descripcion = nuevaDescripcion;
  this.estado = nuevoEstado;
  this.dificultad = nuevaDificultad;
  this.vencimiento = nuevoVencimiento;
};

// ==================== FUNCIONES AUXILIARES ====================
function mostrarTitulos(lista) {
  if (lista.length === 0) {
    console.log("No hay tareas para mostrar.");
  } else {
    lista.forEach((tarea, i) => console.log(`[${i + 1}] ${tarea.titulo}`));
  }
}

function buscarTareaPorTitulo(titulo) {
  return tareas.find(t => t.titulo.toLowerCase().trim() === titulo.toLowerCase().trim());
}

function validarEstado() {
  const estadosValidos = ["pendiente", "en curso", "terminada"];
  let estado;
  do {
    estado = prompt("Estado (pendiente / en curso / terminada): ").toLowerCase();
    if (!estadosValidos.includes(estado)) {
      console.log(" Estado inválido. Intenta nuevamente.");
    }
  } while (!estadosValidos.includes(estado));
  return estado;
}

function validarDificultad() {
  const dificultadesValidas = ["+--", "++-", "+++"];
  let dificultad;
  do {
    dificultad = prompt("Dificultad (+-- / ++- / +++): ");
    if (!dificultadesValidas.includes(dificultad)) {
      console.log(" Dificultad inválida. Intenta nuevamente.");
    }
  } while (!dificultadesValidas.includes(dificultad));
  return dificultad;
}

function validarFecha() {
  let fecha;
  const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
  do {
    fecha = prompt("Fecha de vencimiento (YYYY-MM-DD): ");
    if (!regexFecha.test(fecha)) {
      console.log(" Fecha inválida. Debe tener formato YYYY-MM-DD.");
      continue;
    }
    const hoy = new Date();
    const ingresada = new Date(fecha);
    if (isNaN(ingresada.getTime()) || ingresada < hoy) {
      console.log(" La fecha no puede ser anterior a hoy.");
      fecha = null;
    }
  } while (!fecha);
  return fecha;
}

// ==================== DATOS INICIALES ====================
const tarea1 = new ListaDeTareas("Aprender Html", "Hacer un curso de HTML", "pendiente", "+--", "2025-12-31");
const tarea2 = new ListaDeTareas("Aprender Css", "Hacer un curso de CSS", "en curso", "++-", "2025-11-15");
const tarea3 = new ListaDeTareas("Aprender Js", "Hacer un curso de JS", "pendiente", "+++", "2025-12-01");
const tarea4 = new ListaDeTareas("Aprender React", "Hacer un curso de React", "terminada", "+++", "2025-10-10");

let tareas = [tarea1, tarea2, tarea3, tarea4];

// ==================== PROGRAMA PRINCIPAL ====================
let eleccion;

do {
  console.log("\n===== MENÚ PRINCIPAL =====");
  console.log("[1] Ver mis tareas");
  console.log("[2] Buscar una tarea");
  console.log("[3] Agregar una tarea");
  console.log("[0] Salir");
  eleccion = prompt("Elige una opción: ");

  switch (eleccion) {

    // ---------- VER TAREAS ----------
    case "1":
      console.log("\n=== VER TAREAS ===");
      console.log("[1] Ver todas las tareas");
      console.log("[2] En curso");
      console.log("[3] Pendientes");
      console.log("[4] Terminadas");

      const eleccionVer = prompt("Elige una opción: ");
      let tareasFiltradas = [];

      switch (eleccionVer) {
        case "1":
          tareasFiltradas = tareas;
          break;
        case "2":
          tareasFiltradas = tareas.filter(t => t.estado === "en curso");
          break;
        case "3":
          tareasFiltradas = tareas.filter(t => t.estado === "pendiente");
          break;
        case "4":
          tareasFiltradas = tareas.filter(t => t.estado === "terminada");
          break;
        default:
          console.log("Opción no válida");
          tareasFiltradas = [];
      }

      mostrarTitulos(tareasFiltradas);

      if (tareasFiltradas.length > 0) {
        const detalle = prompt("¿Deseas ver una tarea en detalle? (número o Enter para omitir): ");
        if (detalle) {
          const indice = parseInt(detalle) - 1;
          if (tareasFiltradas[indice]) {
            tareasFiltradas[indice].verTareas();

            // 🔧 OPCIÓN DE EDITAR DESPUÉS DE VER DETALLE
            const editar = prompt("¿Deseas editar esta tarea? (s/n): ");
            if (editar.toLowerCase() === "s") {
              console.log("\n=== Editar tarea ===");
              const nuevoTitulo = prompt(`Nuevo título (${tareasFiltradas[indice].titulo}): `) || tareasFiltradas[indice].titulo;
              const nuevaDescripcion = prompt(`Nueva descripción (${tareasFiltradas[indice].descripcion}): `) || tareasFiltradas[indice].descripcion;
              const nuevoEstado = validarEstado();
              const nuevaDificultad = validarDificultad();
              const nuevoVencimiento = validarFecha();

              tareasFiltradas[indice].editarTarea(nuevoTitulo, nuevaDescripcion, nuevoEstado, nuevaDificultad, nuevoVencimiento);
              console.log(" Tarea editada con éxito.");
            }
          } else {
            console.log("Número inválido.");
          }
        }
      }
      break;

    // ---------- BUSCAR TAREA ----------
    case "2":
      const buscar = prompt("Ingresa el título exacto (sin distinguir mayúsculas/minúsculas): ");
      const tareaEncontrada = buscarTareaPorTitulo(buscar);

      if (tareaEncontrada) {
        console.log("\n Tarea encontrada:");
        tareaEncontrada.verTareas();
      } else {
        console.log(" No se encontró ninguna tarea con ese título.");
      }
      break;

    // ---------- AGREGAR TAREA ----------
    case "3":
      console.log("\n=== NUEVA TAREA ===");
      const tituloNuevo = prompt("Título: ");
      const descripcionNueva = prompt("Descripción: ");
      const estadoNuevo = validarEstado();
      const dificultadNueva = validarDificultad();
      const vencimientoNuevo = validarFecha();

      const nuevaTarea = new ListaDeTareas(tituloNuevo, descripcionNueva, estadoNuevo, dificultadNueva, vencimientoNuevo);
      tareas.push(nuevaTarea);
      console.log("✅ Tarea agregada correctamente.");
      break;

    case "0":
      console.log(" Saliendo del programa...");
      break;

    default:
      console.log(" Opción no válida.");
      break;
  }

} while (eleccion !== "0");
