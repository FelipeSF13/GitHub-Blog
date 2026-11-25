# GitHub Blog

**[Abrir aplicação](https://felipesf13.github.io/GitHub-Blog/)** · [Publicações no GitHub](https://github.com/FelipeSF13/GitHub-Blog/issues) · [Figma](https://www.figma.com/design/UklolDw90CmcDAj9piQVUJ/GitHub-Blog--Community---Copy-?node-id=2-1297)

Blog de notas sobre desenvolvimento web. O perfil vem da Users API, as publicações são issues reais e cada artigo tem endereço próprio. Para publicar um texto basta criar uma issue com título e corpo em Markdown; a busca do GitHub pode levar alguns instantes para indexá-la.

## Executar
Com Node.js 24: `npm ci` e `npm run dev`. Para gerar a distribuição: `npm run build`; para servir a versão compilada: `npm run preview`.

Configure `owner`, `repo` e `pageSize` em `src/config/blog.ts`. A aplicação usa endpoints públicos, sem chave ou arquivo `.env`. Ao mudar o nome do projeto no Pages ajuste também o `base` em `vite.config.ts`.

## Como funciona
- **React + TypeScript + Tailwind:** páginas coordenam os dados; componentes recebem props tipadas para renderizar perfil, busca, cards e paginação.
- **Axios + custom hook:** `src/services/github.ts` descreve as chamadas; `src/hooks/useQuery.ts` controla carregamento, erro, cancelamento e nova tentativa.
- **Busca:** após 500 ms sem alteração, a Home consulta a Search API, incluindo issues abertas e fechadas. `is:issue` descarta PRs. Cada página recebe no máximo seis itens do servidor.
- **React Router:** a rota `/#/post/:number` funciona em hospedagem estática e consulta o Markdown completo mesmo sem passar pela Home. Os parâmetros da pesquisa ficam na URL para permitir retorno.

## Evidências e testes
`npx playwright install chromium` prepara o navegador; `npm test` executa três cenários independentes de disponibilidade da API. O workflow também valida o TypeScript e compila antes de publicar. Para repetir a verificação real: `node scripts/capturas.mjs` com o site publicado e as dez issues de demonstração.

[Home](docs/capturas/home.png) · [Busca](docs/capturas/busca.png) · [Leitura](docs/capturas/detalhe.png) · [Celular](docs/capturas/mobile.png)

[Requisitos](docs/PRD_SPEC.md) · [Arquitetura](docs/TECH_SPEC.md) · [Tarefas](docs/TASKS_SPEC.md) · [Uso de IA](docs/AI_USAGE.md) · [Instruções de desenvolvimento](AGENTS.md)

## Roteiro para a apresentação individual
1. Abra a Home, compare o perfil com o GitHub e avance da primeira à segunda página. Mostre `page=2&per_page=6` na aba Rede.
2. Busque **seis artigos**. Explique por que filtrar somente os primeiros seis cards não encontraria todos os resultados e como o debounce reduz chamadas.
3. Abra **Paginação real: seis artigos por vez**, recarregue o endereço e mostre o subtítulo, a lista, o código e o link da issue. Volte para a consulta anterior.
4. Em `Home.tsx`, acompanhe o caminho do texto digitado até o Axios. Em `useQuery.ts`, explique o cancelamento. Em `Catalog.tsx`, identifique uma prop e sua função.
5. Compare um critério da PRD com o teste correspondente. Explique uma decisão que revisou com apoio do OpenCode e demonstre uma busca sem resultados.
