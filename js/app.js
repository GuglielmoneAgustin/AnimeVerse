// app.js: punto de entrada del Home. Decide qué pasa y en qué orden;
// no sabe cómo se piden los datos (pedirDatos.js) ni cómo se dibujan (dibujar.js).
import { traerPeliculas } from './pedirDatos.js';
import { dibujarCards, dibujarCargando, dibujarError, limpiar } from './dibujar.js';

const estado = document.getElementById('estado');   // zona de mensajes: loading / error
const contenedor = document.getElementById('cards'); // grid donde van las cards

// Pide las películas y maneja los tres estados de la carga.
async function cargarDatos() {
  limpiar(contenedor);
  dibujarCargando(estado);                 // 1) loading

  try {
    const peliculas = await traerPeliculas();
    limpiar(estado);
    dibujarCards(peliculas, contenedor);   // 2) success
  } catch (error) {
    // Se pasa cargarDatos para que el botón "Reintentar" vuelva a pedir los datos
    dibujarError(error.message, estado, cargarDatos); // 3) error
  }
}

cargarDatos();
