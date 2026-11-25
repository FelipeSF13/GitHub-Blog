import {test,expect} from '@playwright/test'

const post={number:4,title:'Paginação real',body:'## Como funciona\n\n1. Avance.\n\n```js\nconst page = 2\n```',created_at:'2025-01-04T00:00:00Z',user:{login:'autor'},comments:2,html_url:'https://github.com/FelipeSF13/GitHub-Blog/issues/4'}
test.beforeEach(async({page})=>{
  await page.route('**/users/FelipeSF13',r=>r.fulfill({json:{login:'autor',name:null,bio:null,avatar_url:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>',followers:3,html_url:'https://github.com/FelipeSF13'}}))
})
test('pagina no servidor, aguarda digitação e reinicia na página um',async({page})=>{
  const calls:URLSearchParams[]=[]
  await page.route('**/search/issues?*',r=>{
    const p=new URL(r.request().url()).searchParams;calls.push(p)
    return r.fulfill({json:{total_count:7,items:[{...post,title:`Artigo página ${p.get('page')}`}]}})
  })
  await page.goto('./')
  await expect(page.getByRole('button',{name:'Anterior'})).toBeDisabled()
  await page.getByRole('button',{name:'Próxima'}).click()
  await expect(page.getByText('Artigo página 2')).toBeVisible()
  await expect(page.getByRole('button',{name:'Próxima'})).toBeDisabled()
  await page.getByLabel('Buscar publicações').pressSequentially('React',{delay:25})
  await expect(page.getByText('Artigo página 1')).toBeVisible()
  expect(calls.map(c=>c.get('page'))).toEqual(['1','2','1'])
  expect(calls[2].get('q')).toContain('"React" in:title,body repo:FelipeSF13/GitHub-Blog is:issue')
  expect(calls[1].get('per_page')).toBe('6')
})
test('acesso direto ao Markdown e 404',async({page})=>{
  await page.route('**/issues/4',r=>r.fulfill({json:post}))
  await page.goto('./#/post/4')
  await expect(page.getByRole('heading',{name:'Como funciona'})).toBeVisible()
  await expect(page.locator('pre code')).toHaveText('const page = 2\n')
  await expect(page.getByRole('link',{name:'Ver no GitHub'})).toHaveAttribute('href',post.html_url)
  await page.route('**/issues/999',r=>r.fulfill({status:404,json:{}}))
  await page.goto('./#/post/999')
  await expect(page.getByRole('alert')).toContainText('404')
})
test('rate limit e nova tentativa com resultado vazio',async({page})=>{
  let attempts=0
  await page.route('**/search/issues?*',r=>++attempts===1?r.fulfill({status:429,json:{}}):r.fulfill({json:{total_count:0,items:[]}}))
  await page.goto('./')
  await expect(page.getByRole('alert')).toContainText('Limite de consultas')
  await page.getByRole('button',{name:'Tentar novamente'}).click()
  await expect(page.getByText('Nenhuma publicação encontrada.',{exact:false})).toBeVisible()
})
