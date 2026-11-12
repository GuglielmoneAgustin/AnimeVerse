// Anime.js: modela un anime. Se queda solo con los campos que usan las cards
// y les pone nombres propios; es el único archivo que conoce los nombres de la API.
export default class Anime {
  constructor(datos) {
    this.ranking = datos.rank;
    // Título en inglés si existe; si no, el título original
    this.titulo = datos.title_english || datos.title;
    // Imagen grande en formato webp (más liviana); si no está, la jpg
    this.imagen = datos.images.webp.large_image_url || datos.images.jpg.large_image_url;
    // Valores por defecto para animes sin tipo, episodios o puntaje cargados
    this.tipo = datos.type || 'Sin tipo';
    this.episodios = datos.episodes ?? '?';
    this.puntaje = datos.score ?? '-';
    // genres es un array de objetos: se juntan sus nombres en un solo texto
    this.generos = datos.genres.map((genero) => genero.name).join(' · ');
  }
}
