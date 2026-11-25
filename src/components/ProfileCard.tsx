import {Building2,Github,Users} from 'lucide-react'
import {profile} from '../services/github'
import {useQuery} from '../hooks/useQuery'
import {ErrorState,External,LoadingState} from './Layout'

export function ProfileCard(){
  const {result,retry}=useQuery(profile)
  if(result.state==='loading') return <LoadingState/>
  if(result.state==='error') return <ErrorState message={result.message} retry={retry}/>
  const u=result.data
  return <section className="panel flex flex-col items-start gap-6 sm:flex-row sm:gap-8">
    <img src={u.avatar_url} alt={`Avatar de ${u.login}`} className="size-24 rounded-lg object-cover sm:size-36"/>
    <div className="flex min-w-0 flex-1 flex-col self-stretch"><div className="flex flex-wrap items-center justify-between gap-2"><h1 className="text-2xl font-bold text-slate-100">{u.name||u.login}</h1><External href={u.html_url} label="GitHub"/></div>
    <p className="my-3 grow">{u.bio||'Este perfil ainda não tem uma biografia no GitHub.'}</p>
    <div className="meta"><span><Github/>@{u.login}</span>{u.company&&<span><Building2/>{u.company}</span>}<span><Users/>{u.followers} seguidores</span></div></div>
  </section>
}
