// En el juego una poción es un solo item con distintos efectos, y minecraft-data solo lista el item base.
// Aquí se generan las variantes por efecto. El tamaño de stack depende solo del tipo
// (pociones 1, flechas con efecto 64), así que no se incluyen las versiones "larga" y "fuerte".
// Los nombres salen del archivo de idioma de Mojang; los colores son aproximados.
const TYPES = [
  { base: "potion",           stack: 1,  es: "Poción",              en: "Potion" },
  { base: "splash_potion",    stack: 1,  es: "Poción arrojadiza",   en: "Splash Potion" },
  { base: "lingering_potion", stack: 1,  es: "Poción persistente",  en: "Lingering Potion" },
  { base: "tipped_arrow",     stack: 64, es: "Flecha",              en: "Arrow" }
];

// [clave del efecto, español, inglés, color]
const EFFECTS = [
  ["water", "agua", "Water", "#385DC6"], ["mundane", "corriente", "Mundane", "#385DC6"],
  ["thick", "densa", "Thick", "#385DC6"], ["awkward", "rara", "Awkward", "#385DC6"],
  ["night_vision", "visión nocturna", "Night Vision", "#1F1FA1"],
  ["invisibility", "invisibilidad", "Invisibility", "#7F8392"],
  ["leaping", "salto", "Leaping", "#22FF4C"],
  ["fire_resistance", "resistencia al fuego", "Fire Resistance", "#E49A3A"],
  ["swiftness", "velocidad", "Swiftness", "#33EBFF"],
  ["slowness", "lentitud", "Slowness", "#8BAFE0"],
  ["water_breathing", "respiración acuática", "Water Breathing", "#98DAC0"],
  ["healing", "curación", "Healing", "#F82423"],
  ["harming", "daño", "Harming", "#A9656A"],
  ["poison", "veneno", "Poison", "#87A363"],
  ["regeneration", "regeneración", "Regeneration", "#CD5CAB"],
  ["strength", "fuerza", "Strength", "#FFC700"],
  ["weakness", "debilidad", "Weakness", "#6A736A"],
  ["luck", "suerte", "Luck", "#59C106"],
  ["turtle_master", "maestro tortuga", "Turtle Master", "#6B8E6B"],
  ["slow_falling", "caída lenta", "Slow Falling", "#F3CFB9"],
  ["wind_charged", "carga de viento", "Wind Charged", "#BDC9FF"],
  ["weaving", "tejido", "Weaving", "#78695A"],
  ["oozing", "rezumo", "Oozing", "#99FFA3"],
  ["infestation", "infestación", "Infestation", "#8C9B8E"]
];

export function potionItems(lang) {
  const out = [];
  for (const t of TYPES) {
    // item base (por si la API no lo trae)
    out.push({
      id: t.base, icon: t.base, stack: t.stack, cat: "pociones", en: t.en,
      name: lang?.[`item.minecraft.${t.base}`] || t.es
    });
    for (const [key, es, en, color] of EFFECTS) {
      out.push({
        id: `${t.base}__${key}`, icon: t.base, stack: t.stack, cat: "pociones", color,
        en: `${t.en} · ${en}`,
        name: lang?.[`item.minecraft.${t.base}.effect.${key}`] || `${t.es} · ${es}`
      });
    }
  }
  return out;
}