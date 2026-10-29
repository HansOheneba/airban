export type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  orientation: string;
  quantity: number;
};

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem("cart") || "[]") as CartItem[];
    return Array.isArray(parsed) ? parsed.map((item) => ({ ...item, orientation: item.orientation ?? "" })) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  window.localStorage.setItem("cart", JSON.stringify(items));
  window.dispatchEvent(new Event("cartUpdated"));
}

export function addToCart(item: Omit<CartItem, "quantity">, quantity: number) {
  const items = readCart();
  const existing = items.find((entry) => entry.id === item.id && entry.orientation === item.orientation);
  if (existing) existing.quantity += quantity;
  else items.push({ ...item, quantity });
  writeCart(items);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((total, item) => total + (item.quantity || 1), 0);
}
