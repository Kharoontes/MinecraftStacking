# Calculadora de stacks de Minecraft

Página web sencilla para saber cuántos **stacks** e **items sueltos** son una cantidad de items de Minecraft. Eliges el item, escribes el número que te piden y la página hace la cuenta.

Ejemplo: 500 items de un item que se apila de 64 son **7 stacks y 52 items**.

## Qué hace

- Lista de más de mil items y bloques con su tamaño de stack real (64, 16 o 1).
- Pestañas con icono por categoría (construcción, naturaleza, minerales, redstone, comida, combate, etc.).
- Búsqueda en español e inglés, que revisa todas las categorías a la vez.
- Muestra el resultado en stacks y items sueltos.
- Panel lateral de crafteo: si el item se craftea, muestra la cuadrícula de 3×3, la cantidad que produce y los materiales. Si tiene varias recetas, se navega entre ellas, y al pulsar un ingrediente se abre ese item. Si no tiene receta, se muestra con una señal de prohibido, y los items solo de creativo llevan el título "Solo modo creativo".
- Dibuja los espacios del inventario y calcula cuántos cofres dobles o shulkers ocupa.
- Animaciones suaves, desactivadas si el sistema pide reducir movimiento.

## Estructura

```
index.html
css/
  base.css          colores, layout y panel
  components.css    inputs, tiles, slots y resultados
  animations.css    animaciones
js/
  config.js         URLs de las APIs y constantes
  data.js           carga de items (API) y lista de respaldo
  calc.js           cálculo de stacks
  categories.js     categorías de los items (reglas por id)
  potions.js        variantes de pociones y flechas con efecto
  ui.js             dibujo de la pantalla e imágenes
  main.js           eventos y lógica principal
images/ui/          logo, favicon y placeholder
.github/workflows/
  pages.yml         publicación automática en GitHub Pages
```

## De dónde salen los datos

No se descarga nada: todo se pide a APIs públicas al abrir la página.

| Dato | Fuente |
| --- | --- |
| Lista de items, stacks, comida y recetas de crafteo | [minecraft-data](https://github.com/PrismarineJS/minecraft-data) (1.21.8), desde GitHub, con unpkg y jsDelivr como respaldo |
| Nombres de los items | Archivos de idioma oficiales de Mojang (`piston-meta.mojang.com` y `resources.download.minecraft.net`), en el idioma de `LANG_CODE` |
| Imágenes de los items | [Minecraft Item API](https://www.minecraftitems.xyz/wiki) (`/api/item/{id}/size=3`), con [InventivetalentDev/minecraft-assets](https://github.com/InventivetalentDev/minecraft-assets) (rama 1.21.10) y [Minecraft Item Gallery](https://mcitemgallery.com/docs) como respaldo |

- Cada icono se pide primero a Minecraft Item API. Si falla, prueba las texturas (`item/`, `block/` y caras como `_front`, `_side`, `_top`), luego la galería y al final `images/ui/placeholder.svg`.
- El tamaño de las imágenes se cambia con `ITEM_API_SIZE` en `js/config.js`.
- Los items más nuevos que la rama 1.21.10 pueden salir con placeholder.
- Si la API de items no responde, se carga una lista reducida de items comunes.
- Los nombres salen del archivo de idioma de la última versión estable de Mojang (español por defecto; se cambia con `LANG_CODE` en `js/config.js`).
- Si Mojang no responde, se usa un diccionario propio en español para los items comunes y el nombre en inglés para el resto.
- Las pociones se generan por efecto (curación, fuerza, veneno…) en `js/potions.js`, porque en la lista de items son un solo item. Sus nombres salen del archivo de idioma de Mojang y el punto de color de cada una es aproximado.
- La lista de items solo de creativo es manual (`CREATIVE_ONLY` en `js/categories.js`), así que puede faltar alguno.
- Las recetas son solo de mesa de crafteo (no incluyen horno, herrería ni otras). Vienen de `recipes.json` de minecraft-data.
- Las categorías no las publica ninguna API: se asignan con reglas por id y con `foods.json` de minecraft-data para la comida, así que alguna puede quedar en una pestaña aproximada.
- Mojang no publica una API de imágenes ni de stacks, por eso esos datos vienen de otras fuentes.

## Cómo modificarla

- **Cambiar la versión de los datos:** edita `ITEMS_APIS` en `js/config.js`.
- **Cambiar el idioma de los nombres:** edita `LANG_CODE` en `js/config.js` (por ejemplo `en_us`, `es_mx`, `pt_br`).
- **Cambiar colores:** variables al inicio de `css/base.css`.
- **Cambiar animaciones:** `css/animations.css`.

## Créditos y aviso

Proyecto de fans, sin relación con Mojang ni Microsoft. Minecraft y sus texturas son propiedad de Mojang AB. Las imágenes se cargan desde un sitio externo y no se incluyen en este repositorio. Datos de items de PrismarineJS/minecraft-data.