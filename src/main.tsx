import {createRoot} from 'react-dom/client'
import {HashRouter,Routes,Route,Link,useLocation} from 'react-router-dom'
import {useEffect} from 'react'
import '@fontsource/nunito/latin-400.css'
import '@fontsource/nunito/latin-700.css'
import './styles.css'
import {Header} from './components/Layout'
import {Home} from './pages/Home'
import {Post} from './pages/Post'

function App(){
  const {pathname}=useLocation()
  useEffect(()=>{window.scrollTo(0,0)},[pathname])
  return <><a href="#content" className="sr-only focus:not-sr-only" onClick={e=>{e.preventDefault();document.getElementById('content')?.focus()}}>Ir ao conteúdo</a><Header/><main id="content" tabIndex={-1} className="relative mx-auto -mt-20 w-[min(864px,calc(100%-2rem))] pb-16"><Routes><Route path="/" element={<Home/>}/><Route path="/post/:number" element={<Post/>}/><Route path="*" element={<section className="panel"><h1>Página não encontrada (404)</h1><Link className="action mt-4" to="/">Voltar ao blog</Link></section>}/></Routes></main></>
}
createRoot(document.getElementById('root')!).render(<HashRouter><App/></HashRouter>)
