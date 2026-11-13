// dibujar.js: único archivo que toca el DOM (createElement + appendChild).

// Crea un elemento con su clase y, si se pasa, su texto.
// Se usa textContent (no innerHTML) porque los datos vienen de una API externa.
function crearElemento(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);
  elemento.className = clase;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

// Arma una card: póster + etiquetas de ranking y puntaje + título, director/año y duración.
function crearCard(pelicula) {
  const card = crearElemento('article', 'card');

  const imagen = crearElemento('img', 'card__imagen');
  imagen.src = pelicula.imagen;
  imagen.alt = 'Póster de ' + pelicula.titulo;
  imagen.loading = 'lazy'; // carga la imagen recién cuando está por entrar en pantalla

  const ranking = crearElemento('span', 'card__ranking', '#' + pelicula.ranking);
  const puntaje = crearElemento('span', 'card__puntaje', '★ ' + pelicula.puntaje);

  const cuerpo = crearElemento('div', 'card__cuerpo');
  cuerpo.appendChild(crearElemento('h3', 'card__titulo', pelicula.titulo));
  cuerpo.appendChild(crearElemento('p', 'card__detalle', pelicula.director + ' · ' + pelicula.anio));
  cuerpo.appendChild(crearElemento('p', 'card__extra', pelicula.tituloOriginal + ' · ' + pelicula.duracion + ' min'));

  card.appendChild(ranking);
  card.appendChild(puntaje);
  card.appendChild(imagen);
  card.appendChild(cuerpo);
  return card;
}

// Estado success: vacía el contenedor y agrega una card por película.
export function dibujarCards(peliculas, contenedor) {
  contenedor.textContent = '';
  peliculas.forEach((pelicula) => contenedor.appendChild(crearCard(pelicula)));
}

// Estado loading: spinner + texto mientras se espera la respuesta de la API.
export function dibujarCargando(contenedor) {
  contenedor.textContent = '';
  const caja = crearElemento('div', 'cargando');
  caja.appendChild(crearElemento('div', 'spinner'));
  caja.appendChild(crearElemento('p', '', 'Cargando películas...'));
  contenedor.appendChild(caja);
}

// Estado error: mensaje claro + botón que vuelve a ejecutar la función recibida.
export function dibujarError(mensaje, contenedor, alReintentar) {
  contenedor.textContent = '';
  const caja = crearElemento('div', 'error');
  caja.appendChild(crearElemento('p', '', 'No se pudieron cargar las películas (' + mensaje + ').'));

  const boton = crearElemento('button', 'boton', 'Reintentar');
  boton.type = 'button';
  boton.addEventListener('click', alReintentar);
  caja.appendChild(boton);

  contenedor.appendChild(caja);
}

// Borra todo el contenido de un contenedor.
export function limpiar(contenedor) {
  contenedor.textContent = '';
}
