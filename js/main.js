import { loadItems } from "./data.js";
import { calcular } from "./calc.js";
import { CATEGORIES } from "./categories.js";
import { renderGrid, showPicked, renderResult, buildTabs, updateTabs, renderCraft } from "./ui.js";

const $ = (id) => document.getElementById(id);
const q = $("q"), nEl = $("n");
let cat = "all", picked = null, ITEMS = [], BY_ID = {}, RECIPES = null, recState = "loading", ri = 0;

const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function counts() {
  const c = { all: ITEMS.length };
  for (const i of ITEMS) c[i.cat] = (c[i.cat] || 0) + 1;
  return c;
}

function drawCraft() {
  const list = (RECIPES && picked && RECIPES[picked.id]) || [];
  renderCraft($("craft"), picked, list, ri, recState, {
    nameOf: (id) => BY_ID[id]?.name || id,
    onPick: (id) => { if (BY_ID[id]) pick(BY_ID[id]); },
    onNav: (d) => { ri = (ri + d + list.length) % list.length; drawCraft(); }
  });
}

function pick(it) {
  picked = it; ri = 0;
  showPicked(it); drawCraft(); refreshGrid(); update(); nEl.focus();
}

// Con texto en el buscador se busca en todas las categorías
function refreshGrid() {
  const term = norm(q.value.trim());
  const rows = ITEMS.filter((i) =>
    term ? norm(`${i.name} ${i.en} ${i.id}`).includes(term) : cat === "all" || i.cat === cat);
  renderGrid(rows, picked && picked.id, pick);
  const label = term ? "Resultados de la búsqueda" : CATEGORIES.find((c) => c.key === cat).label;
  $("status").textContent = ITEMS.length ? `${label} · ${rows.length} items` : "";
}

function selectCat(key) {
  cat = key; q.value = "";
  updateTabs(CATEGORIES, cat, counts());
  refreshGrid();
  $("grid").scrollTop = 0;
}

function update() {
  const total = Math.floor(+nEl.value);
  if (!picked || !nEl.value || total < 0) {
    renderResult(0, 0, null, null);
    if (!picked) $("big").textContent = "Elige un item";
    return;
  }
  const s = picked.stack;   // el tamaño de stack sale del item elegido
  renderResult(total, s, calcular(total, s), picked);
}

buildTabs(CATEGORIES, selectCat);
updateTabs(CATEGORIES, cat, counts());
q.addEventListener("input", refreshGrid);
nEl.addEventListener("input", update);
$("grid").innerHTML = '<p class="empty">Cargando items desde la API…</p>';
update(); drawCraft();
loadItems().then(({ items, recipes }) => {
  ITEMS = items;
  BY_ID = Object.fromEntries(items.map((i) => [i.id, i]));
  RECIPES = recipes; recState = recipes ? "ready" : "unavailable";
  drawCraft();
  updateTabs(CATEGORIES, cat, counts());
  refreshGrid();
});