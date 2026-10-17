// Temporary read-only go-live verification. No order creation or payment calls.
const DEADLINE=Date.parse('2026-10-17T16:30:00Z');
const reply=(statusCode,data)=>({statusCode,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow'},body:JSON.stringify(data)});
export async function checkLive(event,{env=process.env,fetcher=fetch,now=Date.now()}={}){
 if(now>=DEADLINE)return reply(410,{error:'This temporary verification has ended.'});
 if(event.httpMethod!=='GET')return reply(405,{error:'Use GET.'});
 const key=env.RAZORPAY_KEY_ID,secret=env.RAZORPAY_KEY_SECRET;
 if(!key?.startsWith('rzp_live_')||!secret)return reply(503,{liveMode:false,authenticated:false});
 try{
  const response=await fetcher('https://api.razorpay.com/v1/orders?count=1',{method:'GET',headers:{Authorization:`Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`},signal:AbortSignal.timeout(10000)});
  if(!response.ok)return reply(502,{liveMode:true,authenticated:false});
  const result=await response.json();
  if(result.entity!=='collection'||!Array.isArray(result.items))throw Error('Unexpected provider response');
  return reply(200,{liveMode:true,authenticated:true,checkedAt:new Date(now).toISOString(),message:'Live Razorpay credentials accepted from ZIVASHA production. Read-only check; no money charged.'});
 }catch{return reply(502,{liveMode:true,authenticated:false});}
}
export const handler=event=>checkLive(event);
