// pedirDatos.js: único archivo que conoce la URL de la API.
import Anime from './Anime.js';

// Top de animes de MyAnimeList; limit=12 define cuántos trae (el TP pide mínimo 6)
const URL_API = 'https://api.jikan.moe/v4/top/anime?limit=12';

// Hace el GET a Jikan y devuelve un array de objetos Anime.
// Si falla, lanza un error que se maneja en app.js.
export async function traerAnimes() {
  const respuesta = await fetch(URL_API);

  // Con un 404 o 500 fetch no falla solo: hay que revisar respuesta.ok
  if (!respuesta.ok) throw new Error('Error HTTP ' + respuesta.status);

  const json = await respuesta.json();

  // En Jikan la lista viene dentro de la propiedad "data"
  return json.data.map((dato) => new Anime(dato));
}
