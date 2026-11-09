// Uso: node scripts/descargar-imagenes.js   (Node 18+)
// Descarga las texturas a images/items/ y luego pon USE_LOCAL = true en js/config.js
import { mkdir, writeFile } from "node:fs/promises";
import { ITEMS } from "../js/data.js";
import { REMOTE_BASE } from "../js/config.js";

await mkdir("images/items", { recursive: true });
let ok = 0, fail = 0;
for (const { id } of ITEMS) {
  const rutas = id.includes("/") ? [id] : [`item/${id}`, `block/${id}`];
  let guardado = false;
  for (const r of rutas) {
    const res = await fetch(`${REMOTE_BASE}${r}.png`);
    if (!res.ok) continue;
    await writeFile(`images/items/${id.replace("/", "_")}.png`, Buffer.from(await res.arrayBuffer()));
    guardado = true; break;
  }
  guardado ? ok++ : (fail++, console.log("Sin textura:", id));
}
console.log(`Listo: ${ok} descargadas, ${fail} fallidas`);