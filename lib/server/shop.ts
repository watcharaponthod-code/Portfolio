// Tools for the shop chat agent demo. Every price, stock check and total comes
// from here, never from the model, so the bot cannot invent a price.

export type Product = { name: string; price: number; stock: number; note: string };
export type Line = { name: string; qty: number };
export type Customer = { name: string; phone: string; address: string };

export const SHIPPING = { fee: 40, freeOver: 500 };
export const MAX_PRODUCTS = 40;

const norm = (s: unknown) => String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ');

// Trust boundary: the catalog comes from the browser.
export function cleanCatalog(raw: unknown): Product[] {
  if (!Array.isArray(raw)) return [];
  const out: Product[] = [];
  for (const r of raw.slice(0, MAX_PRODUCTS)) {
    const name = String(r?.name ?? '').trim().slice(0, 80);
    const price = Number(r?.price);
    const stock = Math.floor(Number(r?.stock));
    if (!name || !Number.isFinite(price) || price < 0 || price > 1e7) continue;
    out.push({ name, price, stock: Number.isFinite(stock) && stock >= 0 ? stock : 0, note: String(r?.note ?? '').trim().slice(0, 200) });
  }
  return out;
}

export function findProduct(catalog: Product[], name: string): Product | undefined {
  const n = norm(name);
  if (!n) return undefined;
  return catalog.find(p => norm(p.name) === n)
    || catalog.find(p => norm(p.name).includes(n) || n.includes(norm(p.name)));
}

export function search(catalog: Product[], query: string) {
  const words = norm(query).split(' ').filter(Boolean);
  const hits = catalog.filter(p => {
    const hay = norm(p.name + ' ' + p.note);
    return words.some(w => hay.includes(w) || w.includes(norm(p.name)));
  });
  // Thai has no spaces between words, so a miss falls back to the whole (small) catalog.
  return { matched: hits.length > 0, products: hits.length ? hits : catalog };
}

export function quote(catalog: Product[], lines: Line[]) {
  const problems: string[] = [];
  const items: { name: string; qty: number; unit_price: number; subtotal: number }[] = [];
  for (const l of Array.isArray(lines) ? lines.slice(0, 20) : []) {
    const qty = Math.floor(Number(l?.qty));
    const p = findProduct(catalog, l?.name);
    if (!p) { problems.push(`not in catalog: ${String(l?.name).slice(0, 80)}`); continue; }
    if (!Number.isFinite(qty) || qty < 1) { problems.push(`bad quantity for ${p.name}`); continue; }
    if (qty > p.stock) { problems.push(`only ${p.stock} of ${p.name} in stock`); continue; }
    items.push({ name: p.name, qty, unit_price: p.price, subtotal: p.price * qty });
  }
  if (!items.length && !problems.length) problems.push('no items');
  const subtotal = items.reduce((s, i) => s + i.subtotal, 0);
  const shipping = subtotal === 0 || subtotal >= SHIPPING.freeOver ? 0 : SHIPPING.fee;
  return { ok: problems.length === 0, items, subtotal, shipping, total: subtotal + shipping, currency: 'THB', problems };
}

export function createOrder(catalog: Product[], lines: Line[], customer: Partial<Customer>, now = Date.now()) {
  const q = quote(catalog, lines);
  const missing = (['name', 'phone', 'address'] as const).filter(k => !String(customer?.[k] ?? '').trim());
  const problems = [...q.problems, ...missing.map(k => `missing customer ${k}`)];
  if (problems.length) return { ...q, ok: false, problems };
  return {
    ...q,
    order_id: 'ORD-' + now.toString(36).toUpperCase(),
    customer: { name: String(customer.name).slice(0, 80), phone: String(customer.phone).slice(0, 30), address: String(customer.address).slice(0, 300) },
    status: 'awaiting_payment',
  };
}
