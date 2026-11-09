import { ITEM_API, ITEM_API_SIZE, TEXTURES_BASE, GALLERY_BASE, ALIASES, PLACEHOLDER, MAX_SLOTS_SHOWN } from "./config.js";

const $ = (id) => document.getElementById(id);
const plural = (n, a, b) => `${n} ${n === 1 ? a : b}`;

// Rutas candidatas, en orden: API de items -> texturas (item, block y caras) -> galería -> placeholder
function candidates(id) {
  const n = ALIASES[id] || id, t = TEXTURES_BASE;
  return [
    `${ITEM_API}/api/item/${id}/size=${ITEM_API_SIZE}`,
    `${t}/item/${n}.png`, `${t}/block/${n}.png`, `${t}/item/${n}_00.png`,
    `${t}/block/${n}_front.png`, `${t}/block/${n}_side.png`, `${t}/block/${n}_top.png`,
    `${GALLERY_BASE}/${id}.png`, PLACEHOLDER
  ];
}

export function setIcon(img, id) {
  const urls = candidates(id);
  let i = 0;
  img.onerror = () => { if (++i < urls.length) img.src = urls[i]; else img.onerror = null; };
  img.src = urls[0];
}

// Pestañas con icono (como el inventario creativo). Se construyen una vez.
export function buildTabs(cats, onSelect) {
  const box = $("tabs");
  box.innerHTML = "";
  for (const c of cats) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "tab"; b.dataset.key = c.key;
    b.setAttribute("role", "tab"); b.setAttribute("aria-selected", "false");
    const img = document.createElement("img"); img.alt = ""; setIcon(img, c.icon);
    b.appendChild(img); b.onclick = () => onSelect(c.key); box.appendChild(b);
  }
}

export function updateTabs(cats, active, counts) {
  for (const b of $("tabs").children) {
    const c = cats.find((x) => x.key === b.dataset.key);
    const text = `${c.label} (${counts[c.key] || 0})`;
    b.title = text; b.setAttribute("aria-label", text);
    b.setAttribute("aria-selected", c.key === active);
  }
}

export function renderGrid(items, selectedId, onPick) {
  const grid = $("grid");
  grid.innerHTML = "";
  if (!items.length) {
    grid.innerHTML = '<p class="empty">No hay items con ese nombre.</p>';
    return;
  }
  for (const it of items) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "tile"; b.title = it.en && it.en !== it.name ? `${it.name} (${it.en})` : it.name;
    b.setAttribute("aria-label", `${it.name}, stack de ${it.stack}`);
    b.setAttribute("aria-pressed", it.id === selectedId);
    const img = document.createElement("img");
    img.loading = "lazy"; img.alt = ""; setIcon(img, it.id);
    const tag = document.createElement("b"); tag.textContent = it.stack > 1 ? it.stack : "";
    b.append(img, tag);
    b.onclick = () => onPick(it);
    grid.appendChild(b);
  }
}

export function showPicked(it) {
  const img = $("pickedImg");
  setIcon(img, it.id);
  img.classList.add("on");
  $("pickedName").textContent = `${it.name} · stack de ${it.stack}`;
}

export function renderResult(total, stackSize, r, item) {
  const big = $("big"), meta = $("meta"), slots = $("slots"), note = $("note");
  slots.innerHTML = ""; note.textContent = ""; meta.textContent = "";
  if (r === null) { big.textContent = "Escribe una cantidad"; return; }
  if (total === 0) { big.textContent = "0 items"; return; }

  if (stackSize === 1) {
    big.innerHTML = `<em>${total}</em> ${total === 1 ? "item suelto" : "items sueltos"}`;
    meta.textContent = "Este item no se apila: cada uno ocupa un espacio.";
  } else {
    const parts = [];
    if (r.stacks) parts.push(`<em>${plural(r.stacks, "stack", "stacks")}</em>`);
    if (r.resto) parts.push(`<em>${plural(r.resto, "item", "items")}</em>`);
    big.innerHTML = parts.join(" y ");
    meta.textContent = `${total} items = ${r.stacks} × ${stackSize}${r.resto ? " + " + r.resto : ""}`;
  }
  meta.textContent += ` · Ocupa ${plural(r.usados, "espacio", "espacios")} (${plural(r.cofres, "cofre doble", "cofres dobles")} o ${plural(r.shulkers, "shulker", "shulkers")})`;
  big.classList.remove("bump"); void big.offsetWidth; big.classList.add("bump");

  const show = Math.min(r.usados, MAX_SLOTS_SHOWN);
  for (let i = 0; i < show; i++) {
    const parcial = i === r.usados - 1 && r.resto > 0;
    const d = document.createElement("div");
    d.className = "slot" + (parcial ? " part" : "");
    d.style.setProperty("--i", i);
    if (item) { const img = document.createElement("img"); img.alt = ""; setIcon(img, item.id); d.appendChild(img); }
    const c = document.createElement("span"); c.textContent = parcial ? r.resto : stackSize;
    d.appendChild(c); slots.appendChild(d);
  }
  if (r.usados > MAX_SLOTS_SHOWN) note.textContent = "Se muestran los primeros 54 espacios (un cofre doble).";
}