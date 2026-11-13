// Pelicula.js: modela una película. Se queda solo con los campos que usan las cards
// y les pone nombres propios; es el único archivo que conoce los nombres de la API.
export default class Pelicula {
  constructor(datos, ranking) {
    // La API no trae ranking: se calcula en pedirDatos.js según el puntaje
    this.ranking = ranking;
    this.titulo = datos.title;
    this.tituloOriginal = datos.original_title_romanised;
    this.imagen = datos.image;
    this.director = datos.director;
    this.anio = datos.release_date;
    this.duracion = datos.running_time;
    // rt_score viene como texto ("97"): se pasa a número para poder ordenar
    this.puntaje = Number(datos.rt_score);
  }
}
