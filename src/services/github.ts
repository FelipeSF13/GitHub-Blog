import axios from 'axios'
import {blog} from '../config/blog'
import type {GitHubUser, GitHubIssue, IssuePage} from '../types/github'

const api = axios.create({baseURL:'https://api.github.com',timeout:12000,headers:{Accept:'application/vnd.github+json'}})
export async function profile(signal:AbortSignal) {
  return (await api.get<GitHubUser>(`/users/${blog.owner}`,{signal})).data
}
export async function searchIssues(term:string,page:number,signal:AbortSignal) {
  // Quote search text so user input cannot add a second repo: qualifier.
  const phrase = term.replace(/["\\]/g,' ').trim()
  const q = `${phrase ? `"${phrase}" in:title,body ` : ''}repo:${blog.owner}/${blog.repo} is:issue`
  return (await api.get<IssuePage>('/search/issues',{signal,params:{q,sort:'created',order:'desc',page,per_page:blog.pageSize}})).data
}
export async function issue(number:string,signal:AbortSignal) {
  if (!/^[1-9]\d*$/.test(number)) throw Error('Publicação não encontrada.')
  const {data} = await api.get<GitHubIssue>(`/repos/${blog.owner}/${blog.repo}/issues/${number}`,{signal})
  if (data.pull_request) throw Error('Este número corresponde a um pull request, não a uma publicação.')
  return data
}
export function message(error:unknown) {
  if (!axios.isAxiosError(error)) return error instanceof Error ? error.message : 'Erro inesperado.'
  const status=error.response?.status
  if(status===404) return 'Recurso não encontrado no GitHub (404).'
  if(status===429 || (status===403 && (error.response?.headers['x-ratelimit-remaining']==='0' || /limit/i.test(error.response?.data?.message)))) return 'Limite de consultas do GitHub atingido. Aguarde alguns minutos antes de tentar novamente.'
  if(!status) return 'Sem resposta do GitHub. Verifique sua conexão e tente novamente.'
  return `O GitHub não concluiu a consulta (HTTP ${status}).`
}
