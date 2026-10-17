"use client";
import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
import {CART_KEY,cleanCart,type CartItem} from '@/lib/cart';
type CartContextValue={items:CartItem[];ready:boolean;storageWarning:boolean;add:(slug:string,variant:string)=>void;setQuantity:(slug:string,variant:string,quantity:number)=>void;remove:(slug:string,variant:string)=>void;clear:()=>void};
const CartContext=createContext<CartContextValue|null>(null);
export function CartProvider({children}:{children:ReactNode}) {
 const [items,setItems]=useState<CartItem[]>([]);
 const [ready,setReady]=useState(false);
 const [storageWarning,setStorageWarning]=useState(false);
 const skipSave=useRef(false);
 useEffect(()=>{
  try{setItems(cleanCart(JSON.parse(localStorage.getItem(CART_KEY)||'[]')));}catch{setStorageWarning(true);}
  setReady(true);
  const sync=(event:StorageEvent)=>{if(event.key===CART_KEY||event.key===null){try{skipSave.current=true;setItems(cleanCart(JSON.parse(event.newValue||'[]')));}catch{}}};
  window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync);
 },[]);
 useEffect(()=>{if(!ready)return;if(skipSave.current){skipSave.current=false;return;}try{localStorage.setItem(CART_KEY,JSON.stringify(items));}catch{setStorageWarning(true);}},[items,ready]);
 const add=(slug:string,variant:string)=>setItems(old=>cleanCart([...old,{slug,variant,quantity:1}]));
 const setQuantity=(slug:string,variant:string,quantity:number)=>{if(!Number.isInteger(quantity)||quantity<1||quantity>999)return;setItems(old=>old.map(i=>i.slug===slug&&i.variant===variant?{...i,quantity}:i));};
 const remove=(slug:string,variant:string)=>setItems(old=>old.filter(i=>!(i.slug===slug&&i.variant===variant)));
 return <CartContext.Provider value={{items,ready,storageWarning,add,setQuantity,remove,clear:()=>setItems([])}}>{children}</CartContext.Provider>;
}
export function useCart(){const value=useContext(CartContext);if(!value)throw new Error('CartProvider missing');return value;}
