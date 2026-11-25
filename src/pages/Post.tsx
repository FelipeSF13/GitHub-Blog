import {useCallback} from 'react'
import {Link,useLocation,useParams} from 'react-router-dom'
import {Calendar,Github,MessageCircle} from 'lucide-react'
import Markdown from 'react-markdown'
import {issue} from '../services/github'
import {useQuery} from '../hooks/useQuery'
import {relative} from '../utils/text'
import {LoadingState,ErrorState,External} from '../components/Layout'

export function Post(){
  const {number=''}=useParams()
  const from=useLocation().state?.from||'/'
  const {result,retry}=useQuery(useCallback((signal:AbortSignal)=>issue(number,signal),[number]))
  if(result.state==='loading')return <LoadingState/>
  if(result.state==='error')return <><ErrorState message={result.message} retry={retry}/><Link className="action mt-5" to={from}>← Voltar</Link></>
  const p=result.data
  return <article><header className="panel"><div className="mb-5 flex items-center justify-between"><Link className="action" to={from}>← Voltar</Link><External label="Ver no GitHub" href={p.html_url}/></div>
    <h1 className="mb-3 text-2xl font-bold text-slate-100 md:text-3xl">{p.title}</h1><div className="meta"><span><Github/>{p.user?.login||'Autor indisponível'}</span><span><Calendar/><time dateTime={p.created_at}>{relative(p.created_at)}</time></span><span><MessageCircle/>{p.comments} comentários</span></div></header>
    <div className="prose px-2 py-8 sm:p-10"><Markdown skipHtml components={{a:({children,href})=><a href={href} target="_blank" rel="noopener noreferrer">{children}</a>}}>{p.body?.trim()||'Esta publicação não possui conteúdo.'}</Markdown></div>
  </article>
}
