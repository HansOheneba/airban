import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Pulls the number out of a stored price such as "GHS 9000.00". */
export function priceValue(price: string | number) {
  if (typeof price === "number") return price;
  const value = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

export function formatGhs(value: number) {
  return `GHS ${value.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Shows a short message at the bottom of the screen. */
export function toast(message: string) {
  const el = document.createElement("div");
  el.textContent = message;
  el.setAttribute("role", "status");
  el.className =
    "fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg z-50 text-sm font-medium shadow-lg animate-fade-in-up";
  document.body.appendChild(el);
  window.setTimeout(() => {
    el.classList.remove("animate-fade-in-up");
    el.classList.add("animate-fade-out");
    window.setTimeout(() => el.remove(), 300);
  }, 2000);
}

/** Floor area for display; listings without a measured size read "Size on request". */
export function formatArea(area: string) {
  return /^\d[\d,.]*$/.test(area.trim()) ? `${area.trim()} sqm` : "Size on request";
}
