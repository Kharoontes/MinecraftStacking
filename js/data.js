import { ITEMS_APIS, MOJANG_MANIFEST, MOJANG_RESOURCES, LANG_CODE } from "./config.js";

// Nombres en español para los items más comunes (el resto se muestra con su nombre en inglés)
const ES = {
  stone:"Piedra",cobblestone:"Adoquín",dirt:"Tierra",sand:"Arena",gravel:"Grava",oak_log:"Troncos de roble",
  oak_planks:"Tablones de roble",stick:"Palo",coal:"Carbón",iron_ingot:"Lingote de hierro",
  gold_ingot:"Lingote de oro",copper_ingot:"Lingote de cobre",netherite_ingot:"Lingote de netherita",
  diamond:"Diamante",emerald:"Esmeralda",redstone:"Redstone",lapis_lazuli:"Lapislázuli",quartz:"Cuarzo",
  torch:"Antorcha",glass:"Cristal",brick:"Ladrillo",obsidian:"Obsidiana",leather:"Cuero",paper:"Papel",
  book:"Libro",wheat:"Trigo",carrot:"Zanahoria",potato:"Patata",bread:"Pan",apple:"Manzana",
  cooked_beef:"Filete cocido",cooked_porkchop:"Cerdo cocinado",cooked_chicken:"Pollo cocinado",bone:"Hueso",
  bone_meal:"Polvo de hueso",gunpowder:"Pólvora",string:"Cuerda",feather:"Pluma",white_wool:"Lana blanca",
  tnt:"TNT",arrow:"Flecha",slime_ball:"Bola de slime",melon_slice:"Rodaja de sandía",pumpkin:"Calabaza",
  sugar_cane:"Caña de azúcar",wheat_seeds:"Semillas de trigo",ender_eye:"Ojo de ender",
  firework_rocket:"Cohete",item_frame:"Marco de objetos",rotten_flesh:"Carne podrida",
  spider_eye:"Ojo de araña",blaze_powder:"Polvo de blaze",blaze_rod:"Vara de blaze",
  ghast_tear:"Lágrima de ghast",golden_apple:"Manzana dorada",golden_carrot:"Zanahoria dorada",rail:"Rail",
  crafting_table:"Mesa de crafteo",furnace:"Horno",glowstone_dust:"Polvo de glowstone",netherrack:"Netherrack",
  glowstone:"Glowstone",hay_block:"Bala de heno",cocoa_beans:"Cacao",iron_block:"Bloque de hierro",
  diamond_block:"Bloque de diamante",gold_block:"Bloque de oro",redstone_block:"Bloque de redstone",
  bamboo:"Bambú",sweet_berries:"Bayas dulces",cod:"Bacalao",salmon:"Salmón",
  ender_pearl:"Perla de ender",egg:"Huevo",snowball:"Bola de nieve",bucket:"Cubo vacío",oak_sign:"Cartel",
  white_banner:"Estandarte",armor_stand:"Soporte de armadura",honey_bottle:"Botella de miel",
  diamond_sword:"Espada de diamante",netherite_sword:"Espada de netherita",diamond_pickaxe:"Pico de diamante",
  netherite_pickaxe:"Pico de netherita",diamond_axe:"Hacha de diamante",diamond_shovel:"Pala de diamante",
  diamond_hoe:"Azada de diamante",diamond_helmet:"Casco de diamante",diamond_chestplate:"Peto de diamante",
  diamond_leggings:"Pantalones de diamante",diamond_boots:"Botas de diamante",
  netherite_chestplate:"Peto de netherita",iron_chestplate:"Peto de hierro",bow:"Arco",crossbow:"Ballesta",
  trident:"Tridente",shield:"Escudo",elytra:"Élitros",totem_of_undying:"Tótem de inmortalidad",
  fishing_rod:"Caña de pescar",shears:"Tijeras",flint_and_steel:"Mechero",water_bucket:"Cubo de agua",
  lava_bucket:"Cubo de lava",milk_bucket:"Cubo de leche",potion:"Poción",enchanted_book:"Libro encantado",
  red_bed:"Cama roja",oak_boat:"Bote de roble",minecart:"Vagoneta",cake:"Pastel",
  mushroom_stew:"Estofado de champiñones",saddle:"Silla de montar",music_disc_13:"Disco 13",
  compass:"Brújula",clock:"Reloj"
};

// Lista reducida por si la API no responde: [stack, ids...]
const FALLBACK = [
  [64, "stone cobblestone dirt sand gravel oak_log oak_planks stick coal iron_ingot gold_ingot copper_ingot netherite_ingot diamond emerald redstone lapis_lazuli quartz torch glass brick obsidian leather paper book wheat carrot potato bread apple cooked_beef cooked_porkchop cooked_chicken bone bone_meal gunpowder string feather white_wool tnt arrow slime_ball melon_slice pumpkin sugar_cane wheat_seeds ender_eye firework_rocket item_frame rotten_flesh spider_eye blaze_powder blaze_rod ghast_tear golden_apple golden_carrot rail crafting_table furnace glowstone_dust netherrack glowstone hay_block cocoa_beans iron_block diamond_block gold_block redstone_block bamboo sweet_berries cod salmon"],
  [16, "ender_pearl egg snowball bucket oak_sign white_banner armor_stand honey_bottle"],
  [1, "diamond_sword netherite_sword diamond_pickaxe netherite_pickaxe diamond_axe diamond_shovel diamond_hoe diamond_helmet diamond_chestplate diamond_leggings diamond_boots netherite_chestplate iron_chestplate bow crossbow trident shield elytra totem_of_undying fishing_rod shears flint_and_steel water_bucket lava_bucket milk_bucket potion enchanted_book red_bed oak_boat minecart cake mushroom_stew saddle music_disc_13 compass clock"]
];

const pretty = (id) => id.split("_").filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
const sortEs = (a, b) => a.name.localeCompare(b.name, "es");
// Prioridad del nombre: Mojang (idioma) > diccionario propio > inglés
const mk = (id, stack, en, lang) => ({
  id, stack, en: en || pretty(id),
  name: lang?.[`item.minecraft.${id}`] || lang?.[`block.minecraft.${id}`] || ES[id] || en || pretty(id)
});

async function getJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

// Archivo de idioma oficial de Mojang para la última versión estable
async function loadMojangNames() {
  try {
    const manifest = await getJson(MOJANG_MANIFEST);
    const ver = manifest.versions.find((v) => v.id === manifest.latest.release);
    const index = await getJson((await getJson(ver.url)).assetIndex.url);
    const obj = index.objects[`minecraft/lang/${LANG_CODE}.json`];
    if (!obj) throw new Error(`sin archivo de idioma ${LANG_CODE}`);
    return await getJson(`${MOJANG_RESOURCES}/${obj.hash.slice(0, 2)}/${obj.hash}`);
  } catch (e) {
    console.warn("Nombres de Mojang no disponibles:", e);
    return null;
  }
}

async function fetchFirst(urls) {
  for (const url of urls) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      if (Array.isArray(data) && data.length) return data;
    } catch (e) {
      console.warn("API de items no disponible:", url, e);
    }
  }
  return null;
}

// Devuelve { items, fromApi }
export async function loadItems() {
  const [data, lang] = await Promise.all([fetchFirst(ITEMS_APIS), loadMojangNames()]);
  if (data) {
    const items = data
      .filter((i) => i.name && i.name !== "air" && i.stackSize > 0)
      .map((i) => mk(i.name, i.stackSize, i.displayName, lang))
      .sort(sortEs);
    return { items, fromApi: true };
  }
  const items = FALLBACK.flatMap(([s, ids]) => ids.split(" ").map((id) => mk(id, s, null, lang))).sort(sortEs);
  return { items, fromApi: false };
}