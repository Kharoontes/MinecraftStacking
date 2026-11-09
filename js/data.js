// [id de textura, nombre, ...]. Si el id lleva "/", se usa tal cual (ej. block/tnt_side).
const GROUPS = {
  64: [
    ["stone","Piedra"],["cobblestone","Adoquín"],["dirt","Tierra"],["sand","Arena"],["gravel","Grava"],
    ["oak_log","Troncos de roble"],["oak_planks","Tablones de roble"],["stick","Palo"],["coal","Carbón"],
    ["iron_ingot","Lingote de hierro"],["gold_ingot","Lingote de oro"],["copper_ingot","Lingote de cobre"],
    ["netherite_ingot","Lingote de netherita"],["diamond","Diamante"],["emerald","Esmeralda"],
    ["redstone","Redstone"],["lapis_lazuli","Lapislázuli"],["quartz","Cuarzo"],["torch","Antorcha"],
    ["glass","Cristal"],["brick","Ladrillo"],["obsidian","Obsidiana"],["leather","Cuero"],["paper","Papel"],
    ["book","Libro"],["wheat","Trigo"],["carrot","Zanahoria"],["potato","Patata"],["bread","Pan"],
    ["apple","Manzana"],["cooked_beef","Filete cocido"],["cooked_porkchop","Cerdo cocinado"],
    ["cooked_chicken","Pollo cocinado"],["bone","Hueso"],["bone_meal","Polvo de hueso"],["gunpowder","Pólvora"],
    ["string","Cuerda"],["feather","Pluma"],["white_wool","Lana"],["block/tnt_side","TNT"],["arrow","Flecha"],
    ["slime_ball","Bola de slime"],["melon_slice","Rodaja de sandía"],["block/pumpkin_side","Calabaza"],
    ["sugar_cane","Caña de azúcar"],["wheat_seeds","Semillas de trigo"],["ender_eye","Ojo de ender"],
    ["firework_rocket","Cohete"],["item_frame","Marco de objetos"],["rotten_flesh","Carne podrida"],
    ["spider_eye","Ojo de araña"],["blaze_powder","Polvo de blaze"],["blaze_rod","Vara de blaze"],
    ["ghast_tear","Lágrima de ghast"],["golden_apple","Manzana dorada"],["golden_carrot","Zanahoria dorada"],
    ["rail","Rail"],["block/crafting_table_front","Mesa de crafteo"],["block/furnace_front","Horno"],
    ["glowstone_dust","Polvo de glowstone"],["block/netherrack","Netherrack"],["block/glowstone","Glowstone"],
    ["block/hay_block_side","Bala de heno"],["cocoa_beans","Cacao"],["block/iron_block","Bloque de hierro"],
    ["block/diamond_block","Bloque de diamante"],["block/gold_block","Bloque de oro"],
    ["block/redstone_block","Bloque de redstone"],["bamboo","Bambú"],["sweet_berries","Bayas dulces"],
    ["cod","Bacalao"],["salmon","Salmón"]
  ],
  16: [
    ["ender_pearl","Perla de ender"],["egg","Huevo"],["snowball","Bola de nieve"],["bucket","Cubo vacío"],
    ["oak_sign","Cartel"],["white_banner","Estandarte"],["armor_stand","Soporte de armadura"],
    ["honey_bottle","Botella de miel"]
  ],
  1: [
    ["diamond_sword","Espada de diamante"],["netherite_sword","Espada de netherita"],
    ["diamond_pickaxe","Pico de diamante"],["netherite_pickaxe","Pico de netherita"],
    ["diamond_axe","Hacha de diamante"],["diamond_shovel","Pala de diamante"],["diamond_hoe","Azada de diamante"],
    ["diamond_helmet","Casco de diamante"],["diamond_chestplate","Peto de diamante"],
    ["diamond_leggings","Pantalones de diamante"],["diamond_boots","Botas de diamante"],
    ["netherite_chestplate","Peto de netherita"],["iron_chestplate","Peto de hierro"],["bow","Arco"],
    ["crossbow_standby","Ballesta"],["trident","Tridente"],["shield","Escudo"],["elytra","Élitros"],
    ["totem_of_undying","Tótem de inmortalidad"],["fishing_rod","Caña de pescar"],["shears","Tijeras"],
    ["flint_and_steel","Mechero"],["water_bucket","Cubo de agua"],["lava_bucket","Cubo de lava"],
    ["milk_bucket","Cubo de leche"],["potion","Poción"],["enchanted_book","Libro encantado"],
    ["red_bed","Cama"],["oak_boat","Bote"],["minecart","Vagoneta"],["cake","Pastel"],
    ["mushroom_stew","Estofado de champiñones"],["saddle","Silla de montar"],["music_disc_13","Disco de música"],
    ["compass","Brújula"],["clock","Reloj"]
  ]
};

export const ITEMS = Object.entries(GROUPS)
  .flatMap(([stack, list]) => list.map(([id, name]) => ({ id, name, stack: +stack })))
  .sort((a, b) => a.name.localeCompare(b.name, "es"));
