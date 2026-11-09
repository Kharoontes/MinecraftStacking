import { CHEST_SLOTS, SHULKER_SLOTS } from "./config.js";

export function calcular(total, stackSize) {
  const stacks = Math.floor(total / stackSize);
  const resto = total % stackSize;
  const usados = stacks + (resto ? 1 : 0);
  return {
    stacks, resto, usados,
    cofres: Math.ceil(usados / CHEST_SLOTS),
    shulkers: Math.ceil(usados / SHULKER_SLOTS)
  };
}
