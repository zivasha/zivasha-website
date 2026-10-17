import Image from 'next/image';
export function ZivashaMark({size=48}:{size?:number}){return <Image src="/images/zivasha-logo.png" alt="" width={size} height={size} unoptimized style={{objectFit:'contain'}}/>}
export function ZivashaLockup({height=48,tone='dark',tagline=false}:{height?:number;tone?:'dark'|'light';tagline?:boolean}){return <span className={'approved-lockup '+tone}><ZivashaMark size={height}/><span><b>ZIVASHA</b>{tagline&&<small>TRADITION. NOURISHED. GIFTED.</small>}</span></span>}
