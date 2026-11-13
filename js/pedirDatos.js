// pedirDatos.js: único archivo que conoce la URL de la API.
import Pelicula from './Pelicula.js';

const URL_API = 'https://ghibliapi.vercel.app/films';

// Hace el GET a la API de Studio Ghibli y devuelve todas las películas,
// ordenadas por puntaje, como objetos Pelicula. Si falla, lanza un error que se maneja en app.js.
export async function traerPeliculas() {
  const respuesta = await fetch(URL_API);

  // Con un 404 o 500 fetch no falla solo: hay que revisar respuesta.ok
  if (!respuesta.ok) throw new Error('Error HTTP ' + respuesta.status);

  // En esta API el JSON ya es el array de películas (no viene dentro de una propiedad)
  const peliculas = await respuesta.json();

  // Se ordenan de mayor a menor puntaje; la posición en la lista es el ranking
  return peliculas
    .sort((a, b) => Number(b.rt_score) - Number(a.rt_score))
    .map((dato, indice) => new Pelicula(dato, indice + 1));
}
