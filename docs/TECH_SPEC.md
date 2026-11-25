# Especificação técnica

Vite compila a SPA React com TypeScript estrito. Tailwind define layout e estados. React Router com HashRouter permite acesso direto e refresh em hospedagem estática (`/#/post/1`) sem regras de reescrita.

| Camada em `src/` | Responsabilidade |
|---|---|
| `config/`, `types/` | Identidade pública, tamanho da página e contratos: GitHubUser (perfil, campos opcionais), GitHubIssue (número, autor, corpo anulável, data, comentários), IssuePage (items e total_count). |
| `services/` | Instância Axios com URL base, timeout, Accept JSON; funções para usuário, Search e issue individual. Sem credenciais. |
| `hooks/` | Consulta cancelável com AbortController e estados discriminados; descartar respostas antigas. |
| `pages/` | Home coordena parâmetros e perfil; detalhe consulta número validado e rejeita PR. |
| `components/` | Header, ProfileCard, SearchInput, IssueCard/List, Pagination e estados compartilhados. Props carregam dados e callbacks. |
| `utils/` | Normalização, resumo sem blocos de código e data relativa com Intl. |

**RF-01–08:** usar `/users/{owner}` e `/search/issues` mesmo sem termo: `repo:owner/repo is:issue`, sem restrição de estado, `sort=created`, `order=desc`, `per_page=6`, `page`. Axios codifica `params`. Campo controlado aplica debounce de 500 ms; URL guarda termo e página; total considera limite de mil resultados acessíveis pela Search API.

**RF-09–12:** `/post/:number` pede `/repos/{owner}/{repo}/issues/{number}` independentemente da lista; retorno preserva consulta via estado do link. `react-markdown` sem HTML bruto, links externos isolados.

**RF-13–16:** timeout/rede, HTTP 404 e limites 403/429 recebem orientação; retry manual. Teclado, regiões de status, alt e foco visível. Testes Playwright com respostas controladas para paginação/debounce, Markdown direto, erros/retentativa; verificação separada com dados reais e capturas. GitHub Actions executa build e publica `dist` no Pages.
