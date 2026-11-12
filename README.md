# AnimeVerse · TP Final Diseño Web 2026

Sitio web de 3 páginas que consume la **API Jikan (MyAnimeList)** y muestra el top de animes en cards responsive.

**ISFT N° 194 · Diseño Web 2026 · 2.º año** — Prof. Mauro Gonzalo Triaca

**Repositorio:** https://github.com/GuglielmoneAgustin/AnimeVerse

## Integrantes y roles

| Integrante | Rol | Responsabilidades |
|---|---|---|
| Agustín Guglielmone | Consumo de la API y JavaScript | Fetch a Jikan, clase `Anime`, estados loading/success/error, renderizado de cards, validación del formulario |
| Natanael Zubiri | Maquetación HTML/CSS y documentación | Estructura semántica, paleta de colores, grid responsive, diseño de cards, README |

## Páginas

| Archivo | Contenido |
|---|---|
| `index.html` | Home: 12 cards con el top de animes en grid de 1 · 2 · 3 columnas |
| `contacto.html` | Formulario validado con JavaScript (alerts + reset) e imagen temática |
| `about.html` | Equipo con foto, nombre y rol; temática, API y decisiones técnicas |

Las 3 páginas comparten navegación y footer (integrantes + repositorio + API).

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
    ├── Anime.js        # Clase que modela los datos de la API
    ├── dibujar.js      # Único archivo que crea elementos en el DOM
    └── contacto.js     # Validación del formulario
```

## API utilizada: Jikan v4

- **Documentación:** https://docs.api.jikan.moe/
- **Endpoint:** `GET https://api.jikan.moe/v4/top/anime?limit=12`
- **Registro / API key:** no requiere
- **Límite:** 3 pedidos por segundo · 60 por minuto
- **Dónde viene la lista:** dentro de la propiedad `data`
- **Pedidos necesarios:** uno solo (cada anime ya trae su imagen y sus datos)

### Estructura de la respuesta (abreviada)

```json
{
  "pagination": { "current_page": 1, "has_next_page": true },
  "data": [
    {
      "mal_id": 52991,
      "rank": 1,
      "title": "Sousou no Frieren",
      "title_english": "Frieren: Beyond Journey's End",
      "images": {
        "jpg":  { "image_url": "...", "large_image_url": "..." },
        "webp": { "image_url": "...", "large_image_url": "..." }
      },
      "type": "TV",
      "episodes": 28,
      "score": 9.24,
      "genres": [
        { "mal_id": 2, "name": "Adventure" },
        { "mal_id": 8, "name": "Drama" }
      ],
      "synopsis": "..."
    }
  ]
}
```

### Campos usados en cada card

| Campo de la API | Propiedad en `Anime` | Uso en la card |
|---|---|---|
| `images.webp.large_image_url` | `imagen` | Imagen formato póster (3:4) |
| `title_english` / `title` | `titulo` | Campo principal |
| `type` + `episodes` | `tipo`, `episodios` | Campo secundario |
| `genres[].name` | `generos` | Tercer campo |
| `rank` | `ranking` | Etiqueta superior izquierda |
| `score` | `puntaje` | Etiqueta superior derecha |

### Flujo de los datos

```
index.html → app.js → pedirDatos.js → fetch(Jikan) → json.data → new Anime(dato) → dibujar.js → cards en el DOM
```

### Estados

1. **Loading:** spinner y texto "Cargando animes..." mientras se espera la respuesta.
2. **Success:** se renderizan las cards con `createElement` + `textContent`.
3. **Error:** si no hay conexión o `respuesta.ok` es `false`, se muestra un mensaje con botón **Reintentar**.

## Decisiones de diseño

| Variable | Color | Uso |
|---|---|---|
| `--color-fondo` | `#0f172a` | Fondo azul noche |
| `--color-superficie` | `#1e293b` | Cards y formularios |
| `--color-texto` | `#f1f5f9` | Texto principal |
| `--color-primario` | `#f43f5e` | Acento rosa sakura (botones, ranking, hover) |
| `--color-secundario` | `#38bdf8` | Acento celeste neón (puntaje, enlaces) |

La paleta se inspira en los posters de anime y las ciudades nocturnas japonesas: fondo oscuro para que resalten las portadas y dos acentos neón. Las cards tienen bordes redondeados, imagen en formato póster y un hover con elevación, escala y brillo rosado.

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
