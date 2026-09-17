const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM} = require('../tooling/node_modules/jsdom');
const script = fs.readFileSync('theme/assets/kneora.js','utf8');
function setup() {
 const dom = new JSDOM(`<body data-root="/en/" data-cart-url="/en/cart"><span data-cart-count>0</span><dialog id="CartDrawer"><div data-cart-content></div></dialog><kneora-product data-add="Add to cart" data-sold="Sold out" data-adding="Adding" data-error="Try again" data-added="Added"><form class="product-form"><label class="offer"><input type="radio" name="id" value="11" checked data-title="Single" data-price="$120.00" data-available="true"></label><label class="offer"><input type="radio" name="id" value="12" data-title="Device + Gel" data-price="$140.00" data-available="true"></label><label class="offer"><input type="radio" name="id" value="13" data-title="Sold" data-price="$150.00" data-available="false"></label><input name="quantity" value="2" type="number" min="1"><button data-add-button type="submit">Add</button><p data-product-status></p></form><strong data-selected-price></strong><span data-selected-title></span><strong data-sticky-price></strong><button data-add-button></button></kneora-product></body>`,{url:'https://example.com/en/products/kneora?utm_source=meta',runScripts:'outside-only'});
 dom.window.HTMLDialogElement.prototype.showModal=function(){this.open=true};
 dom.window.HTMLDialogElement.prototype.close=function(){this.open=false};
 dom.window.eval(script);
 return dom;
}
test('offer selection updates all prices, preserves quantity and campaign query',()=>{
 const dom=setup(),w=dom.window,d=w.document;
 const input=d.querySelector('[value="12"]');input.checked=true;input.dispatchEvent(new w.Event('change',{bubbles:true}));
 assert.equal(d.querySelector('[data-selected-price]').textContent,'$140.00');
 assert.equal(d.querySelector('[data-sticky-price]').textContent,'$140.00');
 assert.equal(d.querySelector('[data-selected-title]').textContent,'Device + Gel');
 assert.equal(d.querySelector('[name=quantity]').value,'2');
 assert.equal(new URL(w.location).searchParams.get('utm_source'),'meta');
 assert.equal(new URL(w.location).searchParams.get('variant'),'12');dom.window.close();
});
test('sold-out offer disables both purchase buttons',()=>{
 const dom=setup(),d=dom.window.document,i=d.querySelector('[value="13"]');i.checked=true;i.dispatchEvent(new dom.window.Event('change',{bubbles:true}));
 assert.ok([...d.querySelectorAll('[data-add-button]')].every(b=>b.disabled&&b.textContent==='Sold out'));dom.window.close();
});
test('cart uses selected real variant and quantity, with locale-aware endpoint',async()=>{
 const dom=setup(),w=dom.window,d=w.document,calls=[];
 w.fetch=async(url,opts)=>{calls.push({url,opts});return {ok:true,json:async()=>url.endsWith('cart.js')?{item_count:2}:{id:12},text:async()=>'<p>Bundle added</p>'}};
 const i=d.querySelector('[value="12"]');i.checked=true;i.dispatchEvent(new w.Event('change',{bubbles:true}));
 await d.querySelector('kneora-product').add({preventDefault(){}});
 assert.equal(calls[0].url,'/en/cart/add.js');assert.equal(calls[0].opts.body.get('id'),'12');assert.equal(calls[0].opts.body.get('quantity'),'2');
 assert.equal(d.querySelector('[data-cart-count]').textContent,'2');assert.equal(d.querySelector('#CartDrawer').open,true);dom.window.close();
});
test('server rejection is shown and allows retry without false success',async()=>{
 const dom=setup(),w=dom.window,d=w.document;
 w.fetch=async()=>({ok:false,json:async()=>({description:'Not enough inventory'})});
 await d.querySelector('kneora-product').add({preventDefault(){}});
 assert.equal(d.querySelector('[data-product-status]').textContent,'Not enough inventory');assert.equal(d.querySelector('[data-add-button]').disabled,false);assert.equal(d.querySelector('#CartDrawer').open,false);dom.window.close();
});
test('duplicate submission is suppressed while request is pending',async()=>{
 const dom=setup(),w=dom.window,d=w.document;let count=0,release;
 w.fetch=async()=>{count++;await new Promise(resolve=>release=resolve);return{ok:false,json:async()=>({description:'Unavailable'})}};
 const p=d.querySelector('kneora-product');const first=p.add({preventDefault(){}});await p.add({preventDefault(){}});assert.equal(count,1);release();await first;dom.window.close();
});
test('locale root without trailing slash produces valid cart routes',async()=>{
 const dom=setup(),d=dom.window.document;d.body.dataset.root='/en';let url;
 dom.window.fetch=async u=>{url=u;return{ok:false,json:async()=>({description:'Stopped'})}};
 await d.querySelector('kneora-product').add({preventDefault(){}});assert.equal(url,'/en/cart/add.js');dom.window.close();
});
