import React, { useMemo, useState } from 'react';
import CodeViewer from '../CodeViewer';

const productsData = [
  { id: 'p1', name: 'Pro Hoodie', price: 65, tag: 'apparel' },
  { id: 'p2', name: 'Dev Tee', price: 28, tag: 'apparel' },
  { id: 'p3', name: 'Sticker Pack', price: 7, tag: 'swag' },
  { id: 'p4', name: 'Desk Mat', price: 35, tag: 'gear' },
];

const logic = `// Deterministic cart operations
function addToCart(cart, product){
  const next = new Map(cart);
  next.set(product.id, (next.get(product.id)||0)+1);
  return next;
}
function cartTotal(cart, products){
  let sum = 0;
  for (const [id, qty] of cart){
    const p = products.find(x=>x.id===id);
    if (p) sum += p.price * qty;
  }
  return sum;
}
`;

const EcommerceDemo = () => {
  const [tag, setTag] = useState('all');
  const [cart, setCart] = useState(new Map());
  const [openCode, setOpenCode] = useState(false);

  const products = useMemo(() => {
    return tag==='all' ? productsData : productsData.filter(p=>p.tag===tag);
  }, [tag]);

  const handleAdd = (p) => {
    const next = new Map(cart);
    next.set(p.id, (next.get(p.id)||0)+1);
    setCart(next);
  };
  const total = useMemo(()=>{
    let sum = 0; for (const [id, qty] of cart){ const p=productsData.find(x=>x.id===id); if(p) sum+=p.price*qty; }
    return sum;
  },[cart]);

  return (
    <div className="grid md:grid-cols-[1fr,320px] gap-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Catalog</h3>
          <div className="flex items-center gap-2">
            {['all','apparel','swag','gear'].map(t => (
              <button key={t} onClick={()=>setTag(t)} className={`text-sm px-3 py-1 rounded ${tag===t?'bg-primary/20 text-primary':'bg-gray-800 text-gray-300'}`}>{t}</button>
            ))}
            <button onClick={()=>setOpenCode(true)} className="text-primary hover:text-emerald-300 text-sm">View code</button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-gray-800 border border-gray-700 rounded p-4">
              <div className="text-gray-200 font-medium">{p.name}</div>
              <div className="text-gray-400 text-sm mb-3">${p.price.toFixed(2)}</div>
              <button onClick={()=>handleAdd(p)} className="text-xs bg-primary/20 text-primary px-3 py-1 rounded">Add to cart</button>
            </div>
          ))}
        </div>
      </div>
      <aside className="bg-gray-900 border border-gray-800 rounded p-4">
        <h4 className="font-semibold mb-3">Cart</h4>
        <ul className="space-y-2 text-sm">
          {Array.from(cart.entries()).map(([id, qty])=>{
            const p=productsData.find(x=>x.id===id); if(!p) return null;
            return <li key={id} className="flex justify-between"><span>{p.name} × {qty}</span><span>${(p.price*qty).toFixed(2)}</span></li>
          })}
        </ul>
        <div className="mt-3 border-t border-gray-800 pt-3 flex justify-between font-semibold">
          <span>Total</span><span>${total.toFixed(2)}</span>
        </div>
      </aside>
      <CodeViewer isOpen={openCode} onClose={()=>setOpenCode(false)} code={logic} language="javascript" title="Cart logic" />
    </div>
  );
};

export default EcommerceDemo;


