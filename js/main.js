import { loadItems } from "./data.js";
import { calcular } from "./calc.js";
import { renderGrid, showPicked, renderResult } from "./ui.js";

const $ = (id) => document.getElementById(id);
const q = $("q"), nEl = $("n"), sEl = $("s"), chips = $("chips");
let filter = 0, picked = null, ITEMS = [];

const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function pick(it) {
  picked = it; sEl.value = it.stack;
  showPicked(it); refreshGrid(); update(); nEl.focus();
}

function refreshGrid() {
  const term = norm(q.value.trim());
  const rows = ITEMS.filter((i) => (!filter || i.stack === filter) && norm(`${i.name} ${i.en} ${i.id}`).includes(term));
  renderGrid(rows, picked && picked.id, pick);
}

function update() {
  const total = Math.floor(+nEl.value), s = Math.floor(+sEl.value);
  if (!nEl.value || total < 0 || !s || s < 1) return renderResult(0, 0, null, null);
  renderResult(total, s, calcular(total, s), picked);
}

[["Todos", 0], ["64", 64], ["16", 16], ["No apilables", 1]].forEach(([label, v]) => {
  const b = document.createElement("button");
  b.type = "button"; b.className = "chip"; b.textContent = label; b.setAttribute("aria-pressed", v === 0);
  b.onclick = () => {
    filter = v;
    [...chips.children].forEach((c) => c.setAttribute("aria-pressed", c === b));
    refreshGrid();
  };
  chips.appendChild(b);
});

q.addEventListener("input", refreshGrid);
nEl.addEventListener("input", update);
sEl.addEventListener("input", update);
$("grid").innerHTML = '<p class="empty">Cargando items desde la API…</p>';
update();
loadItems().then(({ items, fromApi }) => {
  ITEMS = items;
  $("status").textContent = fromApi ? `${items.length} items cargados desde la API` : "";
  refreshGrid();
});