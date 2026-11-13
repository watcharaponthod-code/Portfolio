// Run: node --experimental-strip-types lib/server/shop.selfcheck.ts
import assert from 'node:assert/strict';
import { cleanCatalog, quote, createOrder, search, findProduct } from './shop.ts';

const cat = cleanCatalog([
  { name: 'กาแฟดอยช้าง 250g', price: 290, stock: 5, note: 'คั่วกลาง' },
  { name: 'ดริปเปอร์ V60', price: 450, stock: 1 },
  { name: '', price: 10, stock: 1 },          // dropped: no name
  { name: 'ของพัง', price: 'abc', stock: 1 }, // dropped: bad price
]);
assert.equal(cat.length, 2);

assert.equal(findProduct(cat, 'ดอยช้าง')?.price, 290);
assert.equal(search(cat, 'คั่วกลาง').products.length, 1);
assert.equal(search(cat, 'มีอะไรขายบ้าง').products.length, 2); // miss falls back to everything

let q = quote(cat, [{ name: 'ดอยช้าง', qty: 1 }]);
assert.deepEqual([q.subtotal, q.shipping, q.total, q.ok], [290, 40, 330, true]);

q = quote(cat, [{ name: 'ดอยช้าง', qty: 2 }]);
assert.deepEqual([q.subtotal, q.shipping, q.total], [580, 0, 580]); // free shipping from 500

q = quote(cat, [{ name: 'ดริปเปอร์ V60', qty: 2 }]);
assert.equal(q.ok, false); // only 1 in stock
assert.equal(quote(cat, [{ name: 'ชาเขียว', qty: 1 }]).ok, false); // not in catalog
assert.equal(quote(cat, [{ name: 'ดอยช้าง', qty: -3 }]).ok, false);

const noAddr = createOrder(cat, [{ name: 'ดอยช้าง', qty: 1 }], { name: 'สมชาย', phone: '0800000000' });
assert.equal(noAddr.ok, false);
assert.ok(!('order_id' in noAddr));

const ok = createOrder(cat, [{ name: 'ดอยช้าง', qty: 1 }], { name: 'สมชาย', phone: '0800000000', address: 'กทม.' }, 1e12);
assert.equal(ok.ok, true);
assert.equal((ok as any).order_id, 'ORD-CRE66I9S');
assert.equal(ok.total, 330);

console.log('shop self-check passed');
