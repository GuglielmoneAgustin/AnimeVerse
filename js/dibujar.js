// dibujar.js: único archivo que toca el DOM (createElement + appendChild).

// Crea un elemento con su clase y, si se pasa, su texto.
// Se usa textContent (no innerHTML) porque los datos vienen de una API externa.
function crearElemento(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);
  elemento.className = clase;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

// Arma una card: imagen + etiquetas de ranking y puntaje + título, tipo/episodios y géneros.
function crearCard(anime) {
  const card = crearElemento('article', 'card');

  const imagen = crearElemento('img', 'card__imagen');
  imagen.src = anime.imagen;
  imagen.alt = 'Póster de ' + anime.titulo;
  imagen.loading = 'lazy'; // carga la imagen recién cuando está por entrar en pantalla

  const ranking = crearElemento('span', 'card__ranking', '#' + anime.ranking);
  const puntaje = crearElemento('span', 'card__puntaje', '★ ' + anime.puntaje);

  const cuerpo = crearElemento('div', 'card__cuerpo');
  cuerpo.appendChild(crearElemento('h3', 'card__titulo', anime.titulo));
  cuerpo.appendChild(crearElemento('p', 'card__detalle', anime.tipo + ' · ' + anime.episodios + ' episodios'));
  cuerpo.appendChild(crearElemento('p', 'card__generos', anime.generos));

  card.appendChild(ranking);
  card.appendChild(puntaje);
  card.appendChild(imagen);
  card.appendChild(cuerpo);
  return card;
}

// Estado success: vacía el contenedor y agrega una card por anime.
export function dibujarCards(animes, contenedor) {
  contenedor.textContent = '';
  animes.forEach((anime) => contenedor.appendChild(crearCard(anime)));
}

// Estado loading: spinner + texto mientras se espera la respuesta de la API.
export function dibujarCargando(contenedor) {
  contenedor.textContent = '';
  const caja = crearElemento('div', 'cargando');
  caja.appendChild(crearElemento('div', 'spinner'));
  caja.appendChild(crearElemento('p', '', 'Cargando animes...'));
  contenedor.appendChild(caja);
}

// Estado error: mensaje claro + botón que vuelve a ejecutar la función recibida.
export function dibujarError(mensaje, contenedor, alReintentar) {
  contenedor.textContent = '';
  const caja = crearElemento('div', 'error');
  caja.appendChild(crearElemento('p', '', 'No se pudieron cargar los animes (' + mensaje + ').'));

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
