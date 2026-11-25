import {Terminal,ArrowUpRight} from 'lucide-react'
import {Link} from 'react-router-dom'

export function Header(){return <header className="cover"><Link to="/" className="flex flex-col items-center gap-2 text-sky-400"><Terminal size={43} strokeWidth={1.5}/><span className="font-mono text-xl tracking-[.14em]">GITHUB BLOG</span></Link></header>}
export function External({href,label}:{href:string;label:string}){return <a className="action" href={href} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={15}/></a>}
export function LoadingState(){return <p className="panel text-slate-300" role="status">Carregando do GitHub…</p>}
export function ErrorState({message,retry}:{message:string;retry:()=>void}){return <section className="panel"><p role="alert">{message}</p><button className="action mt-3" onClick={retry}>Tentar novamente</button></section>}
