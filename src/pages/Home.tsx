import {useCallback,useEffect,useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {ProfileCard} from '../components/ProfileCard'
import {SearchInput,IssueList,Pagination} from '../components/Catalog'
import {LoadingState,ErrorState} from '../components/Layout'
import {useQuery} from '../hooks/useQuery'
import {searchIssues} from '../services/github'
import {normalize} from '../utils/text'
import {blog} from '../config/blog'

export function Home(){
  const [params,setParams]=useSearchParams()
  const term=normalize(params.get('q')||'')
  const page=Math.min(Math.ceil(1000/blog.pageSize),Math.max(1,Math.floor(Number(params.get('page')))||1))
  const [input,setInput]=useState(term)
  useEffect(()=>{setInput(term)},[term])
  useEffect(()=>{
    const q=normalize(input)
    if(q===term)return
    const timer=setTimeout(()=>setParams(q?{q}:{},{replace:true}),500)
    return ()=>clearTimeout(timer)
  },[input,term,setParams])
  const {result,retry}=useQuery(useCallback((signal:AbortSignal)=>searchIssues(term,page,signal),[term,page]))
  const total=result.state==='ready'?result.data.total_count:null
  return <><ProfileCard/><section className="mt-14"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-200">Publicações</h2><span className="text-sm text-slate-400">{total===null?'Consultando…':`${total} ${total===1?'publicação':'publicações'}`}</span></div>
    <SearchInput value={input} change={setInput}/><div className="mt-8">{result.state==='loading'?<LoadingState/>:result.state==='error'?<ErrorState message={result.message} retry={retry}/>:<><IssueList items={result.data.items}/>{(result.data.total_count>0||page>1)&&<Pagination page={page} pages={Math.max(1,Math.ceil(Math.min(1000,result.data.total_count)/blog.pageSize))} go={n=>setParams({...term&&{q:term},page:String(n)})}/>}</>}</div></section></>
}
