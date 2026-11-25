// Exercita a aplicação com a API real (sem interceptação ou fixtures).
import {chromium} from 'playwright'
import {mkdir} from 'node:fs/promises'

const base=process.argv[2]||'https://felipesf13.github.io/GitHub-Blog/'
const folder='docs/capturas'
await mkdir(folder,{recursive:true})
const browser=await chromium.launch()
try {
  const page=await browser.newPage({viewport:{width:1280,height:900}})
  await page.goto(base)
  const card=page.locator('h3').first()
  await card.waitFor()
  await page.locator('img[alt^="Avatar"]').waitFor()
  await page.evaluate(()=>document.fonts.ready)
  await page.screenshot({path:`${folder}/home.png`,fullPage:true})
  await page.getByRole('button',{name:'Próxima'}).click()
  await page.getByText('Página 2 de 2').waitFor()
  await page.getByLabel('Buscar publicações').fill('seis artigos')
  await page.getByText('1 publicação',{exact:true}).waitFor()
  await page.screenshot({path:`${folder}/busca.png`,fullPage:true})
  await card.click()
  await page.locator('pre code').waitFor()
  await page.reload()
  await page.locator('pre code').waitFor()
  await page.screenshot({path:`${folder}/detalhe.png`,fullPage:true})
  await page.getByRole('link',{name:'Voltar'}).click()
  await page.getByLabel('Buscar publicações').fill('')
  await page.getByText('10 publicações',{exact:true}).waitFor()
  for (const width of [768,375]) {
    await page.setViewportSize({width,height:812})
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw Error(`Overflow: ${width}px`)
  }
  await page.screenshot({path:`${folder}/mobile.png`,fullPage:true})
  console.log('Perfil, catálogo real, página 2, busca, detalhe direto e mobile verificados.')
} finally {await browser.close()}
