import { loadItems } from "./data.js";
import { calcular } from "./calc.js";
import { CATEGORIES } from "./categories.js";
import { renderGrid, showPicked, renderResult, buildTabs, updateTabs } from "./ui.js";

const $ = (id) => document.getElementById(id);
const q = $("q"), nEl = $("n");
let cat = "all", picked = null, ITEMS = [];

const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function counts() {
  const c = { all: ITEMS.length };
  for (const i of ITEMS) c[i.cat] = (c[i.cat] || 0) + 1;
  return c;
}

function pick(it) {
  picked = it;
  showPicked(it); refreshGrid(); update(); nEl.focus();
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
update();
loadItems().then(({ items }) => {
  ITEMS = items;
  updateTabs(CATEGORIES, cat, counts());
  refreshGrid();
});