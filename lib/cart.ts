import {products, type Product} from './products';

export type CartItem = {slug: string; variant: string; quantity: number};
export type Pack = {id: string; label: string; pricePaise?: number};
export const CART_KEY = 'zivasha-cart-v1';
const approved500g: Record<string, number> = {'gond-laddu':104850,'khapli-laddu':89850,'seven-seeds-nutri-bar':119850};
// Owner-approved website prices, 17 October 2026. Amounts are integer paise.
const hamperPrices: Record<string, number> = {'festive-potli-basket':219900,'four-jar-festive-gift':219900,'three-jar-floral-gift':179900,'navy-three-jar-gift':169900,'turquoise-gift-tray':169900,'slim-festive-box':79900};
export function packsFor(product: Product): Pack[] {
  return product.slug in approved500g
    ? [{id:'250g',label:'250 g container'},{id:'500g',label:'500 g container',pricePaise:approved500g[product.slug]}]
    : [{id:'standard',label:product.weight,pricePaise:hamperPrices[product.slug]}];
}
export function resolveItem(item: CartItem) {
  const product = products.find(p=>p.slug===item.slug);
  const pack = product && packsFor(product).find(p=>p.id===item.variant);
  return product && pack ? {product,pack} : null;
}
export function cleanCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const result: CartItem[]=[];
  for(const raw of value.slice(0,100)) {
    if (!raw || typeof raw!=='object' || typeof raw.slug!=='string' || typeof raw.variant!=='string' || !Number.isInteger(raw.quantity) || raw.quantity<1 || raw.quantity>999 || !resolveItem(raw)) continue;
    const existing=result.find(i=>i.slug===raw.slug&&i.variant===raw.variant);
    if(existing) existing.quantity=Math.min(999,existing.quantity+raw.quantity);
    else result.push({slug:raw.slug,variant:raw.variant,quantity:raw.quantity});
  }
  return result;
}
export function cartSummary(items: CartItem[]) {
  let pricedSubtotalPaise=0,quoteQuantity=0,count=0;
  for (const item of cleanCart(items)) {
    const detail=resolveItem(item)!;
    count+=item.quantity;
    if(detail.pack.pricePaise===undefined) quoteQuantity+=item.quantity;
    else pricedSubtotalPaise+=detail.pack.pricePaise*item.quantity;
  }
  // 5% food GST estimate: Notification 9/2025-Integrated Tax (Rate), Schedule I.
  // Custom/unpriced combinations need an individually confirmed classification.
  const estimatedGstPaise=Math.round(pricedSubtotalPaise*5/100);
  return {pricedSubtotalPaise,estimatedGstPaise,estimatedTotalPaise:pricedSubtotalPaise+estimatedGstPaise,quoteQuantity,count};
}
export const money=(paise:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:2}).format(paise/100);
export function cartDescription(items: CartItem[]) {
  return cleanCart(items).map(item=>{
    const {product,pack}=resolveItem(item)!;
    return `${item.quantity} × ${product.name} | ${pack.label} | ${pack.pricePaise===undefined?'Price on request':money(pack.pricePaise)+' each; '+money(pack.pricePaise*item.quantity)+' line subtotal'}`;
  }).join('\n');
}
