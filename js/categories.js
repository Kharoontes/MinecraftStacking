// Categorías de items. Ni minecraft-data ni Mojang las publican, así que se asignan por el id
// (y por foods.json de minecraft-data para la comida). Es una clasificación aproximada.
export const CATEGORIES = [
  { key: "all",          label: "Todos",               icon: "chest" },
  { key: "construccion", label: "Construcción",        icon: "bricks" },
  { key: "naturaleza",   label: "Naturaleza",          icon: "grass_block" },
  { key: "minerales",    label: "Minerales",           icon: "diamond" },
  { key: "decoracion",   label: "Decoración",          icon: "painting" },
  { key: "funcional",    label: "Bloques funcionales", icon: "crafting_table" },
  { key: "redstone",     label: "Redstone",            icon: "redstone" },
  { key: "transporte",   label: "Transporte",          icon: "minecart" },
  { key: "herramientas", label: "Herramientas",        icon: "diamond_pickaxe" },
  { key: "combate",      label: "Combate y armaduras", icon: "iron_sword" },
  { key: "comida",       label: "Comida",              icon: "cooked_beef" },
  { key: "pociones",     label: "Pociones y magia",    icon: "potion" },
  { key: "huevos",       label: "Huevos y discos",     icon: "creeper_spawn_egg" },
  { key: "varios",       label: "Varios",              icon: "stick" }
];

const FOOD = /(^|_)(beef|porkchop|chicken|mutton|rabbit|cod|salmon|tropical_fish|pufferfish)$|^cooked_|_stew$|_soup$|^(bread|apple|golden_apple|enchanted_golden_apple|cookie|cake|pumpkin_pie|melon_slice|sweet_berries|glow_berries|dried_kelp|beetroot|baked_potato|poisonous_potato|potato|carrot|golden_carrot|chorus_fruit|honey_bottle|rotten_flesh|spider_eye)$/;

// Orden importa: gana la primera regla que coincida.
const RULES = [
  ["huevos",       /_spawn_egg$|^music_disc_|^disc_fragment_/],
  ["pociones",     /(^|_)potion$|^tipped_arrow$|^enchanted_book$|^experience_bottle$|^ominous_bottle$|^(blaze_powder|ghast_tear|fermented_spider_eye|glistering_melon_slice|magma_cream|nether_wart|phantom_membrane|rabbit_foot|dragon_breath)$/],
  ["combate",      /_(sword|spear|helmet|chestplate|leggings|boots|horse_armor)$|^(bow|crossbow|trident|mace|arrow|spectral_arrow|shield|totem_of_undying|elytra|wolf_armor|fire_charge|wind_charge)$/],
  ["herramientas", /_(pickaxe|axe|shovel|hoe)$|_bucket$|_bundle$|^(bucket|bundle|shears|flint_and_steel|fishing_rod|brush|spyglass|compass|recovery_compass|clock|lead|name_tag|map|filled_map|carrot_on_a_stick|warped_fungus_on_a_stick|goat_horn|debug_stick|writable_book|written_book|knowledge_book)$/],
  ["comida",       null], // usa foods.json + FOOD
  ["transporte",   /rail$|minecart|_boat$|_raft$|^saddle$/],
  ["minerales",    /_ore$|^raw_|_ingot$|_nugget$|^(coal|charcoal|diamond|emerald|lapis_lazuli|quartz|amethyst_shard|netherite_scrap|echo_shard|prismarine_shard|prismarine_crystals|glowstone_dust|resin_clump|nether_star|heart_of_the_sea|nautilus_shell|ancient_debris)$/],
  ["redstone",     /^redstone($|_)|(^|_)(repeater|comparator|piston|observer|hopper|dropper|dispenser|lever|pressure_plate|daylight_detector|note_block|tripwire_hook|lightning_rod|crafter|slime_block|honey_block|bell)$|^tnt$|^target$|^tripwire$|_button$|_pressure_plate$|_door$|_trapdoor$|_fence_gate$|sculk_(sensor|shrieker)$/],
  ["decoracion",   /_banner$|banner_pattern$|_bed$|_carpet$|_candle$|^candle$|^flower_pot$|^painting$|^(glow_)?item_frame$|^armor_stand$|_sign$|_head$|_skull$|lantern$|^torch$|_torch$|^chain$|glass_pane$|shulker_box$|_pottery_sherd$|^decorated_pot$|^end_rod$|_dye$|_smithing_template$/],
  ["funcional",    /^(crafting_table|furnace|blast_furnace|smoker|chest|trapped_chest|ender_chest|barrel|(chipped_|damaged_)?anvil|enchanting_table|brewing_stand|cauldron|beacon|conduit|loom|grindstone|smithing_table|cartography_table|fletching_table|stonecutter|jukebox|composter|lectern|respawn_anchor|lodestone|campfire|soul_campfire|bookshelf|chiseled_bookshelf|end_portal_frame|spawner|trial_spawner|vault|command_block|chain_command_block|repeating_command_block|structure_block|jigsaw|structure_void|light|barrier|beehive|bee_nest|scaffolding|ladder)$/],
  ["naturaleza",   /^(stone|granite|diorite|andesite|deepslate|tuff|calcite|dripstone_block|pointed_dripstone|obsidian|crying_obsidian|bedrock|netherrack|soul_sand|soul_soil|basalt|blackstone|magma_block|end_stone|glowstone|sponge|wet_sponge|cobweb|hay_block|bone_block|honeycomb|honeycomb_block|amethyst_block|budding_amethyst|small_amethyst_bud|medium_amethyst_bud|large_amethyst_bud|amethyst_cluster|sculk|sculk_vein|sculk_catalyst|packed_mud|mud|clay|clay_ball|gravel|sand|red_sand|dirt|coarse_dirt|rooted_dirt|dirt_path|grass_block|podzol|mycelium|crimson_nylium|warped_nylium|moss_block|moss_carpet|snow|snow_block|snowball|ice|packed_ice|blue_ice|nether_wart_block|warped_wart_block|shroomlight|dried_kelp_block|turtle_egg|sniffer_egg|dragon_egg|frogspawn|lily_pad|vine|glow_lichen|hanging_roots|spore_blossom|big_dripleaf|small_dripleaf|azalea|flowering_azalea|cactus|sugar_cane|bamboo|kelp|seagrass|sea_pickle|short_grass|tall_grass|fern|large_fern|dead_bush|pumpkin|carved_pumpkin|melon|brown_mushroom|red_mushroom|brown_mushroom_block|red_mushroom_block|mushroom_stem|chorus_flower|chorus_plant|torchflower|pitcher_plant|dandelion|poppy|blue_orchid|allium|azure_bluet|red_tulip|orange_tulip|white_tulip|pink_tulip|oxeye_daisy|cornflower|lily_of_the_valley|wither_rose|sunflower|lilac|rose_bush|peony|pink_petals|wildflowers|leaf_litter|bush|firefly_bush|cactus_flower)$|_leaves$|_sapling$|_log$|_wood$|_stem$|_hyphae$|_roots$|_fungus$|_seeds$|_vines$|_propagule$|(^|_)coral(_|$)|_coral_(fan|block)$|_froglight$/],
  ["construccion", /planks$|_stairs$|_slab$|_wall$|_fence$|brick|concrete|terracotta|_wool$|(^|_)glass$|cobblestone|polished_|smooth_|cut_|chiseled_|_pillar$|_block$|^purpur|prismarine|quartz_|sandstone|copper|_bars$|_tiles$|_pane$/]
];

export function categorize(id, foods) {
  for (const [key, re] of RULES) {
    if (key === "comida") { if ((foods && foods.has(id)) || FOOD.test(id)) return key; continue; }
    if (re.test(id)) return key;
  }
  return "varios";
}