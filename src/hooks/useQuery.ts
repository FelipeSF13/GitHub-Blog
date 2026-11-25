import {useEffect,useState} from 'react'
import {message} from '../services/github'

type Result<T> = {state:'loading'} | {state:'error';message:string} | {state:'ready';data:T}
export function useQuery<T>(load:(signal:AbortSignal)=>Promise<T>) {
  const [result,setResult] = useState<Result<T>>({state:'loading'})
  const [attempt,setAttempt] = useState(0)
  useEffect(()=>{
    const controller=new AbortController()
    setResult({state:'loading'})
    load(controller.signal).then(data=>{
      if(!controller.signal.aborted) setResult({state:'ready',data})
    }).catch(error=>{
      if(!controller.signal.aborted) setResult({state:'error',message:message(error)})
    })
    return ()=>controller.abort()
  },[load,attempt])
  return {result,retry:()=>setAttempt(n=>n+1)}
}
