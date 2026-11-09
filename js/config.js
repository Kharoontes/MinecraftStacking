// ---- APIs (sin llave, sin descargar nada) ----
// Lista de items con stackSize y displayName: minecraft-data (vía jsDelivr, versión fijada)
export const ITEMS_API =
  "https://cdn.jsdelivr.net/npm/minecraft-data@3.102.2/minecraft-data/data/pc/1.21.8/items.json";

// Imágenes: Minecraft Item Gallery -> {IMAGES_BASE}/{version}/{item}.png
export const IMAGES_BASE = "https://mcitemgallery.com/images";
export const IMAGES_VERSIONS_API = `${IMAGES_BASE}/versions.json`;

// Versión de imágenes usada si versions.json no responde. Se actualiza sola al cargar.
export const cfg = { imgVersion: "1.21.6" };

export const PLACEHOLDER = "images/ui/placeholder.svg";
export const CHEST_SLOTS = 54;   // cofre doble
export const SHULKER_SLOTS = 27;
export const MAX_SLOTS_SHOWN = 54;