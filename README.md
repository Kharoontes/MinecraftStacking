# Calculadora de stacks de Minecraft

Página web sencilla para saber cuántos **stacks** e **items sueltos** son una cantidad de items de Minecraft. Eliges el item, escribes el número que te piden y la página hace la cuenta.

Ejemplo: 500 items de un item que se apila de 64 son **7 stacks y 52 items**.

## Qué hace

- Lista de más de mil items y bloques con su tamaño de stack real (64, 16 o 1).
- Búsqueda en español e inglés, y filtros por tamaño de stack.
- Muestra el resultado en stacks y items sueltos.
- Dibuja los espacios del inventario y calcula cuántos cofres dobles o shulkers ocupa.
- El valor de "Items por stack" se puede cambiar a mano (útil en servidores con reglas distintas).
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
| Lista de items, nombres y stacks | [minecraft-data](https://github.com/PrismarineJS/minecraft-data) (1.21.8), desde GitHub, con unpkg y jsDelivr como respaldo |
| Imágenes de los items | [Minecraft Item API](https://www.minecraftitems.xyz/wiki) (`/api/item/{id}/size=3`), con [InventivetalentDev/minecraft-assets](https://github.com/InventivetalentDev/minecraft-assets) (rama 1.21.10) y [Minecraft Item Gallery](https://mcitemgallery.com/docs) como respaldo |

- Cada icono se pide primero a Minecraft Item API. Si falla, prueba las texturas (`item/`, `block/` y caras como `_front`, `_side`, `_top`), luego la galería y al final `images/ui/placeholder.svg`.
- El tamaño de las imágenes se cambia con `ITEM_API_SIZE` en `js/config.js`.
- Los items más nuevos que la rama 1.21.10 pueden salir con placeholder.
- Si la API de items no responde, se carga una lista reducida de items comunes.
- Los nombres en español solo existen para los items más comunes. El resto aparece en inglés.

## Cómo modificarla

- **Cambiar la versión de los datos:** edita `ITEMS_APIS` en `js/config.js`.
- **Agregar nombres en español:** añade líneas al objeto `ES` en `js/data.js` con el formato `id_del_item: "Nombre"`.
- **Cambiar colores:** variables al inicio de `css/base.css`.
- **Cambiar animaciones:** `css/animations.css`.

## Créditos y aviso

Proyecto de fans, sin relación con Mojang ni Microsoft. Minecraft y sus texturas son propiedad de Mojang AB. Las imágenes se cargan desde un sitio externo y no se incluyen en este repositorio. Datos de items de PrismarineJS/minecraft-data.