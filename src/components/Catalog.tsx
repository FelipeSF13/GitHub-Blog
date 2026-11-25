import {Link,useLocation} from 'react-router-dom'
import {MessageCircle,Search} from 'lucide-react'
import type {GitHubIssue} from '../types/github'
import {relative,summary} from '../utils/text'

export function SearchInput({value,change}:{value:string;change:(s:string)=>void}){
  return <div className="relative"><label htmlFor="search" className="sr-only">Buscar publicações</label><Search size={17} aria-hidden className="absolute left-4 top-4 text-slate-400"/><input id="search" type="search" value={value} maxLength={160} onChange={e=>change(e.target.value)} placeholder="Buscar conteúdo" className="w-full rounded-md border border-[#273e51] bg-[#040f1a] py-3 pl-11 pr-4 placeholder:text-slate-400"/></div>
}
function IssueCard({post}:{post:GitHubIssue}){
  const {search}=useLocation()
  return <Link to={`/post/${post.number}`} state={{from:'/'+search}} className="group flex h-full min-w-0 flex-col rounded-xl border border-transparent bg-[#112131] p-6 transition-colors hover:border-[#43617a] sm:p-8">
    <div className="flex justify-between gap-4"><h3 className="text-xl font-bold leading-snug text-slate-100 group-hover:text-sky-300">{post.title}</h3><time dateTime={post.created_at} className="shrink-0 text-xs leading-7 text-slate-400">{relative(post.created_at)}</time></div>
    <p className="mt-4 line-clamp-3 grow">{summary(post.body)}</p>
    <div className="mt-5 flex justify-between font-mono text-xs text-slate-400"><span>ISSUE / {String(post.number).padStart(3,'0')}</span><span className="inline-flex items-center gap-2"><MessageCircle size={14}/>{post.comments} comentários</span></div>
  </Link>
}
export function IssueList({items}:{items:GitHubIssue[]}){
  return items.length?<div className="grid gap-6 md:grid-cols-2">{items.map(post=><IssueCard key={post.number} post={post}/>)}</div>:<p className="panel" role="status">Nenhuma publicação encontrada. Experimente outro termo.</p>
}
export function Pagination({page,pages,go}:{page:number;pages:number;go:(page:number)=>void}){
  return <nav aria-label="Paginação" className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm"><button disabled={page<=1} onClick={()=>go(page-1)}>← Anterior</button><span>Página {page} de {pages}</span><button disabled={page>=pages} onClick={()=>go(page+1)}>Próxima →</button></nav>
}
