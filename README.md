# AnimeVerse · TP Final Diseño Web 2026

Sitio web de 3 páginas que consume la **Studio Ghibli API** y muestra el ranking de las películas del estudio en cards responsive.

**ISFT N° 194 · Diseño Web 2026 · 2.º año** — Prof. Mauro Gonzalo Triaca

**Repositorio:** https://github.com/GuglielmoneAgustin/AnimeVerse

## Integrantes y roles

| Integrante | Rol | Responsabilidades |
|---|---|---|
| Agustín Guglielmone | Consumo de la API y JavaScript | Fetch a la Studio Ghibli API, clase `Pelicula`, estados loading/success/error, renderizado de cards, validación del formulario |
| Natanael Zubiri | Maquetación HTML/CSS y documentación | Estructura semántica, paleta de colores, grid responsive, diseño de cards, README |

## Páginas

| Archivo | Contenido |
|---|---|
| `index.html` | Home: 22 cards con todas las películas, ordenadas por puntaje, en grid de 1 · 2 · 3 columnas |
| `contacto.html` | Formulario validado con JavaScript (alerts + reset) e imagen temática |
| `about.html` | Equipo con foto, nombre y rol; temática, API y decisiones técnicas |

Las 3 páginas comparten navegación y footer (integrantes, repositorio, API, materia e instituto).

## Estructura del proyecto

```
tp-final/
├── index.html
├── contacto.html
├── about.html
├── README.md
├── css/
│   └── estilos.css
├── img/
│   ├── contacto.svg
│   ├── agustin-guglielmone.jpg
│   └── natanael-zubiri.jpg
└── js/
    ├── app.js          # Punto de entrada del Home: orden de los estados
    ├── pedirDatos.js   # Único archivo que conoce la URL de la API
    ├── Pelicula.js     # Clase que modela los datos de la API
    ├── dibujar.js      # Único archivo que crea elementos en el DOM
    └── contacto.js     # Validación del formulario
```

## API utilizada: Studio Ghibli API

- **Sitio:** https://ghibliapi.vercel.app
- **Endpoint:** `GET https://ghibliapi.vercel.app/films`
- **Registro / API key:** no requiere
- **Cantidad de datos:** 22 películas
- **Dónde viene la lista:** directa (el JSON ya es el array)
- **Pedidos necesarios:** uno solo (cada película ya trae su póster y sus datos)

### Estructura de la respuesta (abreviada)

```json
[
  {
    "id": "dc2e6bd1-8156-4886-adff-b39e6043af0c",
    "title": "Spirited Away",
    "original_title": "千と千尋の神隠し",
    "original_title_romanised": "Sen to Chihiro no kamikakushi",
    "image": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    "description": "Spirited Away is an Oscar winning Japanese animated film...",
    "director": "Hayao Miyazaki",
    "producer": "Toshio Suzuki",
    "release_date": "2001",
    "running_time": "124",
    "rt_score": "97"
  }
]
```

### Campos usados en cada card

| Campo de la API | Propiedad en `Pelicula` | Uso en la card |
|---|---|---|
| `image` | `imagen` | Póster en formato 3:4 |
| `title` | `titulo` | Campo principal |
| `director` + `release_date` | `director`, `anio` | Campo secundario |
| `original_title_romanised` + `running_time` | `tituloOriginal`, `duracion` | Tercer campo |
| `rt_score` | `puntaje` | Etiqueta superior derecha |
| — (se calcula) | `ranking` | Etiqueta superior izquierda |

La API no trae un ranking: en `pedirDatos.js` las películas se ordenan por `rt_score` (puntaje de la crítica en Rotten Tomatoes) de mayor a menor y se numeran según su posición.

### Flujo de los datos

```
index.html → app.js → pedirDatos.js → fetch(API) → ordenar por puntaje → new Pelicula(dato, ranking) → dibujar.js → cards en el DOM
```

### Estados

1. **Loading:** spinner y texto "Cargando películas..." mientras se espera la respuesta.
2. **Success:** se renderizan las cards con `createElement` + `textContent`.
3. **Error:** si no hay conexión o `respuesta.ok` es `false`, se muestra un mensaje con botón **Reintentar**.

## Decisiones de diseño

| Variable | Color | Uso |
|---|---|---|
| `--color-fondo` | `#f3f8f1` | Fondo verde menta |
| `--color-superficie` | `#ffffff` | Cards, header y formulario |
| `--color-texto` | `#2f3e46` | Texto principal |
| `--color-primario` | `#f2a191` | Acento durazno (botones, ranking, hover) |
| `--color-secundario` | `#8ecae6` | Acento celeste cielo (puntaje, bordes) |
| `--color-primario-oscuro` / `--color-secundario-oscuro` | `#b5533f` / `#2f7ea3` | Versiones oscuras de los acentos para textos y enlaces legibles |

Siguiendo la consigna (Ghibli → tonos suaves y pasteles), la paleta toma los cielos, campos y atardeceres de las películas. Las tipografías redondeadas (**Fredoka** para títulos y **Nunito** para texto) acompañan el estilo amable del estudio. Las cards tienen bordes redondeados, el póster en formato 3:4 y un hover con elevación, escala y sombra durazno.

## Aspectos técnicos

- **HTML5 semántico:** `header`, `nav`, `main`, `section`, `article`, `figure`, `fieldset`, `footer`.
- **CSS mobile first** con el orden: variables → reset/base → mobile (320px+) → tablet (`min-width: 768px`) → desktop (`min-width: 1024px`).
- **Grid de cards:** 1 columna en mobile, 2 en tablet, 3 en desktop.
- **JavaScript modular** con `import` / `export` y `<script type="module">`.
- **Formulario:** 7 campos (text, email, number, select, radio, textarea, checkbox). Se valida en el evento `submit` con `preventDefault()`, se informa cada error con `alert` y se resetea tras un envío exitoso.

## Cómo ejecutarlo

Los módulos ES no funcionan abriendo el archivo con doble clic (`file://`). Hace falta un servidor local:

- **VS Code:** extensión *Live Server* → clic derecho en `index.html` → *Open with Live Server*.
- **Python:** `python -m http.server 8000` y abrir `http://localhost:8000`.
- **Node:** `npx serve`.
