// ---- APIs (sin llave, sin descargar nada) ----
// Lista de items con stackSize y displayName: minecraft-data (vía jsDelivr, versión fijada)
export const ITEMS_API =
  "https://cdn.jsdelivr.net/npm/minecraft-data@3.102.2/minecraft-data/data/pc/1.21.8/items.json";

// Iconos: texturas oficiales extraídas por InventivetalentDev/minecraft-assets (una rama por versión)
// -> {TEXTURES_BASE}/item/{id}.png  o  /block/{id}.png
export const TEXTURES_BASE =
  "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.10/assets/minecraft/textures";

// Respaldo secundario si no se encuentra la textura: Minecraft Item Gallery
export const GALLERY_BASE = "https://mcitemgallery.com/images/1.21.6";

// Items cuya textura no se llama igual que su id
export const ALIASES = { crossbow: "crossbow_standby", clock: "clock_00", compass: "compass_00" };

export const PLACEHOLDER = "images/ui/placeholder.svg";
export const CHEST_SLOTS = 54;   // cofre doble
export const SHULKER_SLOTS = 27;
export const MAX_SLOTS_SHOWN = 54;