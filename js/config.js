// ---- APIs (sin llave, sin descargar nada) ----
// Lista de items con stackSize y displayName: minecraft-data (1.21.8).
// Se prueban en orden hasta que una responda.
export const ITEMS_APIS = [
  "https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/1.21.8/items.json",
  "https://unpkg.com/minecraft-data@3.102.2/minecraft-data/data/pc/1.21.8/items.json",
  "https://cdn.jsdelivr.net/npm/minecraft-data@3.102.2/minecraft-data/data/pc/1.21.8/items.json"
];

// Iconos, fuente principal: Minecraft Item API (https://www.minecraftitems.xyz/wiki)
// GET {ITEM_API}/api/item/{id}/size={N} -> PNG (items y bloques, sin llave de API)
export const ITEM_API = "https://api.minecraftitems.xyz";
export const ITEM_API_SIZE = 3;   // multiplicador de tamaño

// Respaldo 1: texturas oficiales extraídas por InventivetalentDev/minecraft-assets (una rama por versión)
// -> {TEXTURES_BASE}/item/{id}.png  o  /block/{id}.png
export const TEXTURES_BASE =
  "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.10/assets/minecraft/textures";

// Respaldo 2: Minecraft Item Gallery
export const GALLERY_BASE = "https://mcitemgallery.com/images/1.21.6";

// Items cuya textura no se llama igual que su id
export const ALIASES = { crossbow: "crossbow_standby", clock: "clock_00", compass: "compass_00" };

export const PLACEHOLDER = "images/ui/placeholder.svg";
export const CHEST_SLOTS = 54;   // cofre doble
export const SHULKER_SLOTS = 27;
export const MAX_SLOTS_SHOWN = 54;