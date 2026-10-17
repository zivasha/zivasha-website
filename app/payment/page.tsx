import type {Metadata} from "next";
import Link from "next/link";
import RazorpayCheckout from "@/components/RazorpayCheckout";
export const metadata:Metadata={title:"Pay a confirmed order",description:"Secure Razorpay checkout for your confirmed ZIVASHA quotation, including GST and delivery.",robots:{index:false,follow:true},referrer:"no-referrer"};
export default function Payment(){return <><section className="page-hero"><p className="eyebrow">Secure payment</p><h1>Your order, <em>ready to confirm.</em></h1><p>Availability, GST and delivery are confirmed before payment.</p></section><section className="section"><div className="wrap narrow payment-panel"><RazorpayCheckout/><p><Link href="/cart/">Return to your cart</Link></p></div></section></>;}
